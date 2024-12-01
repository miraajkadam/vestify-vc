import React from "react";

const Wallets = ({
  walletName,
  handleWalletClick,
  walletLogo,
  isConnected,
  handleDisconnect,
}: {
  walletName: string;
  walletLogo: string;
  isConnected: boolean;
  handleWalletClick?: () => void;
  handleDisconnect: () => void;
}) => {
  return (
    <>
      <div className="flex p-3 justify-between items-center bg-bgsecondry rounded-xl w-full">
        <div
          className="flex gap-1 items-center cursor-pointer w-full"
          onClick={handleWalletClick}
        >
          <div className="w-10 h-10 ">
            <img className="w-full h-full object-cover" src={walletLogo} />
          </div>
          <div>
            <p className="text-black text-base font-semibold font-['Urbanist'] leading-normal">
              {walletName}
            </p>
          </div>
        </div>
        <div
          className="px-2 py-1 "
          style={{ background: "#f0f0f0", borderRadius: "10px" }}
        >
          {isConnected ? (
            <button
              className="px-2 py-1.5 bg-[#f0f0f0] rounded-[10px] justify-center items-center flex"
              onClick={handleDisconnect}
            >
              <span className="text-black/30 text-base font-semibold font-['Urbanist'] leading-normal">
                Disconnect
              </span>
            </button>
          ) : (
            <button className="px-2 py-1.5 bg-[#f0f0f0] rounded-[10px] justify-center items-center flex">
              <span className="text-black/30 text-base font-semibold font-['Urbanist'] leading-normal">
                Detected
              </span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Wallets;
