import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FeedbackButtons } from '../feedback/FeedbackButtons';

interface MessageContentProps {
  content: string;
  isAssistant: boolean;
  transactionId?: string;
}

export const MessageContent: React.FC<MessageContentProps> = ({
  content,
  isAssistant,
  transactionId,
}) => {
  if (!isAssistant) {
    return (
      <div className="bg-[#40414F] rounded-2xl px-8 py-4 text-white max-w-[85%]">
        {content}
      </div>
    );
  }

  return (
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
        {content}
      </ReactMarkdown>
      {isAssistant && transactionId && (
        <FeedbackButtons transactionId={transactionId} />
      )}
    </div>
  );
};