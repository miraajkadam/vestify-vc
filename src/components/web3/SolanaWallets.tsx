import React, { useState, useEffect } from "react";
import { PhantomWalletAdapter } from "./Phantom_adapter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

// Helper function to get and set the wallet state in cookies
const getWalletFromCookies = () => {
  const walletAddress = Cookies.get("walletAddress");
  const isConnected = Cookies.get("isConnected") === "true";
  return { walletAddress, isConnected };
};

const setWalletToCookies = (walletAddress: string, isConnected: boolean) => {
  Cookies.set("walletAddress", walletAddress);
  Cookies.set("isConnected", isConnected.toString());
};

// The wallet connection logic using Tanstack Query
const connectWallet = async () => {
  const adapter = new PhantomWalletAdapter();
  await adapter.connect();
  return adapter;
};

const disconnectWallet = async () => {
  const adapter = new PhantomWalletAdapter();
  await adapter.disconnect();
};

function SolanaWallets() {
  const queryClient = useQueryClient();

  // Updated useQuery call to work with Tanstack Query v5
  const {
    data: walletData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["wallet"],
    queryFn: getWalletFromCookies,
    initialData: getWalletFromCookies(),
  });

  const [wallet, setWallet] = useState<PhantomWalletAdapter | null>(null);

  useEffect(() => {
    if (walletData.isConnected && walletData.walletAddress) {
      // Instead of manually setting publicKey, we rely on the connected wallet instance
      const adapter = new PhantomWalletAdapter();
      // Set the wallet after connecting (publicKey is part of the adapter instance)
      setWallet(adapter);
    }
  }, [walletData]);

  const handleConnect = async () => {
    try {
      const connectedWallet = await connectWallet();
      setWallet(connectedWallet);
      setWalletToCookies(connectedWallet.publicKey.toString(), true);
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
    } catch (error) {
      console.error("Connection Error:", error);
    }
  };

  const handleDisconnect = async () => {
    try {
      if (wallet) {
        await disconnectWallet();
        setWalletToCookies("", false);
        queryClient.invalidateQueries({ queryKey: ["wallet"] });
      }
    } catch (error) {
      console.error("Disconnection Error:", error);
    }
  };

  const walletAddress = walletData.walletAddress;
  const isConnected = walletData.isConnected;

  return (
    <div className="h-[446.77px] px-7 py-8 bg-white rounded-[10px] border border-[#d0d4dd] flex-col justify-start items-end inline-flex">
      <div className="w-[25.77px] h-[25.77px] relative">
        <div className="w-[10.61px] h-[10.61px] left-[7.58px] top-[7.58px] absolute"></div>
      </div>
      <div className="flex-col justify-start items-center gap-8 flex">
        <div className="flex-col justify-start items-center flex">
          <div className="h-[68px] flex-col justify-start items-center gap-2 flex">
            <div className="text-center text-[#101828] text-[28px] font-semibold font-['Urbanist'] leading-[33.60px]">
              Connect a wallet on
              <br />
              Solana to continue
            </div>
            {walletAddress && (
              <div className="text-center text-[#101828] text-[20px] font-semibold font-['Urbanist'] leading-[33.60px]">
                {walletAddress}
              </div>
            )}
          </div>
        </div>
        <div className="flex-col justify-start items-start gap-2.5 flex">
          <div className="px-[15px] py-2.5 bg-[#f6f6f6] rounded-[10px] justify-center items-center gap-[174px] inline-flex">
            <div className="justify-start items-center gap-[5px] flex">
              <div className="w-10 h-10 relative">
                <img
                  className="w-[44.58px] h-[33.43px] left-[-2.29px] top-[3.28px] absolute"
                  src="/Phantom.svg"
                />
              </div>
              <div className="text-black text-base font-semibold font-['Urbanist'] leading-normal">
                Phantom
              </div>
            </div>
            <button
              onClick={isConnected ? handleDisconnect : handleConnect}
              className="px-2 py-1.5 bg-[#f0f0f0] rounded-[10px] justify-center items-center gap-2.5 flex"
            >
              <text className="text-black/30 text-base font-semibold font-['Urbanist'] leading-normal">
                {isConnected ? "Disconnect" : "Connect"}
              </text>
            </button>
          </div>
          <div className="px-[15px] py-2.5 bg-[#f6f6f6] rounded-[10px] justify-center items-center gap-[155px] inline-flex">
            <div className="justify-start items-center gap-[5px] flex">
              <div className="w-10 h-10 relative">
                <img
                  className="w-[35.55px] h-[35.55px] left-[2.23px] top-[2.23px] absolute rounded-[20px]"
                  src="/Magiceden.svg"
                />
              </div>
              <div className="text-black text-base font-semibold font-['Urbanist'] leading-normal">
                Magic Eden
              </div>
            </div>
            <button className="px-2 py-1.5 bg-[#f0f0f0] rounded-[10px] justify-center items-center gap-2.5 flex">
              <text className="text-black/30 text-base font-semibold font-['Urbanist'] leading-normal">
                Detected
              </text>
            </button>
          </div>

          <div className="px-[15px] py-2.5 bg-[#f6f6f6] rounded-[10px] justify-center items-center gap-[188px] inline-flex">
            <div className="justify-start items-center gap-[5px] flex">
              <div className="w-10 h-10 relative">
                <img
                  className="w-[36.67px] h-[36.67px] left-[1.66px] top-[1.66px] absolute rounded-[46px]"
                  src="/Nightly.svg"
                />
              </div>
              <div className="text-black text-base font-semibold font-['Urbanist'] leading-normal">
                Nightly
              </div>
            </div>
            <button className="px-2 py-1.5 bg-[#f0f0f0] rounded-[10px] justify-center items-center gap-2.5 flex">
              <text className="text-black/30 text-base font-semibold font-['Urbanist'] leading-normal">
                Detected
              </text>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SolanaWallets;
