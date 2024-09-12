import Card from "@/components/Card";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "utils/supabase/server";
import { IRole } from "app/page";

interface StudentData {
  studentName: string;
  classmates: number;
  hours: {
    absences: number;
    presences: number;
    courseLength: number;
  };
}

const fetchData = async () => {
  try {
    const response = await fetch("apicall");
    const result = await response.json();
    return result;
  } catch (e) {
    console.log("errore:", e);
  }
};

async function StudentPage() {
  const data = await fetchData();

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

    if (userRole === "teacher") {
      revalidatePath("/", "layout");
      redirect("/dashboard/teacher");
    }
  }

  return (
    <div>
      <Navbar />
      <div>
        <Header
          greeting={`ciao ${data?.studentName}`}
          text="Sarai sicuramente bocciato!!"
        />
      </div>
      <div className="flex flex-col items-center space-y-4 p-4">
        <h1 className="text-3xl font-bold mb-6">Student Page</h1>
        <div className="flex items-center p-4 gap-5">
          <Card
            title="Compagni"
            description={`La tua classe ha ${data?.classmates} compagni`}
            href="stringa vuota"
          />
          <Card
            title="Assenze"
            description={`Percentuale assenze ${data?.hours}`}
            href="stringa vuota"
          />
        </div>
      </div>

      <div className="w-full max-w-sm">
        <h2 className="text-lg font-bold">Ore di Presenza</h2>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div className="bg-green-500 h-4 rounded-full" />
        </div>
        <p className="text-sm mt-2">
          Presenze: {data?.hours.presences} / {data?.hours.courseLength} ore
        </p>
      </div>
    </div>
  );
}

export default StudentPage;
