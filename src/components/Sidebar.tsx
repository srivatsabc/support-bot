import React from 'react';
import { Plus } from 'lucide-react';
import { Chat } from '../types/chat';
import { ChatGroup } from './ChatGroup';
import { groupChats } from '../utils/dateUtils';

interface SidebarProps {
  chats: Chat[];
  activeChat: string | null;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  chats,
  activeChat,
  onNewChat,
  onSelectChat,
  onDeleteChat,
}) => {
  const groupedChats = groupChats(chats);

  return (
    <div className="w-64 bg-chatgpt-sidebar flex flex-col h-screen overflow-hidden">
      <div className="p-2 flex-shrink-0">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-2 p-3 rounded-md border border-chatgpt-border hover:bg-chatgpt-hover text-white transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="px-2 pb-2">
          <ChatGroup
            title="Today"
            chats={groupedChats.today}
            activeChat={activeChat || ''}
            onSelectChat={onSelectChat}
            onDeleteChat={onDeleteChat}
          />
          <ChatGroup
            title="Yesterday"
            chats={groupedChats.yesterday}
            activeChat={activeChat || ''}
            onSelectChat={onSelectChat}
            onDeleteChat={onDeleteChat}
          />
          <ChatGroup
            title="Previous 7 Days"
            chats={groupedChats.lastWeek}
            activeChat={activeChat || ''}
            onSelectChat={onSelectChat}
            onDeleteChat={onDeleteChat}
          />
          <ChatGroup
            title="Previous 30 Days"
            chats={groupedChats.lastMonth}
            activeChat={activeChat || ''}
            onSelectChat={onSelectChat}
            onDeleteChat={onDeleteChat}
          />
        </div>
      </div>
    </div>
  );
};