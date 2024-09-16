'use client';
import Link from "next/link";
import Table from "../../../../../components/ui/Table";
import Button from "@/components/ui/Button";

interface IStudent {
	id: string;
	fullname: string;
}

interface IClassData {
	students: IStudent[];
	id: string;
}

export default function TableTeacherClass({ students, id }: IClassData) {
	const headers = ["Full Name", "Profile"];

    const renderRow = (student: IStudent) => (
        <>
    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">{student.fullname}</td>
    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
        <Link 
            href={`/dashboard/teacher/class/${id}/student/${student.id}`}
            passHref>
            <Button className="w-full">Go to Student Profile</Button>
        </Link>
            
    </td>
</>
    );

    return (
        <div className="overflow-x-auto mt-4">
            <Table headers={headers} data={students} renderRow={renderRow} />
        </div>
    );
}