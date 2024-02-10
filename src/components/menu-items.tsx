"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

const MenuItems = () => {
  const pathname = usePathname();

  const menus = [
    {
      path: "/sign-up-beasiswa",
      name: "Daftar",
      active: pathname === "/sign-up-beasiswa",
    },
    {
      path: "/beasiswa",
      name: "Hasil Beasiswa",
      active: pathname === "/beasiswa",
    },
  ];
  return (
    <div className="flex gap-x-4 ml-auto cursor-pointer items-center">
      {menus.map((menu) => (
        <Link key={menu.path} href={menu.path}>
          {menu.name}
        </Link>
      ))}
    </div>
  );
};

export default MenuItems;
