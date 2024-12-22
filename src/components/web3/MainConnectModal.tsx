import React, { useEffect, useState } from "react";
import Wallets from "./Wallets";
import EVMWalletModal from "./EVMWalletModal";
import SolanaWalletModal from "./SolanaWalletModal";

type Network = "EVM" | "SOLANA";

type MainModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  handleMetamask: () => void;
  handleWalletConnect: () => void;
  isConnected: boolean;
  handleDisconnect: () => void;
  handlePhanotm: () => void;
  handleNighly: () => void;
  isAnySolanaWallteConnected: () => void;
  isNightlyConnected: boolean;
  isSolanaConnected: boolean;
};

const MainConnectModal = ({
  isOpen,
  closeModal,
  handleMetamask,
  handleWalletConnect,
  handleDisconnect,
  isConnected,
  handleNighly,
  handlePhanotm,
  isNightlyConnected,
  isSolanaConnected,
  isAnySolanaWallteConnected,
}: MainModalProps) => {
  const [selecteModal, setSelectedModal] = useState({
    isEVMNetworkSelected: false,
    isSolanaNetworkSelected: false,
  });

  const handleSelectNetworkModal = (network: Network) => {
    if (network === "EVM") {
      setSelectedModal({
        isEVMNetworkSelected: true,
        isSolanaNetworkSelected: false,
      });
    }
    if (network === "SOLANA") {
      setSelectedModal({
        isEVMNetworkSelected: false,
        isSolanaNetworkSelected: true,
      });
    }
  };

  return (
    <>
      <div
        className={` ${
          isOpen ? "flex" : "hidden"
        } h-[376.77px] px-7 py-8 bg-white rounded-[10px] border border-[#d0d4dd] flex-col justify-start items-end inline-flex`}
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
                    onClick={() => handleSelectNetworkModal("EVM")}
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
                    onClick={() => handleSelectNetworkModal("SOLANA")}
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

              {selecteModal.isEVMNetworkSelected && (
                <EVMWalletModal
                  handleMetamask={handleMetamask}
                  handleWalletConnect={handleWalletConnect}
                  handleDisconnect={handleDisconnect}
                  isConnected={isConnected}
                />
              )}
              {selecteModal.isSolanaNetworkSelected && (
                <SolanaWalletModal
                  handleDisconnect={isAnySolanaWallteConnected}
                  handlePhantom={handlePhanotm}
                  handleNightly={handleNighly}
                  isNightlyConnected={isNightlyConnected}
                  isConnected={isSolanaConnected}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainConnectModal;
