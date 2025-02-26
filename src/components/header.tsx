'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function Header() {
  const pathname = usePathname()
  //disable the header if we are in profile page
  if(pathname.startsWith('/profile')){
    return null;
  }
  const isAuthPage = pathname === '/signup' || pathname === '/signin'

  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-indigo-600">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          Unichain
        </Link>
        {!isAuthPage && (
          <nav className="hidden md:flex space-x-4">
            <Link href="/#mission" className="text-white hover:text-gray-200">
              Mission
            </Link>
            <Link href="/#vision" className="text-white hover:text-gray-200">
              Vision
            </Link>
            <Link href="/#features" className="text-white hover:text-gray-200">
              Features
            </Link>
            <Link href="/#feedback" className="text-white hover:text-gray-200">
              Feedback
            </Link>
          </nav>
        )}
        <div className="flex space-x-2">
          <Button className="bg-white text-purple-600 hover:bg-gray-100" asChild>
            <Link href="/profile">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}