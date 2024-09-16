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
				<h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-color100">Change Password</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label htmlFor="newPassword" className="block pt-4 pb-1 text-sm font-medium text-gray-700">
							New Password
						</label>
						<input
							id="newPassword"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							type="password"
							placeholder="Enter new password"
							required
							className="mt-1 block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
							className="mt-1 block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-color100 text-color0 py-2 rounded-md hover:bg-color80 focus:outline-none focus:ring-2  focus:ring-offset-2"
					>
						Change Password
					</button>
				</form>
			</div>
		</div>
	)
}
