import { createClient } from "utils/supabase/server";
import { redirect } from "next/navigation";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { IRole } from "app/page";
import { revalidatePath } from "next/cache";
import { getStudentsListDetailsByTeacher } from "app/api/supabase/actions";
import Link from "next/link";
import TableTeacherClass from "./components/TableTeacherClass";
import FormattedDate from "@/components/FormattedDate";

interface SinglePageClassProps {
  params: { id: string };
  searchParams: { date?: string };
}

interface IStudent {
  id: string;
  fullName: string;
}

export default async function SinglePageClass({ params, searchParams }: SinglePageClassProps) {
  const { id } = params;

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const data: PostgrestSingleResponse<IRole> = await supabase.from("profile_roles").select("roles(role)").eq("id", user!.id).single();
  const userRole = data.data?.roles.role;

  if (userRole === "student") {
    revalidatePath("/", "layout");
    return redirect("/dashboard/student");
  }

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const today = new Date();
  const selectedDate = searchParams.date || formatDate(today);
  const classData = await getStudentsListDetailsByTeacher(id, selectedDate);

  const uniqueStudentNames = Array.from(new Set(classData.students.map((student: IStudent) => student.fullName)));

  return (
    <div className="container mx-auto p-6">
      <div className="w-full flex items-center justify-between font-extrabold">
        <h2 className="text-2xl font-bold mb-4">Class Name: {classData.courseName}</h2>
        <p>
        <FormattedDate date={new Date(selectedDate)} format="day-month-year"/>
        </p>
      </div>

      <p className="text-gray-800 mb-6">Students Number: {uniqueStudentNames.length}</p>

      <form method="GET" className="mb-4 w-full flex items-center justify-end">
        <label htmlFor="date" className="mr-2">Select Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          defaultValue={selectedDate}
          className="border p-2 rounded-lg"
        />
        <button type="submit" className="ml-2 inline-block rounded-lg bg-color100 hover:bg-color80 py-2 px-4 text-white">
          Load Data
        </button>
      </form>

      <TableTeacherClass dateSelected={selectedDate} id={id} subjects={classData.subjects} students={classData.students} date={selectedDate} />

      <Link
        href="/dashboard/teacher"
        className="inline-block rounded-lg bg-color100 py-3 px-6 text-xs font-bold uppercase text-white shadow-md transition-all hover:bg-color80 focus:opacity-85 active:opacity-85 disabled:pointer-events-none disabled:opacity-50"
      >
        Go Back
      </Link>
    </div>
  );
}
