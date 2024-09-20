import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { getTeacherNotes } from "app/api/supabase/actions";
import { IRole } from "app/page";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "utils/supabase/server";
import Post from "./components/Post";
import ButtonForm from "./components/ButtonForm";
import Link from "next/link";

interface Note {
  date: string;
  title: string;
  note_id: string;
  class_name: string;
  description: string;
  full_name: string;
  author_id: string;
}

export default async function Notes({ searchParams }: { searchParams: { date?: string } }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  if (user) {
    const data: PostgrestSingleResponse<IRole> = await supabase.from("profile_roles").select("roles(role)").eq("id", user!.id).single();

    const userRole = data.data?.roles.role;

    if (userRole === "student") {
      revalidatePath("/", "layout");
      redirect("/dashboard/student");
    }
  }

  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');

  const today = `${year}-${month}-${day}`;

  const selectedDate = searchParams.date || today;
  const notes = await getTeacherNotes(user.id, selectedDate);

  return (
    <>
      <div className="w-full flex justify-between items-center p-6">
        <ButtonForm id={user.id} classes={notes.courses} />
        <Link
          href="/dashboard/teacher"
          className="inline-block rounded-lg bg-color100 py-3 px-6 text-xs font-bold uppercase text-white shadow-md transition-all hover:bg-color80 focus:opacity-85 active:opacity-85 disabled:pointer-events-none disabled:opacity-50"
        >
          Go Back
        </Link>
      </div>

      <div className="w-full flex justify-center items-center p-6">
        <form method="GET" className="flex items-center">
          <label htmlFor="date" className="mr-2">
            Select Date:
          </label>
          <input id="date" type="date" name="date" defaultValue={selectedDate} className="border border-gray-300 rounded-lg p-2" />
          <button
            type="submit"
            className="ml-4 inline-block rounded-lg bg-color100 py-3 px-6 text-xs font-bold uppercase text-white shadow-md transition-all hover:bg-color80 focus:opacity-85 active:opacity-85 disabled:pointer-events-none disabled:opacity-50"
          >
            Filter Posts
          </button>
        </form>
      </div>
      {notes.courses[0].posts.length > 0 && <p className="text-center ">You can delete only your own posts</p>}
      {notes.courses[0].posts.map((note: Note) => (
        <Post
          key={note.note_id}
          date={note.date}
          title={note.title}
          note_id={note.note_id}
          class_name={note.class_name}
          description={note.description}
          full_name={note.full_name}
          isDelete={note.author_id === user.id}
          author_id={note.author_id}
        />
      ))}
    </>
  );
}
