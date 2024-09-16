'use client'
import { ReactNode } from "react";

interface IModal {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

export default function ModalUpload({ isOpen, onClose, children }: IModal) {
	return (
    <>
		{isOpen && (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
				<div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
					<button
						className="absolute text-4xl top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
						onClick={onClose}
					>
						&times;
					</button>
					<div className="mt-4">{children}</div>
				</div>
			</div>
		)}
    </>
	)
}
