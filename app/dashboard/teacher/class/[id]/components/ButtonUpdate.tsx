"use client";
import { useState } from "react";
import ModalUpdate from "./ModalUpdate";

export default function ButtonUpdate() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleClose() {
    window.location.reload();
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-block rounded-lg bg-color60 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:bg-color80 focus:opacity-85 active:opacity-85 disabled:pointer-events-none disabled:opacity-50"
      >
        Update
      </button>
      <ModalUpdate onClose={() => setIsOpen(false)} isOpen={isOpen}>
        <div className="w-full flex justify-around p-7">
          <button
            onClick={handleClose}
            className="bg-color100 py-3 px-6 rounded-md cursor-pointer hover:bg-color80 font-sans text-xs font-bold uppercase text-white shadow-md"
          >
            Present
          </button>
          <button
            onClick={handleClose}
            className="bg-contrast py-3 px-6 rounded-md cursor-pointer hover:bg-contrasthover font-sans text-xs font-bold uppercase text-white shadow-md"
          >
            Absent
          </button>
        </div>
      </ModalUpdate>
    </>
  );
}
