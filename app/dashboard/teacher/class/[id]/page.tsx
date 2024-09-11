"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from "next/navigation";
import Navbar from '@/components/Navbar';
import StudentModal from './StudentModal';
import StudentTable from './StudentTable';

interface Student {
    id: number;
    name: string;
    status: string; 
}

const ClassDetailPage: React.FC = () => {
    const [classDetails, setClassDetails] = useState<{ name: string; students: number }>({ name: "", students: 0 });
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const { id } = useParams<{ id: string }>(); 
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            try {
                const classResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
                    .then(response => response.json())
                    .then(data => ({
                        name: `Classe ${data.id}`,
                        students: Math.floor(Math.random() * 30) + 10
                    }));

                const studentResponse = await fetch('https://jsonplaceholder.typicode.com/users')
                    .then(response => response.json())
                    .then(data => data.map((user: any, index: number) => ({
                        id: user.id,
                        name: user.name,
                        status: index % 2 === 0 ? 'Presente' : 'Assente'
                    })));

                setClassDetails(classResponse);
                setStudents(studentResponse);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
            setLoading(false);
        }

        fetchData();
    }, [id]);

    const handleOpenModal = (student: Student) => {
        setSelectedStudent(student);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const updateStudentStatus = (studentId: number, status: string) => {
        setStudents(students.map(student =>
            student.id === studentId ? { ...student, status } : student
        ));
    };

    if (loading) {
        return <div>Caricamento...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Dettagli della Classe {classDetails.name}</h1>
                <p>Numero di studenti: {classDetails.students}</p>
                <StudentTable students={students} handleOpenModal={handleOpenModal} />
                {selectedStudent && (
                    <StudentModal
                        isOpen={modalOpen}
                        onClose={handleCloseModal}
                        student={selectedStudent}
                        updateStudentStatus={updateStudentStatus}
                    />
                )}
                <button
                    onClick={() => router.back()}
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Torna alla Dashboard
                </button>
            </div>
        </div>
    );
};

export default ClassDetailPage;


