import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  onSignIn: () => void;
}

export function Toast({ message, isVisible, onClose, onSignIn }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const parts = message.split('sign in');
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-4 max-w-md">
        <p className="text-gray-700">
          {parts[0]}
          <button
            onClick={onSignIn}
            className="text-[#E27DEE] font-medium hover:underline mx-1"
          >
            sign in
          </button>
          {parts[1]}
        </p>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}