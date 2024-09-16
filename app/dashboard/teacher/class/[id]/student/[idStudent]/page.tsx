import ProgressBar from "@/components/ProgressBar";
import { getFullStudentDetails } from "app/api/supabase/actions";
import Link from "next/link";
import Charts from "@/components/Charts";

interface IStudentPageTeacher {
  params: {
    idStudent: string;
    id: string;
  };
}

export default async function StudentPageTeacher({ params }: IStudentPageTeacher) {
  const { idStudent, id } = params;

  const newStudent = await getFullStudentDetails(idStudent);

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const today = new Date();

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col gap-6">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{newStudent.students}</h2>
        <p className="text-gray-600 text-sm font-semibold">{formatDate(today)}</p>
      </div>
      <div className="flex flex-col items-center justify-start mt-16 space-y-6">
        <div className="w-full max-w-lg space-y-4">
          <div className="flex items-center space-x-4">
            <span className="w-32 text-right">Presence</span>
            <ProgressBar value={newStudent.attendance["totale presenze"]} total={newStudent.attendance["giorni totali del corso"]} color="bg-green-500" />
          </div>
          <div className="flex items-center space-x-4">
            <span className="w-32 text-right">Absence</span>
            <ProgressBar value={newStudent.attendance["totale assenze"]} total={newStudent.attendance["giorni totali del corso"]} color="bg-red-500" />
          </div>
          <div className="flex items-center space-x-4">
            <span className="w-32 text-right">Total Days</span>
            <ProgressBar
              value={newStudent.attendance["giorni totali del corso"]}
              total={newStudent.attendance["giorni totali del corso"]}
              color="bg-blue-500"
            />
          </div>
        </div>
      </div>
      <Charts subjectsArray={newStudent.subjects} />
      <Link className="text-blue-500 hover:underline" href={`/dashboard/teacher/class/${id}`}>
        Go Back
      </Link>
    </div>
  );
}
