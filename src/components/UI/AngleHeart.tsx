import React from 'react';

interface AngleHeartProps {
  className?: string;
}

export function AngleHeart({ className = '' }: AngleHeartProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 21L2 11C0.343146 9.34315 0.343146 6.65685 2 5C3.65685 3.34315 6.34315 3.34315 8 5L12 9L16 5C17.6569 3.34315 20.3431 3.34315 22 5C23.6569 6.65685 23.6569 9.34315 22 11L12 21Z" />
    </svg>
  );
}