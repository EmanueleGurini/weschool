"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar"; 
import Link from "next/link";
import Header from "@/components/Header";
import Table from "@/components/ui/Table";

interface Class {
    id: number;
    name: string;
    students: number;
}

interface TeacherDashboardProps {
    classes: Class[];
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ classes }) => {
    const [classesWithStudents, setClassesWithStudents] = useState<Class[]>([]);
    const router = useRouter();

    const fetchStudentsForClasses = async () => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts"); 
            const data = await response.json();

            const updatedClasses = classes.map((classItem, index) => ({
                ...classItem,
                students: data[index] ? data[index].id * 3 : 0,
            }));

            setClassesWithStudents(updatedClasses);
        } catch (error) {
            console.error("Errore nel recupero del numero di studenti:", error);
        }
    };

    useEffect(() => {
        fetchStudentsForClasses();
    }, []);

    const headers = ['Nome Classe', 'Numero Studenti', 'Dettaglio Classe'];

    const renderRow = (classItem: Class) => (
        <>
            <td className="p-2 md:border md:border-grey-500 text-left">
                {classItem.name}
            </td>
            <td className="p-2 md:border md:border-grey-500 text-left">
                {classItem.students}
            </td>
            <td className="p-2 md:border md:border-grey-500 text-left">
                <Link
                    href={`/dashboard/teacher/class/${classItem.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
                >
                    Vedi dettaglio classe
                </Link>
            </td>
        </>
    );

    return (
        <div className="dashboard-container min-h-screen bg-gray-100">
            <Navbar /> 
            <Header greeting={"Salve Prof!"} text={"Spero abbiate avuto una buona giornata..."} />

            <main className="p-6">
                <section className="class-list">
                    <h2 className="text-2xl font-bold mb-4">Le tue classi</h2>
                    <Table headers={headers} data={classesWithStudents} renderRow={renderRow} />
                </section>
            </main>
        </div>
    );
};

export default function Page() {
    const teacherClasses: Class[] = [
        { id: 1, name: "Classe CB 10", students: 0 },
        { id: 2, name: "Classe CB 9", students: 0 },
        { id: 3, name: "Classe CB 8", students: 0 },
    ];

    return <TeacherDashboard classes={teacherClasses} />;
}
