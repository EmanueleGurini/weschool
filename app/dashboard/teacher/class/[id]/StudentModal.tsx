import React from 'react';

interface Student {
    id: number;
    name: string;
}

interface StudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    student: Student;
    updateStudentStatus: (id: number, status: string) => void;
}

const StudentModal: React.FC<StudentModalProps> = ({ isOpen, onClose, student, updateStudentStatus }) => {
    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-xl">
                <h2>Aggiorna Stato per {student.name}</h2>
                <div>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2"
                        onClick={() => updateStudentStatus(student.id, 'Presente')}>
                        Presente
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2"
                        onClick={() => updateStudentStatus(student.id, 'Assente')}>
                        Assente
                    </button>
                </div>
                <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={onClose}>
                    Chiudi
                </button>
            </div>
        </div>
    );
};

export default StudentModal;
