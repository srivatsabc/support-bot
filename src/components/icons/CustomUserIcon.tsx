import React from 'react';

interface IconProps {
  className?: string;
}

export const CustomUserIcon: React.FC<IconProps> = ({ className = "" }) => (
  <img 
    src="/icons/user-icon.svg"
    alt="User"
    width="24"
    height="24"
    className={className}
  />
);