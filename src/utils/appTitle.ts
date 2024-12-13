import { Message } from '../types/chat';

export const getAppTitle = (message: Message): string => {
  const content = message.content.trim();
  // Get first sentence or first 50 characters
  const title = content.split(/[.!?]/)[0].trim();
  return title.length > 50 ? title.substring(0, 47) + '...' : title;
};