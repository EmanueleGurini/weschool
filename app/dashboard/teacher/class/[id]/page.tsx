"use client";


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";


export default function ClassDetailPage() {
    const [classDetails, setClassDetails] = useState({ name: "", students: 0 });
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const router = useRouter();


    const fetchMockClassDetails = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    name: `Classe ${id}`,
                    students: Math.floor(Math.random() * 30) + 10,
                });
            }, 2000);
        });
    };


    useEffect(() => {
        fetchMockClassDetails().then((data: any) => {
            setClassDetails(data);
            setLoading(false);
        });
    }, [id]);


    if (loading) {
        return <div>Caricamento...</div>;
    }


    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex justify-between">
                    <div className="flex space-x-4">
                        <a href="#" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">Classi</a>
                        <a href="#" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">Studenti</a>
                        <a href="#" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">Comunicazioni</a>
                    </div>
                    <div>
                        <a href="#" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">Impostazioni</a>
                    </div>
                </div>
            </nav>


            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Dettagli della Classe {classDetails.name}</h1>
                <p>Numero di studenti: {classDetails.students}</p>


                <button
                    onClick={() => router.back()}
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Torna alla Dashboard
                </button>
            </div>
        </div>
    );
}
