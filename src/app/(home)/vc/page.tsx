"use client";
import React, { useEffect, useState } from "react";
import { getVCProfile, VCProfile } from "@/lib/api";
import Navbar from "@/components/vcprofile/Navbar";
import Profile from "@/components/vcprofile/Profile";
import Descp from "@/components/vcprofile/Descp";
import { GetVCProjectsResponse } from "@/lib/api";
import Projects from "@/components/vcprofile/Projects";
import { useVCProfileData } from "@/hooks/useVCProfile";
import { FomoDeal, Network } from "fomo-deal-sdk-v1";
import EVMWalletModal from "@/components/web3/EVMWalletModal";
import MainConnectModal from "@/components/web3/MainConnectModal";
import { metaMask, walletConnect } from "wagmi/connectors";

import { useAccount, useConnect, useEnsName, useDisconnect } from "wagmi";
import { PhantomWalletAdapter } from "@/components/web3/Phantom_adapter";
import { getNightlyAdapter } from "@/components/web3/NightlyAdapter";
import { useWalletInfo } from "@/store/walletContext";
import { useMerkleRootWallets } from "@/hooks/useMerkleRootAddresses";

const VCProfilePage2: React.FC = () => {
  const fomoDeal = new FomoDeal();
  const [openModal, setOpenModal] = useState(false);
  const [phantomWallet, setPhantomWallet] =
    useState<PhantomWalletAdapter | null>(null);

  const [nightlyAddress, setNightlyAddress] = useState<string | undefined>();
  const [solanaAddress, setSolanaAddress] = useState<string | null>(null);
  const [isPhantomConnected, setIsPhantomConnected] = useState(false);

  const { data: profileData, isError, error, isLoading } = useVCProfileData();

  const { isConnected, address, chainId } = useAccount();
  const { connect } = useConnect();
  const { connectors, disconnect } = useDisconnect();

  const connectMetaMask = () => {
    if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
      console.log("connectinggggggggggggggggggggg");
      connect({ connector: metaMask() });
    } else {
      alert("MetaMask is not installed. Please install it.");
      window.open("https://metamask.io/download.html", "_blank");
    }
  };

  const { handleSetWalletAddressInfo, connectedWalletAddressInfo } =
    useWalletInfo();

  useEffect(() => {
    handleSetWalletAddressInfo({
      walletAdd: address,
      chain: "EVM",
    });
  }, [address]);
  // useEffect(() => {
  //   console.log(connectedWalletAddressInfo);
  // }, [connectedWalletAddressInfo]);

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

  if (isLoading) return <LoadingSpinner />;
  if (isError) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return <ErrorMessage message={errorMessage} />;
  }
  if (!profileData?.data) return <NoProfileData />;

  return (
    <div className=" h-[100vh] w-full bg-white justify-start items-start inline-flex overflow-y-scroll ">
      <div className="w-full px-8 pb-8 bg-white flex-col justify-start items-start gap-[25px] inline-flex">
        <div className="w-full flex-col justify-start items-end flex">
          <Navbar
            profile={profileData?.data}
            openModal={() => setOpenModal(true)}
            connectedWalletAdd={address}
            isConnected={isConnected}
            handleDisconnect={handleDisconnect}
          />
          <Profile profile={profileData?.data} />
        </div>
        {/* <Descp profile={profileData?.data} /> */}
        <Projects profile={profileData?.data} />
      </div>

      <MainConnectModal
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
        handleMetamask={connectMetaMask}
        handleWalletConnect={connectWalletConnect}
        isConnected={isConnected}
        isAnySolanaWallteConnected={disconnectSolanaWallet}
        handleDisconnect={handleDisconnect}
        handlePhanotm={handlePhantomConnect}
        handleNighly={handleNightlyConnect}
        isSolanaConnected={solanaAddress !== undefined}
        isNightlyConnected={nightlyAddress !== undefined}
      />
    </div>
  );
};

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
  </div>
);

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex justify-center items-center h-screen text-red-500">
    Error: {message}
  </div>
);

const NoProfileData: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    No profile data available
  </div>
);

export default VCProfilePage2;
