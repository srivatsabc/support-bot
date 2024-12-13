import React from 'react';
import { CustomAssistantIcon } from './icons/CustomIcons';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-8">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0 mt-1">
            <div className="w-10 h-10">
              <CustomAssistantIcon className="w-full h-full" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ 
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '1s'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};