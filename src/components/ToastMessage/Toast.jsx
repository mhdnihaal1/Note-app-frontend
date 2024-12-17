import React, { useEffect } from 'react';
import { LuCheck } from 'react-icons/lu';
import { MdDeleteOutline } from 'react-icons/md';

const Toast = ({ isShown, message, type, onClose }) => {
  useEffect(() => {
    if (isShown) {
      const timeoutId = setTimeout(() => {
        onClose(); // Call the onClose callback after 3 seconds
      }, 3000);

      return () => {
        clearTimeout(timeoutId); // Clean up the timeout
      };
    }
  }, [isShown, onClose]);

  // Render the toast only when isShown is true
  if (!isShown) return null;

  return (
    <div
      className={`fixed top-20 right-6 transition-all duration-500 ease-in-out transform ${
        isShown ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
      }`}
    >
      <div
        className={`min-w-52 bg-white border shadow-2xl rounded-md relative after:w-[5px] after:h-full ${
          type === 'delete' ? 'after:bg-red-500' : 'after:bg-green-500'
        } after:absolute after:left-0 after:top-0 after:rounded-l-lg`}
      >
        <div className="flex items-center gap-3 py-2 px-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              type === 'delete' ? 'bg-red-50' : 'bg-green-50'
            }`}
          >
            {type === 'delete' ? (
              <MdDeleteOutline className="text-xl text-red-500" />
            ) : (
              <LuCheck className="text-xl text-green-500" />
            )}
          </div>
          <p className="text-sm text-slate-800">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
