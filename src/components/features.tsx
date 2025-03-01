import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'
import { Button } from './ui/button';

export default function Features() {

  type Issue = {
    id: string;
    icon: React.ReactNode;
    title: string;
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

  return (
    <section>
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center">What issue do you have?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {issues.map((issue) => (
            <Card 
              key={issue.id} 
              className={`cursor-pointer transition-all 'ring-2 ring-purple-600' 'hover:bg-gray-50'}`}
              
            >
              <CardContent className="flex flex-col items-center justify-center p-3 sm:p-4 h-full">
                <div className="text-purple-600 mb-2">{issue.icon}</div>
                <h3 className="font-semibold text-center mb-1 text-sm sm:text-base">{issue.title}</h3>
                <p className="text-xs text-gray-500 text-center">{issue.description}</p><br/>
                <Button className='bg-purple-500 text-white hover:bg-purple-500/80'>
                  <Link href='/profile'>Connect</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
  )
}