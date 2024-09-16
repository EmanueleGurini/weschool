'use client'
import { useState } from "react";
import ModalUpdate from "./ModalUpdate";

export default function ButtonUpload() {
	
	const [isOpen, setIsOpen] = useState<boolean>(false)

	function handleClose() {
		window.location.reload();
	}

	return (
		<>
			<button onClick={() => setIsOpen(true)} className="bg-blue-600 p-2 rounded text-white cursor-pointer hover:bg-blue-500">Upload</button>
			<ModalUpdate onClose={() => setIsOpen(false)} isOpen={isOpen}>
				<div className="w-full flex justify-around p-7">
					<button onClick={handleClose} className="bg-green-500 p-2 rounded-md cursor-pointer hover:bg-green-400 font-semibold">Present</button>
					<button onClick={handleClose} className="bg-red-500 p-2 rounded-md cursor-pointer hover:bg-red-400 font-semibold">Absent</button>
				</div>
			</ModalUpdate>
		</>
	)
}