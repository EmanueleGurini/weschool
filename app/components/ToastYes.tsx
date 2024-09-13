'use client'
import { Dispatch, ReactNode, SetStateAction } from 'react';

interface IToast {
	children: ReactNode;
  setClose: Dispatch<SetStateAction<boolean>>;
  setMessage: Dispatch<SetStateAction<string>>;
}

const ToastYes = (props: IToast) => {
	const {children, setClose, setMessage} = props;
  return (
    <div className="fixed top-4 right-4 flex items-center w-full max-w-xs p-4 space-x-4 text-white bg-gray-800 border border-gray-700 rounded-lg shadow-lg animate-slide-in">
      <div className="flex-shrink-0">
        <svg
          className="w-6 h-6 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <div className="ml-3 text-sm font-normal">
        {children}
      </div>
      <button
        className="text-gray-400 hover:text-white focus:outline-none absolute right-1 top-1"
        onClick={() => {
          setClose(false);
          setMessage('');
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  )
}

export default ToastYes;
