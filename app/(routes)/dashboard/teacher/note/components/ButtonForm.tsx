"use client";
import { useState } from "react";
import ModalForm from "./ModalForm";
import FormPost from "./FormPost";
import { IFormPost } from "./FormPost";

export default function ButtonForm({ id, classes }: IFormPost) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button
        className="inline-block rounded-lg bg-contrast py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:bg-contrasthover focus:opacity-85 active:opacity-85 disabled:pointer-events-none disabled:opacity-50"
        onClick={() => setIsOpen(true)}
      >
        Create Post
      </button>
      <ModalForm onClose={() => setIsOpen(false)} isOpen={isOpen}>
        <div className="w-full flex justify-around p-7">
          <FormPost id={id} classes={classes} />
        </div>
      </ModalForm>
    </>
  );
}
