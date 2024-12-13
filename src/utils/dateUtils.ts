import { Chat } from '../types/chat';

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const isYesterday = (date: Date): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
};

export const isWithinLastWeek = (date: Date): boolean => {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  return date > weekAgo && !isToday(date) && !isYesterday(date);
};

export const isWithinLastMonth = (date: Date): boolean => {
  const monthAgo = new Date();
  monthAgo.setDate(monthAgo.getDate() - 30);
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  return date > monthAgo && date <= weekAgo;
};

export const groupChats = (chats: Chat[]) => {
  return {
    today: chats.filter(chat => isToday(new Date(chat.createdAt))),
    yesterday: chats.filter(chat => isYesterday(new Date(chat.createdAt))),
    lastWeek: chats.filter(chat => isWithinLastWeek(new Date(chat.createdAt))),
    lastMonth: chats.filter(chat => isWithinLastMonth(new Date(chat.createdAt))),
  };
};