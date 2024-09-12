import React, { useState } from 'react';
import Card from '@/components/Card';

interface StudentGradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    student: { id: number; name: string };
    addComment: (studentId: number, comment: string) => void;
}

const StudentGradeModal: React.FC<StudentGradeModalProps> = ({ isOpen, onClose, student, addComment }) => {
    const [comment, setComment] = useState<string>('');

    const handleSubmit = () => {
        addComment(student.id, comment); 
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <Card 
                title={`Aggiungi valutazione per ${student.name}`} 
                description={
                    <div>
                        <textarea
                            value={comment}  
                            onChange={(e) => setComment(e.target.value)}
                            className="border p-2 mb-4 w-full"
                            rows={4}
                            placeholder="Scrivi la valutazione o commento qui..."
                        />
                        <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Salva valutazione
                        </button>
                        <button onClick={onClose} className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                            Chiudi
                        </button>
                    </div>
                }
                href="#"
            />
        </div>
    );
};

export default StudentGradeModal;
