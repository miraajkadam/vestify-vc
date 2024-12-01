import React, { useState } from "react";
import { useAccount, useConnect, useEnsName, useDisconnect } from "wagmi";
import { metaMask } from "wagmi/connectors";
import EVMWalletModal from "./EVMWalletModal";
import SolanaWalletModal from "./SolanaWalletModal";

function Chains() {
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
      connect({ connector: metaMask() });
    } else {
      alert("MetaMask is not installed. Please install it.");
      window.open("https://metamask.io/download.html", "_blank");
    }
  };

  const handleDisconnect = () => {
    connectors.forEach((connector) => {
      disconnect({ connector });
    });
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
        handleTrustWallet={() => {}}
        handleWalletConnect={() => {}}
      />
      <SolanaWalletModal
        closeModal={handleCloseModal}
        isOpen={openSolanaModal}
        handleDisconnect={() => {}}
        isConnected={false}
      />
    </div>
  );
}

export default Chains;
