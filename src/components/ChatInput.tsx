import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-chatgpt-gray to-transparent pt-8 pb-6">
      <div className="mx-auto max-w-4xl px-8">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send a message..."
            className="w-full p-6 pr-16 rounded-2xl bg-chatgpt-input-bg text-white text-lg placeholder-gray-400 border border-chatgpt-border focus:outline-none focus:border-[#19c37d] focus:ring-2 focus:ring-[#19c37d] focus:ring-opacity-20 transition-all duration-200 shadow-lg"
            disabled={disabled}
          />
          <button
            type="submit"
            disabled={disabled || !input.trim()}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-gray-400 hover:text-[#19c37d] disabled:opacity-50 disabled:hover:text-gray-400 transition-colors duration-200"
          >
            <Send className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};