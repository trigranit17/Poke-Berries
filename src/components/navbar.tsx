// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const active = (p: string) =>
    pathname === p ? "bg-gray-100 font-semibold" : "";

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="font-semibold text-lg">
            Poke Berries
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/" className={`px-3 py-1 rounded ${active("/")}`}>
              List
            </Link>
            <Link href="/add" className={`px-3 py-1 rounded ${active("/add")}`}>
              Add
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
