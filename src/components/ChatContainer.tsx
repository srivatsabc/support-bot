import React from 'react';
import { Message } from '../types/chat';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { useAutoScroll } from '../hooks/useAutoScroll';

interface ChatContainerProps {
  messages: Message[];
  isTyping: boolean;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ messages, isTyping }) => {
  const scrollRef = useAutoScroll(messages, isTyping);

  return (
    <div ref={scrollRef} className="h-full overflow-y-auto custom-scrollbar pb-36">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      {isTyping && <TypingIndicator />}
    </div>
  );
};