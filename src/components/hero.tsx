import { Button } from '@/components/ui/button'
import '@/styles/globals.css'
import Link from 'next/link'


export default function Hero() {
  return (
    <section className="h-[45vh] w-full py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Revolutionizing Blockchain Solutions
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-100 md:text-xl">
            Empowering the future of finance with innovative blockchain technology and secure crypto solutions.
          </p>
          <div className="space-x-4 mt-6">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200">
              <Link href="/profile">Explore Solutions</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
              <Link href="/profile">Get Started</Link>            
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}