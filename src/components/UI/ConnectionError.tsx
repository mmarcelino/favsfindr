import React from 'react';
import { WifiOff } from 'lucide-react';

interface ConnectionErrorProps {
  message?: string;
}

export function ConnectionError({ message = 'Connection Error' }: ConnectionErrorProps) {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center p-4">
      <div className="text-center">
        <WifiOff className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{message}</h2>
        <p className="text-gray-600">
          Please check your connection and try again
        </p>
      </div>
    </div>
  );
}