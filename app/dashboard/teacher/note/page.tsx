import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { getTeacherNotes } from "app/api/supabase/actions";
import { IRole } from "app/page";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "utils/supabase/server";
import Post from "./components/Post";
import FormPost from "./components/FormPost";

interface Note {
  date: string;
  title: string;
  note_id: string;
  class_name: string;
  description: string;
  teacher_name: string;
}
export default async function Notes() {
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
  console.log(notes);

  return (
    <>
      {notes.posts.map((note: Note) => (
        <Post
          key={note.note_id}
          date={note.date}
          title={note.title}
          note_id={note.note_id}
          class_name={note.class_name}
          description={note.description}
          teacher_name={note.teacher_name}
        />
      ))}
      <FormPost id={user.id} classes={notes.courses} />
    </>
  );
}
