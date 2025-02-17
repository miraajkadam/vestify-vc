import React from "react";
import Wallets from "./Wallets";

interface ModalProps {
  title?: string;
  isOpen?: boolean;
  closeModal?: () => void;
  handleMetamask?: () => void;
  handleWalletConnect?: () => void;
  handleTrustWallet?: () => void;
  handleDisconnect?: () => void;
  isConnected?: boolean;
}

const EVMWalletModal = ({
  title,
  closeModal,
  isOpen,
  handleMetamask,
  isConnected,
  handleDisconnect,
  handleTrustWallet,
  handleWalletConnect,
}: ModalProps) => {
  return (
    <>
      <div className="flex-col justify-start items-center gap-8 flex">
        <div className="h-[68px] flex-col justify-start items-center gap-2 flex">
          {/* <div className="text-center text-[#101828] text-[28px] font-semibold font-['Urbanist'] leading-[33.60px]">
            Connect a wallet on Ethereum to continue
          </div> */}

          {/* {address && ( */}

          {/* {address && (
                        <div className="text-center text-[#101828] text-[16px] font-semibold font-['Urbanist'] leading-[19.20px]">
                        {address}
                        </div>
                    )}
                    {ensName && status === "success" && (
                        <div className="text-center text-[#101828] text-[16px] font-semibold font-['Urbanist'] leading-[19.20px]">
                        ENS Name: {ensName}
                        </div>
                    )} */}
          {/* {status === "error" && (
                        <div className="text-center text-red-500 text-[16px]">
                        Error fetching ENS name: {error?.message}
                        </div>
                    )} */}
        </div>
        <div className="flex-col w-full justify-start items-start gap-2.5 flex">
          <Wallets
            walletLogo={"/Metamask.svg"}
            walletName="MetaMask"
            handleWalletClick={handleMetamask}
            isConnected={isConnected}
            handleDisconnect={handleDisconnect}
          />
          <Wallets
            walletLogo={"/Walletconnect.svg"}
            walletName="WalletConnect"
            handleWalletClick={handleWalletConnect}
            isConnected={false}
            handleDisconnect={() => {}}
          />
          <Wallets
            walletLogo={"/Trustwallet.svg"}
            walletName="TrustWallet"
            handleWalletClick={handleTrustWallet}
            isConnected={false}
            handleDisconnect={() => {}}
          />
        </div>
      </div>
    </>
  );
};

export default EVMWalletModal;
