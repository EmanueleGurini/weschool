"use client";
import { useState, MouseEvent } from "react";
import ModalUpdate from "./ModalUpdate";

interface IButtonUpload {
  id: string;
  classID: string;
  date: string;
  onClick: (
    e: MouseEvent<HTMLButtonElement>,
    classID: string,
    status: boolean,
    date: string
  ) => void;
}

export default function ButtonUpload({
  onClick,
  id,
  classID,
  date,
}: IButtonUpload) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-block rounded-lg bg-contrasthover py-3 px-6  text-xs font-bold uppercase text-white shadow-md transition-all hover:bg-contrast focus:opacity-85 active:opacity-85 disabled:pointer-events-none disabled:opacity-50"
      >
        Upload
      </button>
      <ModalUpdate onClose={() => setIsOpen(false)} isOpen={isOpen}>
        <div className="w-full flex justify-around p-7">
          <button
            id={id}
            onClick={(e) => onClick(e, classID, true, date)}
            className="bg-color100 py-3 px-6 rounded-md cursor-pointer hover:bg-color80 text-xs font-bold uppercase text-white shadow-md"
          >
            Present
          </button>
          <button
            id={id}
            onClick={(e) => onClick(e, classID, false, date)}
            className="bg-contrast py-3 px-6 rounded-md cursor-pointer hover:bg-contrasthover text-xs font-bold uppercase text-white shadow-md"
          >
            Absent
          </button>
        </div>
      </ModalUpdate>
    </>
  );
}
