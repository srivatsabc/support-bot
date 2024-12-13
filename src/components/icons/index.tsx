import React from 'react';

interface IconProps {
  className?: string;
}

export const AssistantIcon: React.FC<IconProps> = ({ className = "" }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" />
    <circle cx="12" cy="12" r="3" fill="white" />
    <circle cx="12" cy="17" r="1" fill="white" />
    <circle cx="12" cy="7" r="1" fill="white" />
    <circle cx="17" cy="12" r="1" fill="white" />
    <circle cx="7" cy="12" r="1" fill="white" />
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({ className = "" }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
  </svg>
);