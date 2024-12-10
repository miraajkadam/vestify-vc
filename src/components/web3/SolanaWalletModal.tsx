import React from "react";
import Wallets from "./Wallets";

interface ModalProps {
  isOpen?: boolean;
  closeModal?: () => void;
  handlePhantom?: () => void;
  handleMagicEden?: () => void;
  handleNightly?: () => void;
  handleDisconnect?: () => void;
  isConnected?: boolean;
  title?: string;
  isNightlyConnected?: boolean;
}

const SolanaWalletModal = ({
  closeModal,
  isOpen,
  handleDisconnect,
  isConnected,
  title,
  handleMagicEden,
  handleNightly,
  handlePhantom,
  isNightlyConnected,
}: ModalProps) => {
  return (
    <>
      <div className="flex-col justify-start items-center gap-8 flex">
        <div className="h-[68px] flex-col justify-start items-center gap-2 flex">
          <div className="text-center text-[#101828] text-[28px] font-semibold font-['Urbanist'] leading-[33.60px]">
            Connect a wallet on Solana to continue
          </div>

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
            walletLogo={"/Phantom.svg"}
            walletName="Phantom"
            handleWalletClick={handlePhantom}
            isConnected={isConnected}
            handleDisconnect={handleDisconnect}
          />
          <Wallets
            walletLogo={"/Magiceden.svg"}
            walletName="Magic Eden"
            handleWalletClick={handleMagicEden}
            isConnected={false}
            handleDisconnect={handleDisconnect}
          />
          <Wallets
            walletLogo={"/Nightly.svg"}
            walletName="Nightly"
            handleWalletClick={handleNightly}
            isConnected={isNightlyConnected}
            handleDisconnect={handleDisconnect}
          />
        </div>
      </div>
    </>
  );
};

export default SolanaWalletModal;
