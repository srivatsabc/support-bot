import { useState, useCallback } from 'react';
import { Message, Chat } from '../types/chat';
import { generateId } from '../utils/generateId';
import { chatApi } from '../services/api';

export const useChatMessages = (
  chats: Chat[],
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>,
  activeChat: string,
  setAppTitle: (title: string) => void
) => {
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: generateId(),
      content,
      role: 'user',
      timestamp: new Date(),
    };
    
    // Add user message to chat
    setChats(prev => prev.map(chat => 
      chat.id === activeChat
        ? { ...chat, messages: [...chat.messages, userMessage] }
        : chat
    ));

    // Update chat title if it's the first user message
    const currentChat = chats.find(chat => chat.id === activeChat);
    if (currentChat?.messages.length === 1) {
      setAppTitle(content);
      setChats(prev => prev.map(chat => 
        chat.id === activeChat
          ? { ...chat, title: content }
          : chat
      ));
    }

    setIsTyping(true);

    try {
      // Get response from API with session management
      const response = await chatApi.sendMessage(content, currentChat?.sessionId);
      
      // Add assistant's response to chat
      const assistantMessage: Message = {
        id: generateId(),
        content: response.result,
        role: 'assistant',
        timestamp: new Date(),
      };
      
      // Update chat with new message and session ID
      setChats(prev => prev.map(chat => 
        chat.id === activeChat
          ? { 
              ...chat, 
              messages: [...chat.messages, assistantMessage],
              sessionId: response.session_id // Store the session ID
            }
          : chat
      ));
    } catch (error) {
      // Handle error
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
  }, [activeChat, chats, setChats, setAppTitle]);

  return { isTyping, handleSendMessage };
};