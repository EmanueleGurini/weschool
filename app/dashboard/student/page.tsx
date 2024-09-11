import Card from "@/components/Card";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "utils/supabase/server";
import { IRole } from "app/page";

const formattedDate = new Intl.DateTimeFormat("it-IT", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
}).format(new Date());

async function studentPage() {
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

    if (userRole === 'teacher') {
      revalidatePath("/", "layout");
      redirect("/dashboard/teacher");
    }
  }

  return (
    <div>
      <Navbar />

      <div>
        <Header greeting="Ciao studente" text="Sarai sicuramente bocciato!!" />
      </div>

      <div className="flex flex-col items-center space-y-4 p-4">
        <h1 className="text-3xl font-bold mb-6">Student Page</h1>
        <div className="flex items-center p-4 gap-5">
          <Card title="Compagni" description="La tua classe ha 23 compagni" href="stringa vuota" />

          <Card title="Assenze" description="30%" href="stringa vuota" />
        </div>
      </div>
    </div>
  );
}

export default studentPage;
