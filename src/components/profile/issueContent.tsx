'use client'

'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'

type WalletType = {
  id: string;
  icon: string;
  name: string;
}


const wallets: WalletType[] = [
  { id: 'w1', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg', name: 'MetaMask' },
  { id: 'w2', icon: 'https://play-lh.googleusercontent.com/mHjR3KaAMw3RGA15-t8gXNAy_Onr4ZYUQ07Z9fG2vd51IXO5rd7wtdqEWbNMPTgdqrk', name: 'Ledger' },
  { id: 'w3', icon: 'https://play-lh.googleusercontent.com/NwpBM4zjlxtmm6WWOw0k7M4F2Wpqx0LQpw9Zh-iAAoJPKgNK1vU2DotASwnRorSH5kY=w240-h480-rw', name: 'Trezor' },
  { id: 'w4', icon: 'https://logowik.com/content/uploads/images/trust-wallet-shield4830.logowik.com.webp', name: 'Trust Wallet' },
  { id: 'w5', icon: 'https://www.nuget.org/profiles/WalletConnect/avatar?imageSize=512', name: 'WalletConnect' },
  { id: 'w6', icon: 'https://cryptologos.cc/logos/stacks-stx-logo.png', name: 'Stacks' },
  { id: 'w7', icon: 'https://play-lh.googleusercontent.com/uT6ByyNvUeLRMDnMKEC91RrbHftl2EBB58r9vZaNbiYf1F5Twa33_Hx0zYvEfCtiG1kE', name: 'Safepal' },
  { id: 'w8', icon: 'https://moonpay-marketing-c337344.payloadcms.app/api/media/file/6q7ysxp7jwi-4ArVLd4qOC6hpY4D7us0r0', name: 'Exodus' },
  { id: 'w9', icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/23/5d/c8/235dc851-fb29-48f1-2931-2e6073926c5c/AppIcon-1x_U007emarketing-0-10-0-85-220.png/1200x600wa.png', name: 'Atomic' },
  { id: 'w10', icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/66/4a/b9/664ab980-b8c3-afc9-abc1-5032075ba74f/AppIcon-0-0-1x_U007epad-0-1-85-220.png/1200x630wa.png', name: 'Gem Wallet' },
  { id: 'w11', icon: 'https://cdn.prod.website-files.com/61d2c808f50b08ee42c1c477/63d7874416c8c09dc1d6f876_PhantomSG.png', name: 'Phantom' },
  { id: 'w12', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKbTDy_dXBdXPnBio-Db-Zy7uckGclEP_BQQ&s', name: 'Wasabi' },
  { id: 'w13', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5iKZyaXBLLZtV4H3_H-sefyvFdr5hGpZgSQ&s', name: 'Binance' },
  { id: 'w14', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXQ4V6xWzg9q8L7jbqOpnQxaAyW6E-opOoOg&s', name: 'Arbitrum' },
  { id: 'w15', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwIFBCAUmoMWPS_Bn7zUC3NOGuCIzaSdvjMQ&s', name: 'Aave' },
  { id: 'w16', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQijOUWd8bRawiQ4idpjdlmSLC3JqfdP5iiCg&s', name: 'Ton Hub' },
  { id: 'w17', icon: 'https://storage.googleapis.com/ton-strapi/Gradient_Type_Blue_Turquoise_1_5d461e32c4/Gradient_Type_Blue_Turquoise_1_5d461e32c4.png', name: 'Ton Keeper' },
  { id: 'w18', icon: 'https://play-lh.googleusercontent.com/W1vPuFWyzhrUUuF6P2T6HcNDmfeBf4tTZspEDM9gek0vU1W0MA0SoQLJGDUwdIVJyA', name: 'Onto' },
  { id: 'w19', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVDdnuPg48c1RcMIUxSMMrMRRrI4KSqHMhCw&s', name: 'Ownbit' },
  { id: 'w20', icon: 'https://pbs.twimg.com/media/GcC2hcpXgAAc2tW.png', name: 'Solflare' },
  { id: 'w21', icon: 'https://play-lh.googleusercontent.com/wjRjMDJ0GJDURRVhHeJ9GvBs171vfUuW1chLMPqeqHqB3o5LBQHWjYmt--eGwej4Ng', name: 'Glow' },
  { id: 'w22', icon: 'https://play-lh.googleusercontent.com/EhgMPJGUYrA7-8PNfOdZgVGzxrOw4toX8tQXv-YzIvN6sAMYFunQ55MVo2SS_hLiNm8', name: 'Backpack' },
  { id: 'w23', icon: 'https://play-lh.googleusercontent.com/-EcyFeHtPSGptfsZzgucRU2AOVgnGHyQ2DKx3R-dEbms4g4BzbvHpo8R-P-wrl18XCMk', name: 'Bitget' },
  { id: 'w24', icon: 'https://play-lh.googleusercontent.com/m9Ne2k_sHsLtlrdGATKHPNEDW2cDGlFf0FPhafMRxLaiwPnIEQa8J1-CEi3wztqQmmng', name: 'Zerion' },
  { id: 'w25', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZU2WKaWruPknBKqHS0sUHcA8gmV4-Vo7bAZj-3oNd-mAF7N2bXbez5hNIyenbnPW8xpo&usqp=CAU', name: 'OKX' },
  { id: 'w26', icon: 'https://play-lh.googleusercontent.com/Jr9mlVzTOG_1uJPUrxoOR7llaQIpBYNxT5hZw0BUqaqjN1Cqsky-RjaTyAorkFlMZQ', name: 'Petra' },
  { id: 'w27', icon: 'https://miro.medium.com/v2/resize:fit:700/0*cBQArUdm7Ck5qHTA.png', name: 'Martian' },
  { id: 'w28', icon: 'https://avatars.githubusercontent.com/u/110686627?v=4', name: 'Suiet' },
  { id: 'w29', icon: 'https://pbs.twimg.com/profile_images/1085243621933232131/VjI2slUx_400x400.jpg', name: 'Solar' },
  { id: 'w30', icon: 'https://play-lh.googleusercontent.com/SKXXUqR4jXkvPJvKSXhJkQjKUU9wA-hI9lgBTrpxEz5GP8NbaOeSaEp1zzQscv8BTA', name: 'Kepler' },
  { id: 'w31', icon: 'https://framerusercontent.com/images/AbGYvbwnLekBbsdf5g7PI5PpSg.png', name: 'Leap' },
  { id: 'w32', icon: 'https://play-lh.googleusercontent.com/P-xt-cfYUtwVQ3YsNb5yd5_6MzCHmcKAbRkt-up8Ga44x_OCGLy4WFxsGhxfJaSLEw', name: 'Argent' },
  { id: 'w33', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOtKTpWMRg4JRSczLSN5FFOoTftXc06jBt4g&s', name: 'Sushiswap' },
  { id: 'w34', icon: 'https://defiguide.org/wp-content/uploads/2022/05/Featured-image-7-850x550.png', name: 'lido' },
  { id: 'w35', icon: 'https://play-lh.googleusercontent.com/rJF2Bcp9EDfARTSY-7DmYnX0Q6cX3zBwXm2RSUjjDInUObbiM1iVKfjXKZRS2BP7gSE', name: 'Uniswap' },
  { id: 'w36', icon: 'https://lh3.googleusercontent.com/9sYF-0oYgi1bJSfODRWBSw8bTQQMroEqgpHXY8vGyWs1zw94H1JBMwjtuiHKD15stcIdN16mR4RVPq9gBkugUfXu=s128-rj-sc0x00ffffff', name: 'Parallel' },
  { id: 'w37', icon: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRUtu0e4DXEBhzsTZ1c3cg7ws8S_b2TxZDsbisDN4Lu9J5W4_1VuvKqGuT0F7jilKfUi-yrKAXEuDDzwWKRMNqsbdpV12g16phiiBccug', name: 'Polkadot' },
  { id: 'w38', icon: 'https://thegivingblock.com/wp-content/uploads/2021/08/ChainLink-LINK-Logo.png', name: 'Link' },
  { id: 'w39', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4xJyQK64TJEFv1wEbczOz2JPvVUvlIaYwng&s', name: 'Kryptic Wallet' },
  { id: 'w40', icon: 'https://play-lh.googleusercontent.com/Jr9mlVzTOG_1uJPUrxoOR7llaQIpBYNxT5hZw0BUqaqjN1Cqsky-RjaTyAorkFlMZQ', name: 'Znky' },
  { id: 'w41', icon: 'https://pbs.twimg.com/profile_images/1085243621933232131/VjI2slUx_400x400.jpg', name: 'Zlot' },
  { id: 'w42', icon: 'https://play-lh.googleusercontent.com/yIMq5XmB746hqH2xbyIuvgtLT5f9zKk54tRMzDJJM7m8Vw8H_X0jj45lZtrJrVOyB70Z', name: 'Zelcore' },
  { id: 'w43', icon: 'https://play-lh.googleusercontent.com/lxl3CQLYmbY7kHtMn3ehz06ebEIIxYOETf8hlWPNW6L3ZPxuhSrnIq-4k5T89gd4gA', name: 'Zerion' },
  { id: 'w44', icon: 'https://iq.wiki/_next/image?url=https%3A%2F%2Fipfs.everipedia.org%2Fipfs%2FQmXU4SwStE5s4M9ynRZt2rn5ERasrUrjbHYBAzXehC9bs4&w=3840&q=95', name: 'XDC' },
  { id: 'w45', icon: 'https://coincentral.com/wp-content/uploads/2021/03/what-is-yearn-finance.png', name: 'Yearn' },
  { id: 'w46', icon: 'https://coincentral.com/wp-content/uploads/2021/03/what-is-yearn-finance.png', name: 'Yr' },
  { id: 'w47', icon: 'https://www.nobsbitcoin.com/content/images/2025/02/wasabiwalletv251.jpg', name: 'Wasabi' },
  { id: 'w48', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOtKTpWMRg4JRSczLSN5FFOoTftXc06jBt4g&s', name: 'Xeipay' },
  { id: 'w49', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5iKZyaXBLLZtV4H3_H-sefyvFdr5hGpZgSQ&s', name: 'Wallet' },
  { id: 'w50', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD5Ahat1i1mkL7EQWbUXEicAZHjStLfaOw3A&s', name: 'Tongue' },
  { id: 'w51', icon: 'https://tor.us/images/Wallet---user.svg', name: 'Torus' },
  { id: 'w52', icon: 'https://defiguide.org/wp-content/uploads/2022/05/Featured-image-7-850x550.png', name: 'Truthvault' },
  { id: 'w53', icon: 'https://miro.medium.com/v2/resize:fit:700/0*cBQArUdm7Ck5qHTA.png', name: 'Ungii' },
  { id: 'w54', icon: 'https://avatars.githubusercontent.com/u/36172275?s=280&v=4', name: 'Unstoppable' },
  { id: 'w55', icon: 'https://img.utdstc.com/icon/141/e2f/141e2fa09926afa6f6b49e60f4dcd4f1ad71eca04deed99e0a50026d280e2b98:200', name: 'Version' },
  { id: 'w56', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-VbRs6juwQhrozmvQHIK-sEJB0ROKyUP1Hw&s', name: 'Via' },
  { id: 'w57', icon: 'https://play-lh.googleusercontent.com/FVDtw6vCV9RFTAO7jjFf0juosjuQql3dHJIJtE30okJEn4R1om2YzJHclmiwd10CuIFi', name: 'Eclipse' },
  { id: 'w58', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQadBPkDW0eZscxtWai-LsJWmnWwwsn7plzpw&s', name: 'Massa' },
  { id: 'w59', icon: 'https://play-lh.googleusercontent.com/0BY-XzNk_6R3DS_oNZfRI-x5L2PDgX8BDo7OL8kPDCKaQi0YzXGrYKWaT2lbOkqqGrs', name: 'Leap' },
  { id: 'w60', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh4K1QctcLFb5izZFPk7o8xqZACdbOcssxOxXTo0n7hEWJQLUyIa7ap-_xAnwBsRSp1TI&usqp=CAU', name: 'Injective' },
]

export default function IssuesContent() {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)

  return (
    <div>
      <section>
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center text-blue-700 mt-[150px]">Connection Page</h2>
        <p className='text-center text-sm text-gray-600'>Connect with one of our available providers or<br/> create a new one.</p>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 sm:gap-3 mt-[60px]">
          {wallets.map((wallet) => (
            <Card 
              key={wallet.id} 
              className={`cursor-pointer transition-all ${selectedWallet === wallet.id ? 'ring-2 ring-purple-600' : 'hover:bg-gray-50'}`}
              onClick={() => setSelectedWallet(wallet.id)}
            >
              <CardContent className="flex flex-col items-center justify-center p-2 text-center">
               <Link href="/connect">
               <div className="mb-6">
                  <Image src={wallet.icon} alt={wallet.name} width={24} height={34} className="w-9 h-9 sm:w-10 sm:h-10" />
                </div>
                <span className="text-sm font-semibold text-center text-blue-600">{wallet.name}</span>
               </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>     
    </div>
  )
}