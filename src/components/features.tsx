import Link from 'next/link';
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from './ui/button';

export default function Features() {

  type Issue = {
    id: string;
    icon: string;
    title: string;
    description: string;
  }

  const issues: Issue[] = [
    { id: 'i1', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/Claim_qcc8px.png', title: 'Cannot access account', description: 'Unable to log in or access your account' },
    { id: 'i2', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/Staking_gvozxs.png', title: 'Transaction failed', description: 'Issues with sending or receiving crypto' },
    { id: 'i3', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/fix_rargpi.png', title: 'Wallet sync problems', description: 'Wallet not syncing or showing incorrect balance' },
    { id: 'i4', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/Recovery_uxspvw.png', title: 'Security concerns', description: 'Suspicious activity or security questions' },
    { id: 'i5', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/Rectification_kgkoll.png', title: 'Platform integration', description: 'Issues connecting to specific platforms or exchanges' },
    { id: 'i6', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/Staking_gvozxs.png', title: 'Migration', description: 'For any issues with Migrate seamlessly with no hassle.' },
    { id: 'i7', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/buy_u8up0d.jpg', title: 'General Issues', description: 'For instant solution on any type of issues, to correct your node strings.' },
    { id: 'i8', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/Claim_qcc8px.png', title: 'NFTs/Minting', description: 'For any issues with mint/nfts or need support on how to receive any nfts?' },
    { id: 'i9', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/fix_rargpi.png', title: 'Swap/Exchange', description: 'For Swap/Exhange or any other related issues' },
    { id: 'i10', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/Claim_qcc8px.png', title: 'Claim Reward', description: 'For reward claiming or any related issues.' },
    { id: 'i11', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/Recovery_uxspvw.png', title: 'Locked Account', description: 'If you are logged out due to activity on the account.'},
    { id: 'i12', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/Rectification_kgkoll.png', title: 'Reset Wallet Password', description: 'To reset any kind of Exchange wallets Password.'},
    { id: 'i13', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/fix_rargpi.png', title: 'Claim Token', description: 'For airdrop claiming or any related issues.'},
    { id: 'i14', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/fix_rargpi.png', title: 'Transaction Delay', description: 'For stucked/delayed transactions.'},
    { id: 'i15', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/Claim_qcc8px.png', title: 'Buy Coins/Tokens', description: 'To trade, your account must be markrd as a trusted payment source.'},
    { id: 'i16', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/Recovery_uxspvw.png', title: 'Missing Funds/Irregular Balance', description: 'Lost access to funds or funds is missing'},
    { id: 'i17', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/Rectification_kgkoll.png', title: 'Bridge Tranfer', description: 'Do you have any issue while trying to transfer tokens between chains?'},
    { id: 'i18', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/fix_rargpi.png', title: 'Pool & Farm Access', description: 'Fix issues with any pool and Farm or related issue.'},
    { id: 'i19', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/fix_rargpi.png', title: 'Token Rectification', description: 'For issues with token rectification.'},
    { id: 'i20', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/Recovery_uxspvw.png', title: 'Validate', description: 'For issues with Validation.'},
    { id: 'i21', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/buy_u8up0d.jpg', title: 'Wallet Glitch/Error', description: 'Are you having glitch issues on your wallet?.'},
    { id: 'i22', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/Staking_gvozxs.png', title: 'High Fees', description: 'If you are facing an increase in transactions fees.'},
    { id: 'i23', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/Rectification_kgkoll.png', title: 'Wallet Compromised', description: 'Are you a victim of wallet hack? Freeze all your funds.'},
    { id: 'i24', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/Claim_qcc8px.png', title: 'KYC/Whitelist', description: 'For help whitelisting your wallet for nfts.'},
    { id: 'i25', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/fix_rargpi.png', title: 'Staking', description: 'For tokens/coins staking realted issues.'},
    { id: 'i26', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/Recovery_uxspvw.png', title: 'Login Issues', description: 'If you are encounter any issues logging into your wallet.'},
    { id: 'i27', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/Rectification_kgkoll.png', title: 'Website Not loading', description: 'If you are not Unable to load any Exchange website.'},
    { id: 'i28', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/Claim_qcc8px.png', title: 'Issues With Trading Wallet', description: 'For issues With Trading Wallet'},
    { id: 'i29', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/Rectification_kgkoll.png', title: 'Connect to Dapps', description: 'To Connect decentralised web applications to moblie wallets.'},
    { id: 'i30', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/Claim_qcc8px.png', title: 'Ledger $ Trezor', description: 'For ledger and trezor related issues.'},
    { id: 'i31', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/fix_rargpi.png', title: 'Issues with Trading Wallet', description: 'For issues with trading wallet'},
    { id: 'i32', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/Recovery_uxspvw.png', title: 'Rectification', description: 'Rectify any issue with your wallet, dex or cex.'},
    { id: 'i33', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/Rectification_kgkoll.png', title: 'High Transaction fees', description: 'If you are facing an increase in transaction fees.'},
    { id: 'i34', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/Claim_qcc8px.png', title: 'Validate', description: 'Facing any issues with validation'},
    { id: 'i35', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/Claim_qcc8px.png', title: 'Deposits $ Withdrawals', description: 'Facing any issues with deposits, withdrawals to cex, dex?'},
    { id: 'i36', icon: 'https://app.appactivation-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/Claim_qcc8px.png', title: 'Swap/Exchange', description: 'For Swap/Exchange related issues'},
  ]

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold mb-3 sm:mb-4 text-center">Our Services</h2>
      <p className="text-center text-sm sm:mb-4 max-w-prose mx-auto">
        Dapp Webnode is a decentralized protocol. DappConnect creates an innovative open-source software ecosystem that is both secure and resilient. 
        And it allows developers to create new online tools. Validation of wallet will be completed below as follows.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {issues.map((issue) => (
          <Card 
            key={issue.id} 
            className="cursor-pointer transition-all bg-gray-100 hover:bg-gray-50"
          >
            <CardContent className="flex flex-col items-center justify-center p-3 sm:p-4 h-full">
              <Image src={issue.icon} alt="issue icon" width={90} height={90} />
              <h3 className="font-bold text-center mb-1 text-3xl sm:text-base">{issue.title}</h3>
              <p className="text-base text-gray-500 text-center font-semibold">{issue.description}</p>
              <br />
              <Button className="bg-blue-700 text-white hover:bg-blue-700 mb-6">
                <Link href="/profile">Connect</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
