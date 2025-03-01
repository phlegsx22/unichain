import Hero from '@/components/hero'
import Mission from '@/components/mission'
import Vision from '@/components/vision'
import Features from '@/components/features'
// import Feedback from '@/components/feedback'
import CTA from '@/components/cta'
import '@/styles/globals.css'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Mission />
      <Vision />
      <Features /><br/>
      {/* <Feedback /> */}
      <CTA  />
    </main>
  )
}