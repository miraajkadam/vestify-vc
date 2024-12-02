import React from "react";
import Wallets from "./Wallets";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handlePhantom?: () => void;
  handleMagicEden?: () => void;
  handleNightly?: () => void;
  handleDisconnect: () => void;
  isConnected: boolean;
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
}: ModalProps) => {
  return (
    <>
      <div
        className={` ${
          isOpen ? "flex" : "hidden"
        } h-[376.77px] px-7 py-8 bg-white rounded-[10px] border border-[#d0d4dd] flex-col justify-start items-end inline-flex`}
        // onClick={closeModal}
      >
        <div className="fixed inset-0 bg-gray-500/75 transition-opacity"></div>
        <div
          id="popup-modal"
          tabIndex={-1}
          className={`   fixed inset-0 z-50 flex  items-center justify-center overflow-hidden`}
        >
          <div className="relative p-4 w-full max-w-[550px] max-h-full">
            <div className="relative bg-white rounded-lg shadow p-5">
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>

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
                    isConnected={false}
                    handleDisconnect={handleDisconnect}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SolanaWalletModal;
