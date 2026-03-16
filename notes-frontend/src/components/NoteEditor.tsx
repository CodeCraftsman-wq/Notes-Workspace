import { useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import CodeBlock from '@tiptap/extension-code-block';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Placeholder from '@tiptap/extension-placeholder';
import Highlight from '@tiptap/extension-highlight';
import CharacterCount from '@tiptap/extension-character-count';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Typography from '@tiptap/extension-typography';

import { ResizableImage } from '../extensions/ResizableImage';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, Trash2, Bold, Italic, Strikethrough, Underline as UnderlineIcon, 
  List, ListOrdered, Heading1, Heading2, CheckSquare, Code, 
  Link as LinkIcon, Highlighter, Share, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify 
} from 'lucide-react';

import { useStore } from '../store/useStore';
import { useTheme } from './ThemeProvider';

import { SlashCommand, getSuggestionItems, renderItems } from '../extensions/SlashMenu';
import { AutoCorrect } from '../extensions/AutoCorrect';
import ImageUploadButton from './ImageUploadButton';

export default function NoteEditor() {
  const { theme, systemTheme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark');

  const notes = useStore((state) => state.notes);
  const activeNoteId = useStore((state) => state.activeNoteId);
  const updateNote = useStore((state) => state.updateNote);
  const deleteNote = useStore((state) => state.deleteNote);
  const setEditorStats = useStore((state) => state.setEditorStats);
  const toggleSidebar = useStore((state) => state.toggleSidebar);

  const note = notes.find((n) => n.id === activeNoteId);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      CodeBlock,
      TaskList,
      TaskItem.configure({ nested: true }),
      Placeholder.configure({ placeholder: 'Start typing...' }),
      Highlight.configure({ multicolor: false }),
      CharacterCount,
      Link.configure({ openOnClick: false, autolink: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Typography,
      AutoCorrect,
      
      // Your custom interactive image component!
      ResizableImage,
      
      SlashCommand.configure({
        suggestion: {
          items: getSuggestionItems,
          render: renderItems,
        },
      }),
      // Removed the duplicate SlashCommand here that was crashing the app!
    ],
    content: note?.content || '',
    editorProps: {
      attributes: {
        class: `prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none max-w-3xl mx-auto w-full h-full min-h-[500px] px-8 py-6 pb-32 ${
          isDark ? 'prose-invert text-gray-100' : 'text-gray-900'
        }`,
        spellcheck: 'true',
        autocorrect: 'on',
      },
    },
    onUpdate: ({ editor }) => {
      if (activeNoteId) {
        const html = editor.getHTML();
        const text = editor.getText();
        const firstLine = text.split('\n')[0].trim();
        const title = firstLine || 'Untitled Note';

        updateNote(activeNoteId, { title, content: html });
        setEditorStats(editor.storage.characterCount.words(), editor.storage.characterCount.characters());
      }
    },
  });

  const handleImageUpload = (imageUrl: string) => {
    if (!note || !editor) return;
    editor.chain().focus().setImage({ src: imageUrl }).run();
  };

  useEffect(() => {
    if (editor && note && editor.getHTML() !== note.content) {
      editor.commands.setContent(note.content);
      setEditorStats(editor.storage.characterCount.words(), editor.storage.characterCount.characters());
    }
  }, [activeNoteId, editor, note, setEditorStats]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const handleShare = async () => {
    if (!note || !editor) return;
    const cleanText = editor.getText(); 
    const shareData = {
      title: note.title,
      text: `${note.title}\n\n${cleanText}`,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.text);
        alert('Note copied to clipboard!');
      }
    } catch (err) {
      console.log('Share canceled or failed:', err);
    }
  };

  const toolbarBtnClass = (isActive: boolean) => `
    p-2 rounded-md transition-all duration-200 flex items-center justify-center shrink-0
    ${isActive 
      ? (isDark ? 'bg-yellow-500/20 text-yellow-500' : 'bg-yellow-100 text-yellow-600') 
      : (isDark ? 'text-gray-400 hover:bg-white/10 hover:text-gray-200' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900')}
  `;

  if (!activeNoteId) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 h-full">
        <div className="absolute top-4 left-4 md:hidden">
          <button onClick={toggleSidebar} className={`p-2 rounded-md ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}>
            <Menu size={24} />
          </button>
        </div>
        <div className="w-20 h-20 mb-6 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center">
          <span className="text-4xl">📝</span>
        </div>
        <p className="text-xl font-medium text-gray-500 dark:text-gray-400">Select a note or create a new one</p>
      </div>
    );
  }

  if (!editor) return null;

  return (
    <div className="flex flex-col h-full bg-transparent">
      
      <div className={`sticky top-0 z-10 backdrop-blur-xl flex flex-nowrap overflow-x-auto items-center gap-1 px-4 sm:px-6 py-2 border-b transition-colors scrollbar-hide ${
        isDark ? 'border-white/5 bg-[#1e1e1e]/80' : 'border-gray-200 bg-white/80'
      }`}>
        
        <button 
          onClick={toggleSidebar} 
          className="md:hidden p-2 mr-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 shrink-0 transition-colors"
          title="Open Menu"
        >
          <Menu size={20} />
        </button>

        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={toolbarBtnClass(editor.isActive('heading', { level: 1 }))} title="Heading 1"><Heading1 size={18} /></button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={toolbarBtnClass(editor.isActive('heading', { level: 2 }))} title="Heading 2"><Heading2 size={18} /></button>
        
        <div className={`w-px h-6 mx-2 shrink-0 ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}></div>
        
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={toolbarBtnClass(editor.isActive('bold'))} title="Bold"><Bold size={18} /></button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={toolbarBtnClass(editor.isActive('italic'))} title="Italic"><Italic size={18} /></button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={toolbarBtnClass(editor.isActive('underline'))} title="Underline"><UnderlineIcon size={18} /></button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className={toolbarBtnClass(editor.isActive('strike'))} title="Strikethrough"><Strikethrough size={18} /></button>
        
        <button onClick={() => editor.chain().focus().toggleHighlight().run()} className={toolbarBtnClass(editor.isActive('highlight'))} title="Highlight"><Highlighter size={18} /></button>
        
        <button onClick={setLink} className={toolbarBtnClass(editor.isActive('link'))} title="Add Link"><LinkIcon size={18} /></button>
        <ImageUploadButton onUploadComplete={handleImageUpload} />

        <div className={`w-px h-6 mx-2 shrink-0 ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}></div>
        
        <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={toolbarBtnClass(editor.isActive({ textAlign: 'left' }))} title="Align Left"><AlignLeft size={18} /></button>
        <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={toolbarBtnClass(editor.isActive({ textAlign: 'center' }))} title="Align Center"><AlignCenter size={18} /></button>
        <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={toolbarBtnClass(editor.isActive({ textAlign: 'right' }))} title="Align Right"><AlignRight size={18} /></button>
        <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={toolbarBtnClass(editor.isActive({ textAlign: 'justify' }))} title="Justify"><AlignJustify size={18} /></button>

        <div className={`w-px h-6 mx-2 shrink-0 ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}></div>
        
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={toolbarBtnClass(editor.isActive('bulletList'))} title="Bullet List"><List size={18} /></button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={toolbarBtnClass(editor.isActive('orderedList'))} title="Numbered List"><ListOrdered size={18} /></button>
        <button onClick={() => editor.chain().focus().toggleTaskList().run()} className={toolbarBtnClass(editor.isActive('taskList'))} title="Task List"><CheckSquare size={18} /></button>
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={toolbarBtnClass(editor.isActive('codeBlock'))} title="Code Block"><Code size={18} /></button>
        
        <div className="flex-1 min-w-[20px]"></div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleShare}
          className={`p-2 mr-1 rounded-md shrink-0 flex items-center justify-center transition-all duration-200 ${
            isDark ? 'text-blue-400 hover:bg-blue-500/20 active:bg-blue-500/30' : 'text-blue-500 hover:bg-blue-50 active:bg-blue-100'
          }`}
          title="Share Note"
        >
          <Share size={18} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => activeNoteId && deleteNote(activeNoteId)}
          className={`p-2 rounded-md shrink-0 flex items-center justify-center transition-all duration-200 ${
            isDark ? 'text-red-400 hover:bg-red-500/20 active:bg-red-500/30' : 'text-red-500 hover:bg-red-50 active:bg-red-100'
          }`}
          title="Delete Note"
        >
          <Trash2 size={18} />
        </motion.button>
      </div>



      
       {/* Editor Content Area (Removed AnimatePresence & Key to prevent Tiptap unmounting) */}
      <motion.div 
        // Notice we removed the key={note?.id} here!
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.2 }} 
        className="flex-1 overflow-y-auto"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
        }}
      >
        <EditorContent editor={editor} className="h-full cursor-text" />
      </motion.div>

    </div>
  );
}