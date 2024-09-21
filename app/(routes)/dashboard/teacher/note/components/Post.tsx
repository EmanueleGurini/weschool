"use client";

import { createClient } from "utils/supabase/client";
import { MouseEvent } from "react";

interface IPost {
  date: string;
  title: string;
  note_id: string;
  description: string;
  full_name: string;
  isDelete: boolean;
  author_id: string;
  name: string;
}

export default function Post({ date, title, note_id, description, full_name, isDelete, author_id, name }: IPost) {
  const handleDelete = async (e: MouseEvent) => {
    const supabase = createClient();
    await supabase.from("notes").delete().eq("id", e.currentTarget.id);
    window.location.reload();
  };

  return (
    <div className="relative max-w-md mx-auto py-3 bg-white rounded-xl overflow-hidden md:max-w-2xl my-4">
      <div className="absolute right-4 uppercase tracking-wide text-xl text-primary font-semibold">{name}</div>
      {isDelete && (
        <div id={author_id}>
          <button
            id={note_id}
            onClick={handleDelete}
            className="absolute bottom-4 right-4 inline-block rounded-lg bg-color100 py-3 px-6 text-xs font-bold uppercase text-white shadow-md transition-all hover:bg-color80 focus:opacity-85 active:opacity-85 disabled:pointer-events-none disabled:opacity-50"
          >
            DELETE
          </button>
        </div>
      )}
      <div className="md:flex">
        <div className="p-8">
          <h1 className="block mt-1 leading-tight text-primary font-bold text-xl">{title}</h1>
          <p className="mt-2 text-primary">{description}</p>
          <div className="mt-4 flex items-center">
            <div className="text-sm text-primary">
              <p className="text-contrasthover font-bold uppercase">Teacher: {full_name}</p>
              <p className="">{date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
