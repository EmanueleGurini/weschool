'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from 'utils/supabase/client';

export default function ChangePassword() {
	const [newPassword, setNewPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [message, setMessage] = useState<string | null>(null);
	const router = useRouter();
	const supabase = createClient();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (newPassword !== confirmPassword) {
			setMessage('Passwords do not match.');
			return;
		}

		const { data: { user }, error: userError } = await supabase.auth.getUser();
    
		if (userError || !user) {
			setMessage('User not authenticated or error retrieving user');
			return;
		}

		const { error } = await supabase.auth.updateUser({ password: newPassword });

		if (error) {
			setMessage('Error changing password: ' + error.message);
		} else {
			setMessage('Password changed successfully!');
			setTimeout(() => {
				router.push('/login');
			}, 2000);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
			<div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
				<h2 className="text-2xl font-semibold mb-4 text-center">Change Your Password</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
							New Password
						</label>
						<input
							id="newPassword"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							type="password"
							placeholder="Enter new password"
							required
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						/>
					</div>
					<div>
						<label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
							Confirm Password
						</label>
						<input
							id="confirmPassword"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							type="password"
							placeholder="Confirm new password"
							required
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						/>
					</div>
					<button
						type="submit"
						className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						Change Password
					</button>
					{message && <p className="text-center">{message}</p>}
				</form>
			</div>
		</div>
	);
}
