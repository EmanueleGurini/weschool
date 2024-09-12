import Card from "@/components/Card";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "utils/supabase/server";
import { IRole } from "app/page";
import PureComponent from "./component/Chart";
import Table from "@/components/ui/Table";
import Link from "next/link";

interface StudentData {
  studentName: string;
  classmates: number;
  hours: {
    absences: number;
    presences: number;
    courseLength: number;
  };
}

// PASSO DATI STATICI A TABLE
// intestazioni tabella
const headers = ["Data", "Voto", "Note"];

// dati tabella
const tableData = [
  { date: "2024-09-08", voto: "8", note: "Buona performance" },
  { date: "2024-09-09", voto: "7", note: "Discreto" },
  { date: "2024-09-10", voto: "9", note: "Ottima performance" },
  { date: "2024-09-11", voto: "8", note: "Buona performance" },
  { date: "2024-09-12", voto: "7", note: "Discreto" },
];

// rendering righe
const renderRow = (item: any) => (
  <>
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      {item.date}
    </td>
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      {item.voto}
    </td>
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      {item.note}
    </td>
  </>
);

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
          {/* <Card
            title="Compagni"
            description={`La tua classe ha ${data?.classmates} compagni`}
          />
          <ProgressBar
            title="Assenze"
            description={`Presenze: ${data?.hours.presences} / ${data?.hours.courseLength} ore`}
          /> */}
        </div>
        <div className="flex flex-row w-full space-x-4">
          <Link href="/chart-page" className="w-1/2 h-96 ">
            <div className="w-full h-full cursor-pointer">
              <PureComponent />
            </div>
          </Link>
          <Link href="/table-page" className="w-1/2 h-96">
            <div className="w-full h-full cursor-pointer">
              <Table headers={headers} data={tableData} renderRow={renderRow} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudentPage;
