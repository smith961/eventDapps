import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-verify";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const { SCROLL_URL, PRIVATE_KEY, SCROLL_SCAN_API } = process.env;

const config: HardhatUserConfig = {
  // solidity: "0.8.20",

  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },

  networks: {
    scroll: {
      url: SCROLL_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: {
      scrollSepolia: SCROLL_SCAN_API,
    },
    customChains: [
      {
        network: "scrollSepolia",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia.scrollscan.com/",
        },
      },
    ],
  },
};

export default config;
