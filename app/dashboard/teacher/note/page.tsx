import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { getTeacherNotes } from "app/api/supabase/actions";
import { IRole } from "app/page";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "utils/supabase/server";
import Post from "./components/Post";
import ButtonForm from "./components/ButtonForm";

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

  const notes = await getTeacherNotes(user.id);

  const selectedDate = searchParams.date || "";

  const filteredNotes = selectedDate ? notes.posts.filter((note: Note) => note.date === selectedDate) : notes.posts;

  return (
    <>
      <div className="w-full flex justify-center items-center p-6">
        <ButtonForm id={user.id} classes={notes.courses} />
      </div>

      <div className="w-full flex justify-center items-center p-6">
        <form method="GET" className="flex items-center">
          <input type="date" name="date" defaultValue={selectedDate} className="border border-gray-300 rounded-md p-2" />
          <button type="submit" className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md">
            Filter Posts
          </button>
        </form>
      </div>

      {filteredNotes.map((note: Note) => (
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
