import Link from "next/link";
import ButtonUpload from "./ButtonUpload";
import ButtonUpdate from "./ButtonUpdate";

interface IAttendance {
	id: string | null;
	status: boolean | null;
	date: string;
}

interface IStudent {
	id: string;
	fullName: string;
	attendance: IAttendance;
}

interface IClassData {
  students: IStudent[];
  id: string;
}

export default function TableTeacherClass({ students, id }: IClassData) {
  return (
    <div className="overflow-x-auto mt-4">
		<div className="inline-block min-w-full shadow rounded-lg overflow-hidden bg-white">
			<table className="min-w-full leading-normal">
				<thead className="bg-primary text-white"> 
					<tr>
						<th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">Full Name</th>
						<th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
						<th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">Attendance Log</th>
						<th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">Profile</th>
					</tr>
				</thead>
			<tbody>
				{students.map((student: IStudent) => (
				<tr key={student.id} className="last:rounded-bl-lg last:rounded-br-lg">
					<td className="px-6 py-3 whitespace-nowrap border-b border-gray-300">{student.fullName}</td>
					<td className="px-6 py-3 whitespace-nowrap border-b border-gray-300">{student.attendance.status === null && 'To Declare'}{student.attendance.status === false && 'Absent'}{student.attendance.status && 'Present'}</td>
					<td className="px-6 py-3 whitespace-nowrap border-b border-gray-300">
						{student.attendance.status === null && <ButtonUpload />}
						{student.attendance.status !== null && <ButtonUpdate />}
					</td>
					<td className="px-6 py-3 whitespace-nowrap border-b border-gray-300">
						<Link href={`/dashboard/teacher/class/${id}/student/${student.id}`} className="inline-block rounded-lg border-2 border-contrast py-3 px-6 font-sans text-xs font-bold uppercase text-contrast bg-transparent shadow-md transition-all hover:border-contrasthover hover:text-contrasthover focus:opacity-85 active:opacity-85 disabled:pointer-events-none disabled:opacity-50">Go To Student Profile</Link>
					</td>
				</tr>
				))}
			</tbody>
		</table>
    </div>
	</div>
  );
}
