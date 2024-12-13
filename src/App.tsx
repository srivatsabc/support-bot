import React from 'react';
import { ChatProvider } from './contexts/ChatContext';
import { ChatInterface } from './components/ChatInterface';

export default function App() {
  return (
    <ChatProvider>
      <ChatInterface />
    </ChatProvider>
  );
}