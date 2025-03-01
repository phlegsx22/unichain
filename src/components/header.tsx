// components/header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8 border-b-2 fixed top-0 left-0 bg-white z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-700">
          Activator Panel
        </Link>
        <div className="flex space-x-2 mx-6">
          <Link href="/" className="text-blue-600 text-lg font-semibold">
            Home
          </Link>
          <Link href="/profile" className="text-blue-600 text-lg font-semibold">
            Connect
          </Link>
          <Link href="/profile" className="text-blue-600 text-lg font-semibold">
            Contact
          </Link>
          <Link href="/profile" className="text-blue-600 text-lg font-semibold">
            FAQ
          </Link>
        </div>
      </div>
    </header>
  );
}