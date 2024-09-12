import TeacherDashboard from "./components/teacher-dashboard";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "utils/supabase/server";
import { IRole } from "app/page";
import { getTeacherDataByID } from "app/api/supabase/actions";
import LayoutAfterLogin from "../layoutAfterLogin";

interface Class {
  id: number;
  name: string;
  students: number;
}

export default async function TeacherPage() {
  const data = await getTeacherDataByID();

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

  return (
    <LayoutAfterLogin>
      <TeacherDashboard classes={data.courses} />
    </LayoutAfterLogin>
  );
}
