import { Message } from '../types/chat';
import { generateId } from './generateId';

export const createUserMessage = (content: string): Message => ({
  id: generateId(),
  content,
  role: 'user',
  timestamp: new Date(),
});

export const createAssistantMessage = (
  content: string,
  transactionId?: string
): Message => ({
  id: generateId(),
  content,
  role: 'assistant',
  timestamp: new Date(),
  transactionId,
});

export const createErrorMessage = (content: string = 'An error occurred. Please try again.'): Message => ({
  id: generateId(),
  content,
  role: 'assistant',
  timestamp: new Date(),
});