"use client";
import { useState } from "react";
import ModalUpdate from "./ModalUpdate";
import { createClient } from "utils/supabase/client";

interface IButtonUpdate {
  id: string;
  date: string;
}

export default function ButtonUpdate({ id, date }: IButtonUpdate) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [successfully, setSuccessfully] = useState(false)

  async function handleUpdate(
    e: React.MouseEvent<HTMLButtonElement>,
    status: boolean
  ) {
    setSuccessfully(false)
    const supabase = createClient();
    await supabase
      .from("attendance")
      .update({ status: status })
      .eq("student_id", e.currentTarget.id)
      .eq("date", date)
      .not("status", "is", null);
    setSuccessfully(true)
    setTimeout(() => {
			window.location.reload();
		}, 500)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-block rounded-lg bg-color60 py-3 px-6  text-xs font-bold uppercase text-white shadow-md transition-all hover:bg-color80 focus:opacity-85 active:opacity-85 disabled:pointer-events-none disabled:opacity-50"
      >
        Update
      </button>
      <ModalUpdate onClose={() => setIsOpen(false)} isOpen={isOpen}>
        <div className="w-full flex justify-around p-7">
          <button
            id={id}
            onClick={(e) => handleUpdate(e, true)}
            className="bg-color100 py-3 px-6 rounded-md cursor-pointer hover:bg-color80 font-sans text-xs font-bold uppercase text-white shadow-md"
          >
            Present
          </button>
          <button
            id={id}
            onClick={(e) => handleUpdate(e, false)}
            className="bg-contrast py-3 px-6 rounded-md cursor-pointer hover:bg-contrasthover font-sans text-xs font-bold uppercase text-white shadow-md"
          >
            Absent
          </button>
        </div>
        {successfully && <div className="w-full text-center font-semibold text-contrast">
          Update Successfully!
        </div>}
      </ModalUpdate>
    </>
  );
}
