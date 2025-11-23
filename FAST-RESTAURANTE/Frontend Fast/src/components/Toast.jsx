import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 
                  type === 'error' ? 'bg-red-500' : 
                  type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500';

  const icon = type === 'success' ? '✓' : 
               type === 'error' ? '✕' : 
               type === 'warning' ? '⚠' : 'ℹ';

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 min-w-[300px]`}>
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white bg-opacity-30 flex items-center justify-center font-bold text-xl">
          {icon}
        </div>
        <p className="font-medium flex-1">{message}</p>
        <button 
          onClick={onClose}
          className="flex-shrink-0 text-white hover:text-gray-200 font-bold text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
