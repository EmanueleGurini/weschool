import { createClient } from "utils/supabase/server";
import { redirect } from "next/navigation";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { IRole } from "app/page";
import { revalidatePath } from "next/cache";
import { getStudentsList } from "app/api/supabase/actions";
import Link from "next/link";
import TableTeacherClass from "./components/TableTeacherClass";

interface SinglePageClassProps {
  params: { id: string };
}

export default async function SinglePageClass({ params }: SinglePageClassProps) {
  const { id } = params;
  
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

  const classData = await getStudentsList(id);

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mese è zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const today = new Date();

  return (
    <div className="container mx-auto p-6">
      <div className="w-full flex items-center justify-between font-extrabold">
        <h2 className="text-2xl font-bold mb-4">Class Name: {classData.course}</h2>
        <p>{formatDate(today)}</p>
      </div>
      <p className="font-semibold">Students Number: {classData.students.length}</p>
      <div className="mb-4">
        <TableTeacherClass id={id} students={classData.students} />
      </div>
      <Link href="/dashboard/teacher" className="text-blue-500 hover:underline">Go Back</Link>
    </div>
  )
}
