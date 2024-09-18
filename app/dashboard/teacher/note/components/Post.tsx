"use client";

import { createClient } from "utils/supabase/client";
import { MouseEvent } from "react";
interface IPost {
  date: string;
  title: string;
  note_id: string;
  class_name: string;
  description: string;
  teacher_name: string;
}

export default function Post({ date, title, note_id, class_name, description, teacher_name }: IPost) {
  const handleDelete = async (e: MouseEvent) => {
    const supabase = createClient();
    await supabase.from("notes").delete().eq("id", e.currentTarget.id);
    window.location.reload();
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
      <button id={note_id} onClick={handleDelete}>
        DELETE
      </button>
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{class_name}</div>
          <h1 className="block mt-1 text-lg leading-tight font-medium text-black">{title}</h1>
          <p className="mt-2 text-gray-500">{description}</p>
          <div className="mt-4 flex items-center">
            <div className="text-sm text-gray-500">
              <p className="text-indigo-400">Teacher: {teacher_name}</p>
              <p className="">{date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
