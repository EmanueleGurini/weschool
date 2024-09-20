"use client";
import { useState, MouseEvent } from "react";
import ModalUpdate from "./ModalUpdate";
import { createClient } from "utils/supabase/client";

interface IButtonUpload {
  id: string;
  date: string;
  classID: string;
}

export default function ButtonUpload({
  id,
  date,
  classID
}: IButtonUpload) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [successfully, setSuccessfully] = useState(false)

  async function handleUpload(
    e: MouseEvent<HTMLButtonElement>,
    status: boolean,
    date: string,
  ): Promise<void> {
    setSuccessfully(false)
    const supabase = createClient();
    await supabase
      .from("attendance")
      .insert({
        student_id: e.currentTarget.id,
        status: status,
        date: date,
        class_id: classID
      })
      .select();
    setSuccessfully(true)
    setTimeout(() => {
			window.location.reload();
		}, 500)
  }

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
            onClick={(e) => handleUpload(e, true, date)}
            className="bg-color100 py-3 px-6 rounded-md cursor-pointer hover:bg-color80 text-xs font-bold uppercase text-white shadow-md"
          >
            Present
          </button>
          <button
            id={id}
            onClick={(e) => handleUpload(e, false, date)}
            className="bg-contrast py-3 px-6 rounded-md cursor-pointer hover:bg-contrasthover text-xs font-bold uppercase text-white shadow-md"
          >
            Absent
          </button>
        </div>
        {successfully && <div className="w-full text-center font-semibold text-contrast">
          Upload Successfully!
        </div>}
      </ModalUpdate>
    </>
  );
}
