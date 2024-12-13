export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  transactionId?: string; // Add transaction ID for assistant messages
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  sessionId?: string;
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
}