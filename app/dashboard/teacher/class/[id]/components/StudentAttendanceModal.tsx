import React from 'react';
import Card from '@/components/Card'

interface Student {
    id: number;
    name: string;
}

interface StudentAttendanceModalProps {
    isOpen: boolean;
    onClose: () => void;
    student: Student;
    updateStudentStatus: (id: number, status: string) => void;
}

const StudentAttendanceModal: React.FC<StudentAttendanceModalProps> = ({ isOpen, onClose, student, updateStudentStatus }) => {
    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <Card 
                title={`${student.name} è:`} 
                description={
                    <div>
                        <div className="flex justify-center">
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
                }
                href="#"
            />
        </div>
    );
};

export default StudentAttendanceModal;