import React, { useState } from 'react';
import Table from '@/components/ui/Table';

interface Student {
    id: number;
    name: string;
    lastname?: string;
    status: string;
}

interface StudentTableProps {
    students: Student[];
    handleOpenModal: (student: Student) => void;
    handleOpenAttendanceModal: (student: Student) => void;
    handleOpenGradeModal: (student: Student) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({ students, handleOpenModal, handleOpenAttendanceModal, handleOpenGradeModal }) => {
    const headers = ['Nome', 'Cognome', 'Status', 'Valutazioni', 'Registro Presenze', 'Dettaglio Studente'];

    const renderRow = (student: Student) => (
        <>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {student.name}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {student.lastname}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {student.status}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button className="text-blue-500 hover:text-blue-800" onClick={() => handleOpenGradeModal(student)}>Aggiungi</button>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button className="text-blue-500 hover:text-blue-800" onClick={() => handleOpenAttendanceModal(student)}>Registra</button>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button className="text-blue-500 hover:text-blue-800" onClick={() => handleOpenModal(student)}>Vai al profilo studente</button>
            </td>
        </>
    );

    return <Table headers={headers} data={students} renderRow={renderRow} />;
};

export default StudentTable;
