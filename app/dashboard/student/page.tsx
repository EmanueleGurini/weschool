import Card from "@/components/Card";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "utils/supabase/server";
import { IRole } from "app/page";
import ProgressBar from "@/components/ProgressBar";

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
          />
          <ProgressBar
            title="Assenze"
            description={`Presenze: ${data?.hours.presences} / ${data?.hours.courseLength} ore`}
          />
        </div>
        {/* <div>
          <Table
           headers={headers} data={students} renderRow={renderRow}/>
        </div> */}
      </div>
    </div>
  );
}

export default StudentPage;
