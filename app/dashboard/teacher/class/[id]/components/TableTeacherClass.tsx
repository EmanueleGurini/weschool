'use client';
import Link from "next/link";

interface IStudent {
	id: string;
	fullname: string;
}

interface IClassData {
	students: IStudent[];
	id: string;
}

export default function TableTeacherClass({ students, id }: IClassData) {
	return (
    <div className="overflow-x-auto mt-4">
		<table className="min-w-full table-auto bg-white border border-gray-300 rounded-lg shadow-md">
			<thead className="bg-blue-500 text-gray-700">
				<tr>
					<th className="px-6 py-3 text-left text-sm font-medium border-b border-gray-300 text-white">Full Name</th>
					<th className="px-6 py-3 text-left text-sm font-medium border-b border-gray-300 text-white">Profile</th>
				</tr>
			</thead>
			<tbody>
				{students.map((student: IStudent) => (
				<tr key={student.id} className="border-b border-gray-300">
					<td className="px-6 py-4 whitespace-nowrap border-l border-gray-300">{student.fullname}</td>
					<td className="px-6 py-4 whitespace-nowrap border-l border-gray-300">
						<Link href={`/dashboard/teacher/class/${id}/student/${student.id}`} className="text-blue-500 hover:underline">Go To Student Profile</Link>
					</td>
				</tr>
				))}
			</tbody>
		</table>
    </div>
	)
}
