import React from 'react';

interface IconProps {
  className?: string;
}

export const CustomAssistantIcon: React.FC<IconProps> = ({ className = "" }) => (
  <div 
    className={className}
    style={{ 
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <img 
      src="/icons/assistant-icon.png"
      alt="Assistant"
      style={{ 
        width: '100%',
        height: '100%',
        objectFit: 'contain'
      }}
    />
  </div>
);

export const CustomUserIcon: React.FC<IconProps> = ({ className = "" }) => (
  <div 
    className={className}
    style={{ 
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <img 
      src="/icons/user-icon.png"
      alt="User"
      style={{ 
        width: '100%',
        height: '100%',
        objectFit: 'contain'
      }}
    />
  </div>
);