import React from 'react';

interface IconProps {
  className?: string;
}

export const CustomAssistantIcon: React.FC<IconProps> = ({ className = "" }) => (
  <img 
    src="/icons/assistant-icon.svg"
    alt="Assistant"
    width="24"
    height="24"
    className={className}
  />
);