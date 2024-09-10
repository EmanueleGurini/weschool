"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar"; 
import Link from "next/link";

interface Class {
    id: number;
    name: string;
    students: number;
}

interface TeacherDashboardProps {
    classes: Class[];
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ classes }) => {
    const [totalStudents, setTotalStudents] = useState(0);
    const [classesWithStudents, setClassesWithStudents] = useState<Class[]>([]);
    const router = useRouter();

    const fetchStudentsForClasses = async () => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts"); // API fittizia
            const data = await response.json();

            const updatedClasses = classes.map((classItem, index) => ({
                ...classItem,
                students: data[index] ? data[index].id * 3 : 0,
            }));

            setClassesWithStudents(updatedClasses);

            const total = updatedClasses.reduce((acc, curr) => acc + curr.students, 0);
            setTotalStudents(total);
        } catch (error) {
            console.error("Errore nel recupero del numero di studenti:", error);
        }
    };

    useEffect(() => {
        fetchStudentsForClasses();
    }, []);

    const formattedDate = new Intl.DateTimeFormat("it-IT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(new Date());

    const handleClassDetail = (classId: number) => {
        router.push(`/teacher/${classId}`);
    };

    return (
        <div className="dashboard-container min-h-screen bg-gray-100">
            <Navbar /> 
            <header className="p-6 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img
                        src="/images/profile.png"
                        alt="Profile"
                        className="profile-image w-16 h-16 rounded-full"
                    />
                    <div>
                        <h1 className="text-xl font-bold">Ciao, Chris!</h1>
                        <p>Spero tu abbia avuto un'ottima giornata...</p>
                    </div>
                </div>
                <div className="header-info text-lg font-semibold">
                    <p>Data: {formattedDate}</p>
                </div>
            </header>

            <main className="p-6">
                <section className="total-students mb-6">
                    <h2 className="text-2xl font-bold mb-4">Studenti totali</h2>
                    <div className="student-count text-3xl font-semibold">{totalStudents}</div>
                </section>

                <section className="class-list">
                    <h2 className="text-2xl font-bold mb-4">Lista Classi</h2>
                    <table className="min-w-full border-collapse block md:table">
                        <thead className="block md:table-header-group">
                            <tr className="border border-grey-500 md:border-none block md:table-row">
                                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Nome Classe</th>
                                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Numero Studenti</th>
                                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Dettaglio Classe</th>
                            </tr>
                        </thead>
                        <tbody className="block md:table-row-group">
                            {classesWithStudents.map((classItem) => (
                                <tr key={classItem.id} className="bg-white border border-grey-500 md:border-none block md:table-row">
                                    <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold">Nome Classe</span>
                                        {classItem.name}
                                    </td>
                                    <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold">Numero Studenti</span>
                                        {classItem.students}
                                    </td>
                                    <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                        <Link

                                            href={`/dashboard/teacher/class/${classItem.id}`}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
                                        >
                                            Vai al dettaglio Lista Classe
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default function Page() {
    const teacherClasses: Class[] = [
        { id: 1, name: "Classe A", students: 0 },
        { id: 2, name: "Classe B", students: 0 },
        { id: 3, name: "Classe C", students: 0 },
    ];

    return <TeacherDashboard classes={teacherClasses} />;
}
