import ProgressBar from "@/components/ProgressBar";
import { getStudentDetailsByTeacher } from "app/api/supabase/actions";
import Link from "next/link";

interface IStudentPageTeacher {
  params: {
    idStudent: string;
    id: string;
  };
}

export default async function StudentPageTeacher({
  params,
}: IStudentPageTeacher) {
  const { idStudent, id } = params;

  const student = await getStudentDetailsByTeacher(idStudent);

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
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {student.studentName}
        </h2>
        <p className="text-gray-600 text-sm font-semibold">
          {formatDate(today)}
        </p>
      </div>
      <div className="flex flex-col items-center justify-start mt-16 space-y-6">
        <div className="w-full max-w-lg space-y-4">
          <div className="flex items-center space-x-4">
            <span className="w-32 text-right">Present</span>
            <ProgressBar
              value={student.attendance.presences}
              total={student.attendance.totalDays}
              color="bg-green-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <span className="w-32 text-right">Absent</span>
            <ProgressBar
              value={student.attendance.absent}
              total={student.attendance.totalDays}
              color="bg-red-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <span className="w-32 text-right">Total Days</span>
            <ProgressBar
              value={student.attendance.totalDays}
              total={student.attendance.totalDays}
              color="bg-blue-500"
            />
          </div>
        </div>
      </div>
      <Link
        className="text-blue-500 hover:underline"
        href={`/dashboard/teacher/class/${id}`}
      >
        Go Back
      </Link>
    </div>
  );
}
