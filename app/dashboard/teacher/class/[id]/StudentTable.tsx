import React from 'react';

interface Student {
    id: number;
    name: string;
    status: string;
}

interface StudentTableProps {
    students: Student[];
    handleOpenModal: (student: Student) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({ students, handleOpenModal }) => {
    return (
        <table className="min-w-full leading-normal">
            <thead>
                <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Nome e Cognome
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Azioni
                    </th>
                </tr>
            </thead>
            <tbody>
                {students.map(student => (
                    <tr key={student.id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            {student.name}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            {student.status}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <button className="text-blue-500 hover:text-blue-800" onClick={() => alert('Aggiungi votazione per ' + student.name)}>Aggiungi Votazione</button>
                            <button className="ml-4 text-blue-500 hover:text-blue-800" onClick={() => handleOpenModal(student)}>Dettaglio Studente</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default StudentTable;
