import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Feedback() {
  const testimonials = [
    { name: "Alice Johnson", role: "Crypto Investor", content: "CryptoSolutions has revolutionized the way I manage my digital assets. Their security features are unparalleled.", avatar: "/placeholder.svg?height=100&width=100" },
    { name: "Bob Smith", role: "Blockchain Developer", content: "As a developer, I appreciate the robust API and developer tools provided by CryptoSolutions. It's a game-changer.", avatar: "/placeholder.svg?height=100&width=100" },
    { name: "Carol Williams", role: "Financial Advisor", content: "I recommend CryptoSolutions to all my clients. It's user-friendly and offers comprehensive market insights.", avatar:  "/placeholder.svg?height=100&width=100" },
  ]

  return (
    <section id="feedback" className="w-full py-12 md:py-24 lg:py-32 bg-purple-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="italic">&quot;{testimonial.content}&quot;</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}