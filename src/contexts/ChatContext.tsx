import React, { createContext, useContext, useState, useCallback } from 'react';
import { Chat, Message } from '../types/chat';
import { generateId } from '../utils/generateId';
import { chatApi } from '../services/api';

const INITIAL_MESSAGE: Message = {
  id: generateId(),
  content: "Hello! I'm your AI assistant. How can I help you today?",
  role: 'assistant',
  timestamp: new Date(),
};

const INITIAL_CHAT: Chat = {
  id: generateId(),
  title: 'New conversation',
  messages: [INITIAL_MESSAGE],
  createdAt: new Date(),
};

interface ChatContextType {
  chats: Chat[];
  activeChat: string;
  isTyping: boolean;
  handleNewChat: () => void;
  handleDeleteChat: (chatId: string) => void;
  handleSendMessage: (content: string) => Promise<void>;
  handleSelectChat: (chatId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([INITIAL_CHAT]);
  const [activeChat, setActiveChat] = useState<string>(INITIAL_CHAT.id);
  const [isTyping, setIsTyping] = useState(false);

  const handleNewChat = useCallback(() => {
    const newChat: Chat = {
      id: generateId(),
      title: 'New conversation',
      messages: [INITIAL_MESSAGE],
      createdAt: new Date(),
    };
    setChats(prev => [...prev, newChat]);
    setActiveChat(newChat.id);
  }, []);

  const handleDeleteChat = useCallback((chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (activeChat === chatId) {
      setActiveChat(chats[0]?.id);
    }
  }, [activeChat, chats]);

  const handleSendMessage = useCallback(async (content: string) => {
    const currentChat = chats.find(chat => chat.id === activeChat);
    if (!currentChat) return;

    const userMessage: Message = {
      id: generateId(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setChats(prev => prev.map(chat => 
      chat.id === activeChat
        ? { ...chat, messages: [...chat.messages, userMessage] }
        : chat
    ));

    if (currentChat.messages.length === 1) {
      setChats(prev => prev.map(chat => 
        chat.id === activeChat
          ? { ...chat, title: content }
          : chat
      ));
    }

    setIsTyping(true);

    try {
      const response = await chatApi.sendMessage(content, currentChat.sessionId);
      
      const assistantMessage: Message = {
        id: generateId(),
        content: response.result,
        role: 'assistant',
        timestamp: new Date(),
        transactionId: response.transaction_id
      };

      setChats(prev => prev.map(chat => 
        chat.id === activeChat
          ? { 
              ...chat, 
              messages: [...chat.messages, assistantMessage],
              sessionId: response.session_id
            }
          : chat
      ));
    } catch (error) {
      const errorMessage: Message = {
        id: generateId(),
        content: 'Sorry, I encountered an error while processing your request. Please try again.',
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setChats(prev => prev.map(chat => 
        chat.id === activeChat
          ? { ...chat, messages: [...chat.messages, errorMessage] }
          : chat
      ));
    } finally {
      setIsTyping(false);
    }
  }, [activeChat, chats]);

  const value = {
    chats,
    activeChat,
    isTyping,
    handleNewChat,
    handleDeleteChat,
    handleSendMessage,
    handleSelectChat: setActiveChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};