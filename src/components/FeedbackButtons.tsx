import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { chatApi } from '../services/api';

interface FeedbackButtonsProps {
  transactionId: string;
}

export const FeedbackButtons: React.FC<FeedbackButtonsProps> = ({ transactionId }) => {
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);

  const handleFeedback = async (isPositive: boolean) => {
    if (feedback !== null) return; // Prevent multiple feedback submissions
    
    try {
      await chatApi.sendFeedback(transactionId, isPositive);
      setFeedback(isPositive ? 'positive' : 'negative');
    } catch (error) {
      console.error('Error sending feedback:', error);
    }
  };

  return (
    <div className="flex items-center gap-4 mt-4">
      <button
        onClick={() => handleFeedback(true)}
        disabled={feedback !== null}
        className={`p-1 rounded hover:bg-gray-100 transition-colors ${
          feedback === 'positive' ? 'text-green-500' : 'text-gray-400'
        }`}
        title="Helpful"
      >
        <ThumbsUp className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleFeedback(false)}
        disabled={feedback !== null}
        className={`p-1 rounded hover:bg-gray-100 transition-colors ${
          feedback === 'negative' ? 'text-red-500' : 'text-gray-400'
        }`}
        title="Not helpful"
      >
        <ThumbsDown className="w-4 h-4" />
      </button>
    </div>
  );
};