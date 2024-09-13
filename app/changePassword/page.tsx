'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from 'utils/supabase/client';
import ToastNo from '@/components/ToastNo';
import ToastYes from '@/components/ToastYes';

export default function ChangePassword() {
	const [newPassword, setNewPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [message, setMessage] = useState<string>('');
	const [toastYes, setToastYes] = useState<boolean>(false);
	const [toastNo, setToastNo] = useState<boolean>(false);
	const router = useRouter();
	
	const supabase = createClient();

	const isPasswordValid = (password: string) => {
		const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?`~])[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>/?`~]{6,}$/;
		return regex.test(password);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!isPasswordValid(newPassword)) {
			setToastNo(true);
			setMessage('Password must be at least 6 characters long, include an uppercase letter, a number, and a special character.');
			setTimeout(() => {
				setToastNo(false);
				setMessage('');
			}, 3000);
			return;
		}

		if (newPassword !== confirmPassword) {
			setToastNo(true);
			setMessage('Passwords do not match.');
			setTimeout(() => {
				setToastNo(false);
				setMessage('');
			}, 3000);
			return;
		}

		const { data: { user }, error: userError } = await supabase.auth.getUser();
    
		if (userError || !user) {
			setToastNo(true);
			setMessage('User not authenticated or error retrieving user');
			setTimeout(() => {
				setToastNo(false);
				setMessage('');
			}, 3000);
			return;
		}

		const { error } = await supabase.auth.updateUser({ password: newPassword });

		if (error) {
			setToastNo(true);
			setMessage('Error changing password: ' + error.message);
			setTimeout(() => {
				setToastNo(false);
				setMessage('');
			}, 3000);
		} else {
			setToastYes(true);
			setMessage('Password changed successfully!');
			setTimeout(() => {
				setToastYes(false);
				setMessage('');
			}, 3000);
			setTimeout(() => {
				router.push('/login');
			}, 2000);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
			{toastNo && <ToastNo setMessage={setMessage} setClose={setToastNo}>{message}</ToastNo>}
			{toastYes && <ToastYes setMessage={setMessage} setClose={setToastYes}>{message}</ToastYes>}
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
				</form>
			</div>
		</div>
	)
}
