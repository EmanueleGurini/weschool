import { getStudentDetailsByTeacher } from "app/api/supabase/actions";
import Link from "next/link";

interface IStudentPageTeacher {
	params: { 
		idStudent: string;
		id: string;
	};
}

export default async function StudentPageTeacher({ params }: IStudentPageTeacher) {

	const { idStudent, id } = params;

	const student = await getStudentDetailsByTeacher(idStudent);

	function percentAbsence(absence: number, totDays: number) {
    	const result = (absence / totDays) * 100;
		return result;
	}

	const absencePercentage = percentAbsence(Number(student.attendance.absent), Number(student.attendance.totalDays));

	const formatDate = (date: Date) => {
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	}

	const today = new Date();

	return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col gap-6">
		<div className="bg-white shadow-md rounded-lg p-6 mb-6 flex justify-between items-center">
			<h2 className="text-3xl font-bold text-gray-800 mb-2">{student.studentName}</h2>
			<p className="text-gray-600 text-sm font-semibold">{formatDate(today)}</p>
		</div>
		<div className="bg-white shadow-md rounded-lg p-6">
			<h2 className="text-xl font-semibold text-gray-800 mb-4">Percentuale di Assenze</h2>
			<div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden relative">
				<div
					className="bg-red-500 h-full text-xs flex items-center justify-center"
					style={{ width: `${absencePercentage}%` }}
				>
					<div className="absolute left-1/2 top-0">
						{`${absencePercentage.toFixed(2)}%`}
					</div>
				</div>
			</div>
		</div>
		<Link className="text-blue-500 hover:underline" href={`/dashboard/teacher/class/${id}`}>Go Back</Link>
    </div>
	)
}
