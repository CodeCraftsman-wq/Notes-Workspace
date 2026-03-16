import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react';
import { Image as BaseImage } from '@tiptap/extension-image';
import { Trash2, GripHorizontal } from 'lucide-react';
import { useState, useRef } from 'react';

const ResizableImageComponent = (props: any) => {
  const { node, updateAttributes, deleteNode, selected } = props;
  const { src, alt, width } = node.attrs;
  
  const imgRef = useRef<HTMLImageElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); 
    
    setIsResizing(true);
    
    const startX = e.clientX;
    const startWidth = imgRef.current?.offsetWidth || 0;

    const onMouseMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();
      const currentX = moveEvent.clientX;
      const newWidth = Math.max(150, startWidth + (currentX - startX)); 
      updateAttributes({ width: newWidth });
    };

    const onMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <NodeViewWrapper 
      className="relative inline-block max-w-full my-4 align-middle"
      style={{ width: width ? `${width}px` : 'auto' }}
    >
      <div 
        className={`relative group inline-block max-w-full ${selected ? 'ring-2 ring-yellow-500 rounded-lg' : ''}`}
        style={{ width: '100%' }}
      >
        
        {/* 👉 NEW: Hover Overlay: Drag Handle (Top Left) */}
        {/* The 'data-drag-handle' attribute magically tells Tiptap to let you move the image! */}
        <div 
          data-drag-handle
          className="absolute top-2 left-2 p-1.5 bg-black/60 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing hover:bg-black/80 z-10"
          title="Drag to move"
        >
          <GripHorizontal size={16} />
        </div>

        {/* Hover Overlay: Delete Button (Top Right) */}
        <button 
          onClick={deleteNode}
          className="absolute top-2 right-2 p-1.5 bg-red-500/90 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-600 z-10"
          title="Delete Image"
        >
          <Trash2 size={16} />
        </button>

        <img 
          ref={imgRef}
          src={src} 
          alt={alt} 
          // Removed pointer-events-none so the drag handle works perfectly
          className="rounded-lg shadow-md block w-full h-auto" 
        />

        {/* Hover Overlay: Resize Handle (Bottom Right) */}
        <div 
          onMouseDown={handleMouseDown}
          className={`absolute bottom-0 right-0 w-8 h-8 cursor-nwse-resize flex items-end justify-end p-1 z-10 ${
            isResizing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          } transition-opacity`}
          title="Drag to resize"
        >
          <div className="w-5 h-5 bg-yellow-500 rounded-tl-lg rounded-br-lg flex items-center justify-center shadow-md border border-yellow-600/20">
            <div className="w-2 h-2 border-b-2 border-r-2 border-white/90 mr-1 mb-1" />
          </div>
        </div>
        
      </div>
    </NodeViewWrapper>
  );
};

export const ResizableImage = BaseImage.extend({
  // 👉 NEW: This single line unlocks Tiptap's built-in drag-and-drop engine
  draggable: true, 
  
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: element => element.getAttribute('width'),
        renderHTML: attributes => {
          if (!attributes.width) return {};
          return { width: attributes.width };
        },
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageComponent);
  },
});