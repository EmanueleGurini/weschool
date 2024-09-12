'use client';

import { useState } from 'react';
import { createClient } from 'utils/supabase/client';

export default function RetrievePassword() {
  const [input, setInput] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(input, {
      redirectTo: 'http://localhost:3000/changePassword'
    });
    if (error) {
      setMessage('Error resetting password: ' + error.message);
    } else {
      setMessage('Password reset email sent.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Retrieve Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="email"
              placeholder="Enter your email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Send Password Reset Email
          </button>
          {message && <p className="text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
}
