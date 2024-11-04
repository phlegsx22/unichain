import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-800 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Company</h3>
            <ul className="space-y-1">
              <li><Link href="#" className="hover:text-gray-300">About Us</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Careers</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Press</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Products</h3>
            <ul className="space-y-1">
              <li><Link href="#" className="hover:text-gray-300">Wallet</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Exchange</Link></li>
              <li><Link href="#" className="hover:text-gray-300">API</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Resources</h3>
            <ul className="space-y-1">
              <li><Link href="#" className="hover:text-gray-300">Documentation</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Blog</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Support</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Legal</h3>
            <ul className="space-y-1">
              <li><Link href="#" className="hover:text-gray-300">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} CryptoSolutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}