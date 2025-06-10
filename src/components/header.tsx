"use client";
import { LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b z-50 fixed top-0 left-0 w-full h-[72px]">
      <div className="container mx-auto px-4 py-2 md:px-6 md:py-0 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-[#003b95]">
          <Image
            src="/images/logo.png"
            alt="roomsnearme"
            width={64}
            height={64}
            className="w-[72%] md:w-full"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 md:items-center">
          <Link
            href="/"
            className="text-gray-700 hover:text-[#003b95] transition"
          >
            Home
          </Link>
          <Link
            href="/blogs"
            className="text-gray-700 hover:text-[#003b95] transition"
          >
            Blogs
          </Link>
          <Link
            href="/rooms"
            className="text-gray-700 hover:text-[#003b95] transition"
          >
            Rooms
          </Link>
          <Link
            href="/about"
            className="text-gray-700 hover:text-[#003b95] transition"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-700 hover:text-[#003b95] transition"
          >
            Contact
          </Link>
          <button className="bg-[#003b95] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer">
            <Link className="flex gap-2 items-center" href={"/auth"}>
              Login <LogIn size={16} />
            </Link>
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-gray-600 hover:text-[#003b95] focus:outline-none"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`fixed top-0 left-0 w-full h-full bg-white shadow-lg transition-transform ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          } z-50`}
        >
          <nav className="flex flex-col items-center gap-6 pt-16">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-[#003b95] transition"
            >
              Home
            </Link>
            <Link
              href="/rooms"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-[#003b95] transition"
            >
              Rooms
            </Link>
            <Link
              href="/blogs"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-[#003b95] transition"
            >
              Blogs
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-[#003b95] transition"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-[#003b95] transition"
            >
              Contact
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="flex gap-2 items-center bg-[#003b95] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              <LogIn size={16} />
              Login
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
