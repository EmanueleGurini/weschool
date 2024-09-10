import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

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

  // const { data: profileWithRole, error } = await createClient()
  //   .from("profiles")
  //   .select("role") // Accedi al nome del ruolo direttamente dalla tabella roles
  //   .eq("id", user.id)
  //   .limit(1)
  //   .maybeSingle();

  // if (error) {
  //   console.error("Error fetching profile with role:", error);
  //   return;
  // }

  // if (profileWithRole) {
  //   const roleName = profileWithRole;
  //   console.log("Role:", roleName); // Restituisce 'teacher' o 'student'
  // }

  // const { data: role, errorRole } = await createClient()
  //   .from("roles")
  //   .select("role") // Accedi al nome del ruolo direttamente dalla tabella roles
  //   .eq("role", profileWithRole?.role)
  //   .limit(1)
  //   .maybeSingle();

  // if (errorRole) {
  //   console.error("Error fetching profile with role:", errorRole);
  //   return;
  // }

  // if (role) {
  //   const roleName = role;
  //   console.log("Role:", roleName); // Restituisce 'teacher' o 'student'
  // }

  // // console.log(user.role);
  // // const pippo = await createClient()
  // //   .from("profiles")
  // //   .select("r.role") // Aggiungi la relazione con la tabella roles
  // //   .eq("id", user.id)
  // //   .limit(1)
  // //   .maybeSingle();

  // // console.log("pippo", pippo);

  // //   SELECT
  // //   r.role
  // // FROM
  // //   profiles p
  // //   JOIN roles r ON p.role = r.id
  // // WHERE
  // //   p.id = 'e716b89e-0827-4c9f-81ee-b9cf9479145e';

  return <main>Hello, weschool!</main>;
}
