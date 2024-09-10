import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
    return (
        <div className="w-full text-gray-700 bg-white shadow-md dark:text-gray-200 dark:bg-gray-800">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between p-4">
                <div className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark:text-white">
                    <Link href="/">WeSchool</Link>
                </div>
                <nav className="flex space-x-4">
                    <Link href="" className="text-gray-800 dark:text-white hover:text-blue-600">
                        Classi
                    </Link>
                    <Link href="" className="text-gray-800 dark:text-white hover:text-green-600">
                        Studenti
                    </Link>
                    <Link href="" className="text-gray-800 dark:text-white hover:text-green-600">
                        Comunicazioni
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
