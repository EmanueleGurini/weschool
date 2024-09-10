import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { createClient } from "utils/supabase/server";

interface IRole {
  roles: {
    role: string;
  }
}

export default async function Home() {
  const supabase = createClient();

  const {data: { user }} = await supabase.auth.getUser();

  if (!user) {
    revalidatePath("/", "layout");
    redirect("/login");
  }

  const data: PostgrestSingleResponse<IRole> = await supabase
    .from("profile_roles")
    .select("roles(role)")
    .eq("id", user!.id)
    .single();
    console.log(data)
    const userRole = data.data?.roles.role;
    console.log(userRole)

    if (userRole === 'teacher') {
      revalidatePath("/", "layout");
      redirect("/dashboard/teacher");
    }

    if (userRole === 'student') {
      revalidatePath("/", "layout");
      redirect("/dashboard/student");
    }
}
