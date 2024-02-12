'use client'

import { useState } from "react";
import Image from "next/image";
import MenuItems from "./menu-items";

const Header = () => {
  const [nav, setNav] = useState(false);

  return (
    <header className="bg-blue-500">
      <div className="w-full container mx-auto flex justify-between items-center py-6 px-4">
        <div className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={50} height={50}/>
          <h1 className="text-white text-2xl ml-4 font-bold" >Scholarship</h1>
        </div>
        <MenuItems/>

        {/* Overlay */}
        {nav ? (
          <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
        ) : (
          ""
        )}

        {/* Side Drawer Menu */}
    
      </div>
    </header>
  );
};

export default Header;
