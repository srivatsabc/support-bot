import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message } from '../types/chat';
import { CustomAssistantIcon, CustomUserIcon } from './icons/CustomIcons';
import { FeedbackButtons } from './FeedbackButtons';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';
  
  return (
    <div className={`py-8 ${isAssistant ? '' : 'bg-chatgpt-gray'}`}>
      <div className="max-w-4xl mx-auto px-8">
        <div className={`flex items-start gap-6 ${isAssistant ? 'flex-row' : 'flex-row-reverse'}`}>
          <div className="flex-shrink-0 mt-1">
            <div className="w-10 h-10">
              {isAssistant ? (
                <CustomAssistantIcon className="w-full h-full" />
              ) : (
                <CustomUserIcon className="w-full h-full" />
              )}
            </div>
          </div>
          <div className={`flex-1 ${isAssistant ? '' : 'flex justify-end'}`}>
            {isAssistant ? (
              <div className="text-gray-100">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({node, ...props}) => <p className="text-gray-100 leading-relaxed mb-4 last:mb-0" {...props} />,
                    a: ({node, ...props}) => <a className="text-blue-400 hover:underline" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 last:mb-0" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 last:mb-0" {...props} />,
                    li: ({node, ...props}) => <li className="mb-2 last:mb-0" {...props} />,
                    code: ({node, inline, ...props}) => (
                      inline ? 
                        <code className="bg-gray-800 px-2 py-1 rounded-lg" {...props} /> :
                        <code className="block bg-gray-800 p-6 rounded-xl my-6 overflow-x-auto last:mb-0" {...props} />
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
                {isAssistant && message.transactionId && (
                  <FeedbackButtons transactionId={message.transactionId} />
                )}
              </div>
            ) : (
              <div className="bg-[#40414F] rounded-2xl px-8 py-4 text-white max-w-[85%]">
                {message.content}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};