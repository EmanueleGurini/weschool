import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "utils/supabase/server";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("user:", user);

  if (!user) {
    revalidatePath("/", "layout");
    redirect("/login");
  }

}