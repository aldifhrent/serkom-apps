"use client";
import Image from "next/image";
import MenuItems from "./menu-items";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="z-50 flex h-16 w-full items-center justify-between  gap-x-4 p-8">
        <Link href="/" className="flex items-center gap-x-2 cursor-pointer">
          <Image src="/logo.png" alt="Logo" width={48} height={48} />
          <h1 className="font-bold text-black">Scholarship</h1>
        </Link>
      <MenuItems />
    </div>
  );
};

export default Navbar;
