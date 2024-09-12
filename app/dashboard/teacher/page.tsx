import TeacherDashboard from "./class/[id]/components/teacher-dashboard";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "utils/supabase/server";
import { IRole } from "app/page";
import Navbar from "@/components/Navbar";

interface Class {
  id: number;
  name: string;
  students: number;
}

const getData = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await createClient().auth.getUser();

  let { data, error } = await supabase.rpc("get_teacher_courses", {
    user_id: "deb46290-2a23-4591-874c-2494d81f588b",
  });
  if (error) console.error(error);
  else {
    console.log(data);
    return data;
  }
};

export default async function Page() {
  const data = await getData();

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

    if (userRole === 'student') {
      revalidatePath("/", "layout");
      redirect("/dashboard/student");
    }
  }

  return(
    <div>
      <Navbar />
      <TeacherDashboard classes={data.courses} />
    </div>
  )
}
