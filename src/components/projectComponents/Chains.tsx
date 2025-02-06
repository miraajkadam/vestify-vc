import React, { useEffect, useState } from "react";
import { useAccount, useConnect, useEnsName, useDisconnect } from "wagmi";
import { metaMask, walletConnect } from "wagmi/connectors";
import EVMWalletModal from "../web3/EVMWalletModal";
import SolanaWalletModal from "../web3/SolanaWalletModal";
import { PhantomWalletAdapter } from "../web3/Phantom_adapter";
import Cookies from "js-cookie";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNightlyAdapter } from "../web3/NightlyAdapter";

interface projectWalletData {
  chain: string | undefined;
  walletAddress: `0x${string}` | undefined;
}

interface ChainsProps {
  onComplete?: (data: { projectWallet: projectWalletData }) => void;
  onSelectChain?: (chainType: string) => void;
}

const Chains: React.FC<ChainsProps> = ({ onComplete }) => {
  const [openEvmModal, setOpenEvmModal] = useState<boolean>(false);
  const [openSolanaModal, setOpenSolanaModal] = useState<boolean>(false);

  const { isConnected, address, chainId } = useAccount();
  const { connect } = useConnect();
  const { connectors, disconnect } = useDisconnect();

  const { data: ensName, error, status } = useEnsName({ address });
  console.log("isConnected:", isConnected);
  console.log("address:", address);
  console.log("chainId:", chainId);
  console.log("connectors:", connectors);
  console.log("ensName:", ensName);
  console.log("status:", status);
  console.log("error:", error);

  const [phantomWallet, setPhantomWallet] =
    useState<PhantomWalletAdapter | null>(null);
  const [solanaAddress, setSolanaAddress] = useState<string | null>(null);
  const [isPhantomConnected, setIsPhantomConnected] = useState(false);
  const [nightlyAddress, setNightlyAddress] = useState<string | undefined>();
  // const [projectWalletData, setProjectWalletData] = useState<projectWalletData>();

  const handleEvmModal = () => {
    setOpenEvmModal(true);
  };
  const handleSolanaModal = () => {
    setOpenSolanaModal(true);
  };

  const handleCloseModal = () => {
    setOpenEvmModal(false);
    setOpenSolanaModal(false);
  };

  const connectMetaMask = () => {
    if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
      console.log("connectinggggggggggggggggggggg");
      connect({ connector: metaMask() });
    } else {
      alert("MetaMask is not installed. Please install it.");
      window.open("https://metamask.io/download.html", "_blank");
    }
  };

  useEffect(() => {
    const projectWalletData: projectWalletData = {
      chain: chainId === 11155111 ? "EVM" : "SOLANA",
      walletAddress: address,
    };
    console.log("projectWalletData", projectWalletData);
    if (onComplete) {
      onComplete({
        projectWallet: projectWalletData,
      });
    }
  }, [chainId, address]);

  const connectWalletConnect = () => {
    connect({
      connector: walletConnect({
        projectId: "cff3ecbe18bc2b1755d7507dd22ba82b",
        showQrModal: true,
      }),
    });
  };

  const handleDisconnect = () => {
    connectors.forEach((connector) => {
      disconnect({ connector });
    });
  };

  const handlePhantomConnect = async () => {
    try {
      const adapter = new PhantomWalletAdapter();
      await adapter.connect();
      setPhantomWallet(adapter);
      setSolanaAddress(adapter.publicKey?.toBase58() || null);
      console.log(
        "Connected to Phantom Wallet:",
        adapter.publicKey?.toBase58()
      );
      setIsPhantomConnected(true);
      // setWalletToCookies(adapter.publicKey?.toBase58(), true);
      // queryClient.invalidateQueries(["wallet"]);
    } catch (error) {
      console.error("Connection Error:", error);
    }
  };

  const disconnectSolanaWallet = async () => {
    if (phantomWallet) {
      await phantomWallet.disconnect();
      setPhantomWallet(null);
      setSolanaAddress(null);
      console.log("Disconnected from Phantom Wallet.");
      setIsPhantomConnected(false);
      // setWalletToCookies("", false);
      // queryClient.invalidateQueries(["wallet"]);
    } else {
      try {
        const adapter = await getNightlyAdapter();
        await adapter.disconnect();
        setNightlyAddress(undefined);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getWalletFromCookies = () => {
    const solanaAddress = Cookies.get("walletAddress");
    const isPhantomConnected = Cookies.get("isConnected") === "true";
    setIsPhantomConnected(isPhantomConnected);
    return { solanaAddress, isPhantomConnected };
  };

  const setWalletToCookies = (walletAddress: string, isConnected: boolean) => {
    Cookies.set("walletAddress", walletAddress);
    Cookies.set("isConnected", isConnected.toString());
  };

  useEffect(() => {
    const init = async () => {
      const adapter = await getNightlyAdapter();
      // Eager connect
      if (await adapter.canEagerConnect()) {
        try {
          await adapter.connect();
          const publicKey = await adapter.accounts.get();
          if (publicKey.length > 0) {
            console.log(publicKey[0].address);
            setNightlyAddress(publicKey[0].address);
          }
        } catch (error) {
          await adapter.disconnect().catch(() => {});
          console.log(error);
        }
      }
    };
    init();
    // Try eagerly connect
  }, []);

  const handleNightlyConnect = async () => {
    const adapter = await getNightlyAdapter();
    try {
      await adapter.connect();
      const publicKey = await adapter.accounts.get();
      if (publicKey.length > 0) {
        setNightlyAddress(publicKey[0].address);
        console.log(publicKey[0].address);
      }
    } catch (error) {
      await adapter.disconnect().catch(() => {});
      console.log(error);
    }
  };

  return (
    <div className="h-[202.77px] px-7 py-8 bg-white rounded-[10px] border border-[#d0d4dd] flex-col justify-start items-end inline-flex">
      <div className="w-[25.77px] h-[25.77px] relative">
        <button className="w-[10.61px] h-[10.61px] left-[7.58px] top-[2px] absolute ">
          x
        </button>
      </div>
      <div className="flex-col justify-start items-center gap-8 flex">
        <div className="flex-col justify-start items-center flex">
          <div className="h-[34px] flex-col justify-start items-center gap-2 flex">
            <div className="text-[#101828] text-[28px] font-semibold font-['Urbanist'] leading-[33.60px]">
              Connect Wallets
            </div>
          </div>
        </div>
        <div className="justify-start items-center gap-3 inline-flex">
          <button
            className="w-[200px] h-[60px] bg-[#f6f6f6] rounded-[10px] justify-center items-center gap-[5px] flex"
            onClick={handleEvmModal}
          >
            <div className="text-black text-base font-semibold font-['Urbanist'] leading-normal">
              EVM networks
            </div>
            <div className="w-10 h-10 relative">
              <img
                className="w-[25px] h-[39px] left-[7.50px] top-0 absolute"
                src="/EVM.svg"
              />
            </div>
          </button>
          <button
            className="w-[200px] h-[60px] bg-[#f6f6f6] rounded-[10px] justify-center items-center gap-[5px] flex"
            onClick={handleSolanaModal}
          >
            <div className="text-black text-base font-semibold font-['Urbanist'] leading-normal">
              Solana network
            </div>
            <div className="w-10 h-10 relative">
              <img
                className="w-[34.71px] h-[27.21px] left-[2.19px] top-[6px] absolute"
                src="/Solana.svg"
              />
            </div>
          </button>
        </div>
      </div>

      <EVMWalletModal
        title="Connect a wallet on EVM to continue"
        isOpen={openEvmModal}
        closeModal={handleCloseModal}
        handleMetamask={connectMetaMask}
        isConnected={isConnected}
        handleDisconnect={handleDisconnect}
        handleWalletConnect={connectWalletConnect}
      />
      <SolanaWalletModal
        closeModal={handleCloseModal}
        isOpen={openSolanaModal}
        handleDisconnect={disconnectSolanaWallet}
        isConnected={solanaAddress !== undefined}
        handlePhantom={handlePhantomConnect}
        handleNightly={handleNightlyConnect}
        isNightlyConnected={nightlyAddress !== undefined}
      />
    </div>
  );
};

export default Chains;
