import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="flex flex-col items-center space-y-4 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Start Your Crypto Journey?</h2>
          <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Join thousands of satisfied users and experience the future of finance today.
          </p>
          <div className="space-x-4">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              Get Started Now
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600">
              Contact Sales
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}