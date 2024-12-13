import React from 'react';
import { Chat } from '../types/chat';
import { MessageSquare, Trash2 } from 'lucide-react';

interface ChatGroupProps {
  title: string;
  chats: Chat[];
  activeChat: string;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
}

export const ChatGroup: React.FC<ChatGroupProps> = ({
  title,
  chats,
  activeChat,
  onSelectChat,
  onDeleteChat,
}) => {
  if (chats.length === 0) return null;

  return (
    <div className="mb-4">
      <h3 className="px-3 mb-2 text-xs font-medium text-gray-500">{title}</h3>
      {chats.map((chat) => (
        <div
          key={chat.id}
          className={`group relative flex items-center gap-2 p-3 cursor-pointer rounded-md hover:bg-chatgpt-hover ${
            activeChat === chat.id ? 'bg-chatgpt-hover' : ''
          }`}
          onClick={() => onSelectChat(chat.id)}
        >
          <MessageSquare className="w-4 h-4 text-gray-400" />
          <span className="flex-1 truncate text-gray-100 text-sm">
            {chat.title}
          </span>
          <div className="relative group">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteChat(chat.id);
              }}
              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-200 p-1 rounded-md hover:bg-chatgpt-hover"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};