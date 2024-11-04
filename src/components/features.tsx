import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Wallet, Shield, Zap, Globe, Users } from 'lucide-react'

export default function Features() {
  const features = [
    { icon: <Wallet className="h-8 w-8 text-purple-600" />, title: "Secure Wallet", description: "Multi-layer encrypted wallet for your crypto assets." },
    { icon: <Shield className="h-8 w-8 text-purple-600" />, title: "Advanced Security", description: "State-of-the-art security measures to protect your assets." },
    { icon: <Zap className="h-8 w-8 text-purple-600" />, title: "Instant Transactions", description: "Lightning-fast crypto transactions across the globe." },
    { icon: <Globe className="h-8 w-8 text-purple-600" />, title: "Global Access", description: "Access your crypto from anywhere in the world." },
    { icon: <Users className="h-8 w-8 text-purple-600" />, title: "Community Support", description: "Join a thriving community of crypto enthusiasts." },
  ]

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-5xl font-bold text-center mb-12 text-violet-600 italic">Solution for every Problem</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {feature.icon}
                  <span className="text-2xl">{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}