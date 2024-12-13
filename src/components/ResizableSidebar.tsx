import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Chat } from '../types/chat';

interface ResizableSidebarProps {
  chats: Chat[];
  activeChat: string | null;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
}

export const ResizableSidebar: React.FC<ResizableSidebarProps> = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [width, setWidth] = useState(260);
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    document.body.classList.add('resize-cursor');

    const onMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        const newWidth = Math.min(Math.max(e.clientX, 260), 600);
        setWidth(newWidth);
      });
    };

    const onMouseUp = () => {
      setIsResizing(false);
      document.body.classList.remove('resize-cursor');
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, []);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  return (
    <>
      <div 
        style={{ 
          width: isCollapsed ? '0' : `${width}px`,
          minWidth: isCollapsed ? '0' : `${width}px`,
          maxWidth: isCollapsed ? '0' : `${width}px`,
        }}
        className="h-full transition-[width] duration-300 ease-in-out overflow-hidden relative flex-shrink-0"
      >
        <Sidebar {...props} />
        
        {!isCollapsed && (
          <div
            onMouseDown={startResizing}
            className="absolute right-0 top-0 bottom-0 w-1 hover:w-1.5 bg-transparent hover:bg-chatgpt-border cursor-col-resize transition-all"
          />
        )}
      </div>

      <div
        className={`absolute ${isCollapsed ? 'left-0' : ''} top-0 z-50`}
        style={{ left: isCollapsed ? '0' : `${width - 20}px` }}
      >
        <button
          onClick={toggleCollapse}
          className="p-1 mt-2 bg-chatgpt-hover hover:bg-chatgpt-border rounded-lg text-gray-400 hover:text-gray-200 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>
    </>
  );
};