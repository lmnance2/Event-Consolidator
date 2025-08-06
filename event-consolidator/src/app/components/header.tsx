'use client'
import Link from "next/link"
import Image from "next/image"

// Header component
export default function Header() {
  return (
    <header className="w-full px-6 py-4 bg-white shadow-md flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo-svg.svg" alt="Logo" width={40} height={40} />
        <span className="text-xl font-semibold text-green-700">Event Explorer</span>
      </Link>

      <nav className="hidden sm:flex gap-6 text-gray-700 font-medium">
        <Link href="/events" className="hover:text-green-600 transition">Events</Link>
        <Link href="/about" className="hover:text-green-600 transition">About</Link>
        <Link href="/pro" className="hover:text-green-600 transition">Pro</Link>
        <Link href="/login" className="hover:text-green-600 transition">Login</Link>
      </nav>
    </header>
  );
}
