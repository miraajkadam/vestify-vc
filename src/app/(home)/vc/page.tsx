"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/vcprofile/Navbar";
import Profile from "@/components/vcprofile/Profile";
import Projects from "@/components/vcprofile/Projects";
import { useVCProfileData } from "@/hooks/useVCProfile";
import { FomoDeal, Network } from "fomo-deal-sdk-v1";
import MainConnectModal from "@/components/web3/MainConnectModal";
import { metaMask, walletConnect } from "wagmi/connectors";

import { useAccount, useConnect, useEnsName, useDisconnect } from "wagmi";
import { PhantomWalletAdapter } from "@/components/web3/Phantom_adapter";
import { getNightlyAdapter } from "@/components/web3/NightlyAdapter";
import { useWalletInfo } from "@/store/walletContext";
import RegisterVCModal from "@/components/web3/registerVCModal";
import EmptyState from "@/components/ui/EmptyState";
import { useAddWallet } from "@/hooks/useAddWallet";
import { useVCProjects } from "@/hooks/useVCProjects";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";

const VCProfilePage2: React.FC = () => {
  const fomoDeal = new FomoDeal();
  const [openModal, setOpenModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [phantomWallet, setPhantomWallet] =
    useState<PhantomWalletAdapter | null>(null);

  const [nightlyAddress, setNightlyAddress] = useState<string | undefined>();

  const [isWalletRegistered, setIsWalletRegistered] = useState(false);

  const [solanaAddress, setSolanaAddress] = useState<string | null>(null);
  const [isPhantomConnected, setIsPhantomConnected] = useState<
    boolean | undefined
  >(false);
  const { mutateAsync, isPending } = useAddWallet();
  const {
    data: profileData,
    isError,
    error,
    isLoading,
    refetch,
  } = useVCProfileData();

  const { data: vcProjects } = useVCProjects();

  const extractProjects = vcProjects?.map((proj: { projectCreated: any }) => proj.projectCreated);

  const { isConnected, address, chainId } = useAccount();

  const { connect } = useConnect();
  const { connectors, disconnect } = useDisconnect();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const isRegistered =
      profileData?.data?.linkedWallets?.some(
        (wallet) => wallet.address === address && wallet.chain === "EVM"
      ) ?? false;

    console.log(profileData?.data?.linkedWallets, "IS REGISTERED");

    setIsWalletRegistered(isRegistered);
  }, [address, profileData]);

  const signer = new ethers.BrowserProvider(window.ethereum);
  const connectMetaMask = () => {
    if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
      console.log("connectinggggggggggggggggggggg");
      connect({ connector: metaMask() });
      setOpenModal(false)
    } else {
      alert("MetaMask is not installed. Please install it.");
      window.open("https://metamask.io/download.html", "_blank");
      setOpenModal(false)
    }
  };

  const { handleSetWalletAddressInfo, connectedWalletAddressInfo } =
    useWalletInfo();

  useEffect(() => {
    handleSetWalletAddressInfo({
      walletAdd: address,
      chain: "EVM",
      isWalletConnected: isConnected,
    });
  }, [address]);

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

  const handleOpenRegisterModal = () => {
    if (isConnected) {
      console.log("connected");

      setOpenRegisterModal(true);
    } else {
      setOpenModal(true);
    }
  };

  const handleRegister = async () => {
    try {
      setLoader(true);
      const res = await fomoDeal.createVc(
        Network.ETHEREUM,
        options,
        `${profileData?.data?.vcName || "Test"}`
      );

      console.log(res);

      if (res) {
        await mutateAsync({
          address: connectedWalletAddressInfo.walletAdd,
          chain: connectedWalletAddressInfo.chain,
        });
        console.log("wallet added");
        setOpenRegisterModal(false);
        // alert("Wallet added successfully");
        toast.success("Wallet added successfully");
        refetch();
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log(error, "ERROR");
      toast.error("Error adding wallet");
      setOpenRegisterModal(false);
      refetch(); //need to shift in try block
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

  let options = {
    ethereum: {
      // contractAddress: "0x2e7483bcff40A5D6B251739531DF6b633490e256",
      contractAddress: "0x37a87286200a821008141957F28E7602c93F92db",
      provider: signer,
    },
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
            isRegistered={isWalletRegistered}
            handleDisconnect={handleDisconnect}
            handleRegister={handleRegister}
          />

          <Profile profile={profileData?.data} />
          {/* <button onClick={handleCreateVC}>CALL</button> */}
        </div>

        {isConnected && isWalletRegistered ? (
          <>
            <div className="text-[#18191c] text-[25px] font-bold font-['Urbanist'] leading-7">
              Last 5 projects
            </div>
            <div className="w-full ">
              <div className="w-full h-auto relative grid grid-cols-8 items-center text-[#afafaf] text-[15px] font-semibold gap-[10px]">
                <div className="col-span-2"> Project Name</div>
                <div> Pledge Amount</div>
                <div> Market Cap</div>
                <div> Top Gainers</div>
                <div> Raised Amount</div>
                <div> Ongoing Claim</div>
                <div></div>

                {extractProjects?.map((project: { projectCreated: any }) => (
                  <Projects projects={project} />
                ))}
              </div>
            </div>
            {/* {vcProjects.map((project) => (
            ))} */}
          </>
        ) : (
          <EmptyState
            isWalletConnected={isConnected}
            handleButtonClick={handleOpenRegisterModal}
          />
        )}
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

      <RegisterVCModal
        handleClose={() => setOpenRegisterModal(false)}
        isPending={isPending|| loader}
        isOpen={openRegisterModal}
        handleDisconnect={handleDisconnect}
        handleRegister={handleRegister}
      />
      <ToastContainer autoClose={2000}/>
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
