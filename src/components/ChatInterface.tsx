import React from 'react';
import { ResizableSidebar } from './ResizableSidebar';
import { ChatContainer } from './ChatContainer';
import { ChatInput } from './ChatInput';
import { useChatContext } from '../contexts/ChatContext';

export const ChatInterface: React.FC = () => {
  const { chats, activeChat, isTyping, handleNewChat, handleDeleteChat, handleSendMessage, handleSelectChat } = useChatContext();
  const currentChat = chats.find(chat => chat.id === activeChat);

  return (
    <div className="flex h-screen bg-chatgpt-gray overflow-hidden">
      <ResizableSidebar
        chats={chats}
        activeChat={activeChat}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
      />
      <main className="flex-1 relative flex flex-col min-w-0">
        {currentChat && (
          <>
            <div className="absolute inset-0">
              <ChatContainer messages={currentChat.messages} isTyping={isTyping} />
            </div>
            <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
          </>
        )}
      </main>
    </div>
  );
};