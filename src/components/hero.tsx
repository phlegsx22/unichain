import '@/styles/globals.css'
import Image from 'next/image'


export default function Hero() {
  return (
    <section className="h-[45vh] w-full py-12 md:py-16 lg:py-20 xl:py-24 text-white">
      <div className="container mx-auto px-4 md:px-4">
        <div className="flex flex-row items-center space-y-4 text-center">
          <h1 className="text-6xl font-bold tracking-tighter text-black">
           Decentralized <span className='text-indigo-600'>Platform Wallet</span>
          </h1>
          <h1 className="text-3xl font-bold tracking-tighter text-white">
            Revolutionizing Blockchain Solutions
          </h1>
          <Image src={"https://www.appactivator-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/Heirarchy_ovchxd.jpg"} alt='logo image' width={600} height={500}/>
        </div>
      </div>
    </section>
  )
}