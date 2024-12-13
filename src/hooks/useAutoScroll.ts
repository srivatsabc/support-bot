import { useEffect, useRef } from 'react';
import { Message } from '../types/chat';

export const useAutoScroll = (messages: Message[], isTyping: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isTyping]);

  return containerRef;
};