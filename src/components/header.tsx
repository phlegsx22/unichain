import Link from 'next/link'
import { Button } from '@/components/ui/button'
import '@/styles/globals.css'


export default function Header() {
  return (
    <header className="h-[7vh] w-full py-4 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-indigo-600">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          unichain
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="#mission" className="text-white hover:text-gray-200">
            Mission
          </Link>
          <Link href="#vision" className="text-white hover:text-gray-200">
            Vision
          </Link>
          <Link href="#features" className="text-white hover:text-gray-200">
            Features
          </Link>
          <Link href="#feedback" className="text-white hover:text-gray-200">
            Feedback
          </Link>
        </nav>
        <div className="flex space-x-2">
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600">
            Login
          </Button>
          <Button className="bg-white text-purple-600 hover:bg-gray-100">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  )
}