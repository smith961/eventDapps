import { createConfig, http } from "@wagmi/core";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { scrollSepolia } from "@wagmi/core/chains";
import {
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";



const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [rainbowWallet, metaMaskWallet],
    },
    {
      groupName: 'Others',
      wallets: [coinbaseWallet, walletConnectWallet],
    },
  ],
  { appName: 'Eventos', projectId: 'bfa51be0699917189ba7a9429453088e' },
);

export const wagmiConfig = createConfig({
  chains: [scrollSepolia],
  connectors,
  transports: {
    [scrollSepolia.id]: http(
      "https://scroll-sepolia.g.alchemy.com/v2/OWk1batiAD_4Hsrf9bFSiFXhzTovXIbd"
    ),
  },
});
