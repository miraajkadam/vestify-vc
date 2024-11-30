import React, { useState } from "react";
import DialogDemo from "../ui/modal";
import Modal from "../ui/modal";
import EVMWallets from "./EVMWallets";

function Chains({ onSelectChain }) {
  const [openEvmModal, setOpenEvmModal] = useState<boolean>(false);
  const [openSolanaModal, setOpenSolanaModal] = useState<boolean>(false);
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
      {/* <EVMWallets /> */}
      {/* <Modal
        title="Connect a wallet on EVM to continue"
        isOpen={openEvmModal}
        closeModal={handleCloseModal}
      /> */}

      {/* <Modal
        title="Connect a wallet on EVM to continue"
        isOpen={openEvmModal}
        closeModal={handleCloseModal}
      />
      <Modal
        title="Connect a wallet on
Solana to continue"
        isOpen={openSolanaModal}
        closeModal={handleCloseModal}
      /> */}
    </div>
  );
}

export default Chains;
