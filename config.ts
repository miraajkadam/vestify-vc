import { http, createConfig, cookieStorage, createStorage } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { metaMask } from "wagmi/connectors";
import { walletConnect } from 'wagmi/connectors'


export const config = createConfig({
  chains: [mainnet, sepolia],
  ssr: true,
  connectors: [injected(), metaMask(),  walletConnect({
    projectId: "cff3ecbe18bc2b1755d7507dd22ba82b", 
    showQrModal: true
  }),
  ],

  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
