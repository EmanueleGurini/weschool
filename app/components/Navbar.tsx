import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <div className="w-full text-gray-700 bg-white shadow-md ">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between p-4">
        <div className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg ">
          <Link href="/">WeSchool</Link>
        </div>
        <nav className="flex space-x-4">
          <Link href="">
            <img
              src="/img/promotion.png"
              alt="Comunicazioni"
              className="w-6 h-6 hover:opacity-75"
            />
          </Link>
          <Link href="/account">
            <img
              src="/img/settings.png"
              alt="Impostazioni"
              className="w-6 h-6 hover:opacity-75"
            />
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
