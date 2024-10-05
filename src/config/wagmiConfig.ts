import { createConfig, http } from "@wagmi/core";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
// import { scrollSepolia } from "@wagmi/core/chains";
import {
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { arbitrumSepolia } from "viem/chains";



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
  chains: [arbitrumSepolia],
  connectors,
  transports: {
    [arbitrumSepolia.id]: http(
      "https://arb-sepolia.g.alchemy.com/v2/PP5-km-xd8s0Ui0FrVxyBSEfD_UhS0e9"
    ),
  },
});
