"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from "next/navigation";
import StudentTable from './StudentTable';
import StudentGradeModal from './StudentGradeModal';
import StudentAttendanceModal from './StudentAttendanceModal';

interface Student {
    id: number;
    name: string;
    lastname?: string;
    status: string; 
}

const ClassDetailPage: React.FC = () => {
    const [classDetails, setClassDetails] = useState<{ name: string; students: number }>({ name: "", students: 0 });
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
    const [gradeModalOpen, setGradeModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const { id } = useParams<{ id: string }>(); 
    const router = useRouter();

    const formattedDate = new Intl.DateTimeFormat("it-IT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(new Date());

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
                    .then(data => data.map((user: any, index: number) => {
                        const [name, lastname] = user.name.split(' ');
                        return {
                            id: user.id,
                            name: name,
                            lastname: lastname,
                            status: index % 2 === 0 ? 'Presente' : 'Assente',
                        };
                    }));

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

    const handleOpenAttendanceModal = (student: Student) => {
        setSelectedStudent(student);
        setAttendanceModalOpen(true);
    };

    const handleOpenGradeModal = (student: Student) => {
        setSelectedStudent(student);
        setGradeModalOpen(true);
    };

    const handleCloseAttendanceModal = () => {
        setAttendanceModalOpen(false);
    };

    const handleCloseGradeModal = () => {
        setGradeModalOpen(false);
    };

    const updateStudentStatus = (studentId: number, status: string) => {
        setStudents(students.map(student =>
            student.id === studentId ? { ...student, status } : student
        ));
    };

    const addComment = (studentId: number, comment: string) => {
        console.log(`Aggiunta valutazione: ${comment} a studente con id ${studentId}`);
    };

    if (loading) {
        return <div>Caricamento...</div>;
    }

    return (
            <div className="p-6">
                <div className="text-right text-gray-800 text-xl font-bold">
                    {formattedDate} 
                </div>
                <h1 className="text-2xl font-bold mb-4">Dettagli {classDetails.name}</h1>
                <p>Numero di studenti: {classDetails.students}</p>
                <StudentTable 
                    students={students} 
                    handleOpenModal={handleOpenModal} 
                    handleOpenAttendanceModal={handleOpenAttendanceModal} 
                    handleOpenGradeModal={handleOpenGradeModal}
                />
                {selectedStudent && (
                    <>
                        <StudentAttendanceModal
                            isOpen={attendanceModalOpen}
                            onClose={handleCloseAttendanceModal}
                            student={selectedStudent}
                            updateStudentStatus={updateStudentStatus}
                        />
                        <StudentGradeModal
                            isOpen={gradeModalOpen}
                            onClose={handleCloseGradeModal}
                            student={selectedStudent}
                            addComment={addComment}
                        />
                    </>
                )}
                <button
                    onClick={() => router.back()}
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Torna alla Dashboard
                </button>
            </div>
    );
};

export default ClassDetailPage;