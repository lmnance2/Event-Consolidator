'use client'
import Link from 'next/link';


// Footer component
export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 mt-20 border-t border-gray-300 text-gray-600 text-sm">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h4 className="font-semibold mb-2 text-gray-800">Event Explorer</h4>
          <p>Find local events. Instantly.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-gray-800">Navigation</h4>
          <ul className="space-y-1">
            <li><Link href="/events" className="hover:text-green-700">Browse Events</Link></li>
            <li><Link href="/about" className="hover:text-green-700">About</Link></li>
            <li><Link href="/login" className="hover:text-green-700">Login</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-gray-800">Legal</h4>
          <ul className="space-y-1">
            <li><Link href="/terms" className="hover:text-green-700">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-green-700">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-gray-500 py-4 border-t border-gray-200">
        © {new Date().getFullYear()} Event Explorer. All rights reserved.
      </div>
    </footer>
  );
}