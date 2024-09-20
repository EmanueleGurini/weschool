'use client';

import ToastNo from '@/components/ToastNo';
import ToastYes from '@/components/ToastYes';
import { useState } from 'react';
import { createClient } from 'utils/supabase/client';

export default function RetrievePassword() {
  const [input, setInput] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [toastYes, setToastYes] = useState<boolean>(false)
  const [toastNo, setToastNo] = useState<boolean>(false)

  const supabase = createClient();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(input, {
      redirectTo: 'http://localhost:3000/changePassword'
    });
    if (error) {
      setToastNo(true)
      setMessage('Error resetting password: ' + error.message);
      setTimeout(() => {
        setToastNo(false)
        setMessage('')
      }, 3000);
    } else {
      setMessage('Password reset email sent.');
      setToastYes(true)
      setMessage('Password reset email sent.');
      setTimeout(() => {
        setToastYes(false)
        setMessage('')
      }, 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {toastNo && <ToastNo setMessage={setMessage} setClose={setToastNo}>{message}</ToastNo>}
      {toastYes && <ToastYes setMessage={setMessage} setClose={setToastYes}>{message}</ToastYes>}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-color100">Retrieve Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block pt-4 pb-1 text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="email"
              placeholder="Enter your email"
              required
              className="mt-1 block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-color100 text-color0 py-2 rounded-md hover:bg-color80 focus:outline-none focus:ring-2  focus:ring-offset-2"
          >
            Send password reset email
          </button>
        </form>
      </div>
    </div>
  );
}
