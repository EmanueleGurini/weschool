import ProgressBar from "@/components/ProgressBar";
import { getFullStudentDetails } from "app/api/supabase/actions";
import Link from "next/link";
import Charts from "@/components/Charts";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { IRole } from "app/page";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "utils/supabase/server";
import FormattedDate from "@/components/FormattedDate";

interface IStudentPageTeacher {
  params: {
    idStudent: string;
    id: string;
  };
}

export default async function StudentPageTeacher({
  params,
}: IStudentPageTeacher) {
  const { idStudent, id } = params;

  const newStudent = await getFullStudentDetails(idStudent);

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  if (user) {
    const data: PostgrestSingleResponse<IRole> = await supabase
      .from("profile_roles")
      .select("roles(role)")
      .eq("id", user!.id)
      .single();

    const userRole = data.data?.roles.role;

    if (userRole === "student") {
      revalidatePath("/", "layout");
      redirect("/dashboard/student");
    }
  }

  const today = new Date();

  return (
    <div className=" w-full">
      <div className="bg-white px-32 py-14 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-color100 mb-4">
          {newStudent.students}
        </h2>
        <p>
          <FormattedDate date={today} format="day-month-year" />
        </p>
      </div>
      <div className="flex flex-col items-center pb-8 justify-start mt-14 space-y-6">
        <div className="w-full max-w-lg space-y-4 bg-white p-4 rounded-lg">
          <div className="flex items-center space-x-4">
            <span className="w-32 text-right">Presence</span>
            <ProgressBar
              value={newStudent.attendance["totale presenze"]}
              total={newStudent.attendance["giorni totali del corso"]}
              color="bg-color60"
            />
          </div>
          <div className="flex items-center space-x-4">
            <span className="w-32 text-right">Absence</span>
            <ProgressBar
              value={newStudent.attendance["totale assenze"]}
              total={newStudent.attendance["giorni totali del corso"]}
              color="bg-contrast"
            />
          </div>
          <div className="flex items-center space-x-4">
            <span className="w-32 text-right">Total Days</span>
            <ProgressBar
              value={newStudent.attendance["giorni totali del corso"]}
              total={newStudent.attendance["giorni totali del corso"]}
              color="bg-color20"
            />
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-6 flex flex-col gap-6">
      <Charts subjectsArray={newStudent.subjects} />
      
      <div className="mb-4">
        <Link
          className="inline-block rounded-lg bg-color100 py-3 px-6 text-xs font-bold uppercase text-white shadow-md transition-all hover:bg-[#2B4570] focus:opacity-85 active:opacity-85 disabled:pointer-events-none disabled:opacity-50"
          href={`/dashboard/teacher/class/${id}`}
        >
          Go Back
        </Link>
      </div>
      </div>
    </div>
  );
}
