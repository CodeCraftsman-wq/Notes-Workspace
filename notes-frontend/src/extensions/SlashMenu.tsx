import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import type { ReactNode } from 'react';
import { Extension } from '@tiptap/core';
import type { Editor, Range } from '@tiptap/core';
import Suggestion from '@tiptap/suggestion';
import { ReactRenderer } from '@tiptap/react';
import tippy from 'tippy.js';
import type { Instance as TippyInstance } from 'tippy.js';
import { Heading1, Heading2, List, CheckSquare, Code, Type } from 'lucide-react';

// --- STRICT TYPESCRIPT INTERFACES ---
export interface CommandItem {
  title: string;
  icon: ReactNode;
  action: (editor: Editor) => void;
}

interface CommandProps {
  items: CommandItem[];
  command: (item: CommandItem) => void;
}

interface RenderProps {
  clientRect?: () => DOMRect;
  editor: Editor;
  text: string;
  items: CommandItem[];
  command: (item: CommandItem) => void;
  event: KeyboardEvent;
}
// ------------------------------------

// 1. The React Component (The Frosted Glass UI)
const CommandList = forwardRef((props: CommandProps, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];
    if (item) props.command(item);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === 'ArrowUp') {
        setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
        return true;
      }
      if (event.key === 'ArrowDown') {
        setSelectedIndex((selectedIndex + 1) % props.items.length);
        return true;
      }
      if (event.key === 'Enter') {
        selectItem(selectedIndex);
        return true;
      }
      return false;
    },
  }));

  if (props.items.length === 0) return null;

  return (
    <div className="flex flex-col gap-1 p-2 bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl z-50 min-w-[220px]">
      <div className="px-2 py-1 text-[10px] font-semibold tracking-wider text-gray-400 dark:text-gray-500 uppercase">
        Basic Blocks
      </div>
      {props.items.map((item: CommandItem, index: number) => (
        <button
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left transition-colors ${
            index === selectedIndex 
              ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-500' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5'
          }`}
          key={index}
          onClick={() => selectItem(index)}
        >
          <div className="p-1 bg-black/5 dark:bg-white/5 rounded-md text-inherit">
            {item.icon}
          </div>
          {item.title}
        </button>
      ))}
    </div>
  );
});

CommandList.displayName = 'CommandList'; // Fixes a minor React warning for forwardRef

// 2. The Menu Items Logic
export const getSuggestionItems = ({ query }: { query: string }): CommandItem[] => {
  return [
    { title: 'Text', icon: <Type size={16} />, action: (editor: Editor) => editor.chain().focus().setParagraph().run() },
    { title: 'Heading 1', icon: <Heading1 size={16} />, action: (editor: Editor) => editor.chain().focus().toggleHeading({ level: 1 }).run() },
    { title: 'Heading 2', icon: <Heading2 size={16} />, action: (editor: Editor) => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { title: 'Bullet List', icon: <List size={16} />, action: (editor: Editor) => editor.chain().focus().toggleBulletList().run() },
    { title: 'To-Do List', icon: <CheckSquare size={16} />, action: (editor: Editor) => editor.chain().focus().toggleTaskList().run() },
    { title: 'Code Block', icon: <Code size={16} />, action: (editor: Editor) => editor.chain().focus().toggleCodeBlock().run() },
  ].filter((item) => item.title.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
};

// 3. The Hover Render Engine
export const renderItems = () => {
  let component: ReactRenderer;
  let popup: TippyInstance[];

  return {
    onStart: (props: RenderProps) => {
      component = new ReactRenderer(CommandList, { props, editor: props.editor });
      if (!props.clientRect) return;
      popup = tippy('body', {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: 'manual',
        placement: 'bottom-start',
        arrow: false,
      });
    },
    onUpdate(props: RenderProps) {
      component.updateProps(props);
      if (!props.clientRect) return;
      popup[0].setProps({ getReferenceClientRect: props.clientRect });
    },
    onKeyDown(props: RenderProps) {
      if (props.event.key === 'Escape') {
        popup[0].hide();
        return true;
      }
      // Access the ref dynamically to trigger the keyboard navigation
      return (component.ref as any)?.onKeyDown(props) || false; 
    },
    onExit() {
      if (popup && popup.length > 0) {
        popup[0].destroy();
      }
      if (component) {
        component.destroy();
      }
    },
  };
};

// 4. The Core Extension
export const SlashCommand = Extension.create({
  name: 'slashCommand',
  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }: { editor: Editor; range: Range; props: CommandItem }) => {
          props.action(editor);
          editor.chain().focus().deleteRange(range).run();
        },
      },
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});