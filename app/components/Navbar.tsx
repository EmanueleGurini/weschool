import React from "react";
import Link from "next/link";
import Image from "next/image"

const Navbar: React.FC = () => {
  return (
    <div className="w-full text-white bg-gradient-to-r from-color100 to-color60 shadow-md ">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between p-4">
        <div className="text-lg font-semibold tracking-widest text-white-900 uppercase rounded-lg ">
          <Link href="/">
          <div className="h-full flex items-center">
              <Image
                src="/img/WeSchool/logo_chiaro.svg"
                alt="WeSchool Logo"
                width={250}
                height={100}
                className="cursor-pointer object-contain"
              />
            </div>
            </Link>
        </div>
        <nav className="flex space-x-4">
          <Link href="">
            <img
              src="/img/promotion.png"
              alt="Comunicazioni"
              className="w-6 h-6 hover:opacity-75"
              style={{ filter: 'invert(1)' }}
            />
          </Link>
          <Link href="/account">
            <img
              src="/img/settings.png"
              alt="Impostazioni"
              className="w-6 h-6 hover:opacity-75"
              style={{ filter: 'invert(1)' }}
            />
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
