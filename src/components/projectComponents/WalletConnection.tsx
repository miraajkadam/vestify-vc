import { useWalletInfo } from "@/store/walletContext";
import React, { useState } from "react";

interface projectWalletData {
  chain: string | undefined;
  walletAddress: `0x${string}` | undefined;
}

interface ChainsProps {
  onComplete: (data: { projectWallet: projectWalletData }) => void;
}

const WalletConnection = ({ onComplete }: ChainsProps) => {
  const { connectedWalletAddressInfo } = useWalletInfo();

  const { chain, walletAdd } = connectedWalletAddressInfo;

  const [fundraisingWalletAddress, setFundraisingWalletAddress] =
    useState<string>("");

  const [walletAddError, setWalletAddError] = useState<string>("");

  const handleWalleAddChange = (e: any) => {
    setFundraisingWalletAddress(e.target.value);
    setWalletAddError("");
  };

  const handleFinish = () => {
    if (fundraisingWalletAddress === "") {
      setWalletAddError("Please add fundraising wallet address");
    } else {
      const payload = {
        walletAddress: walletAdd,
        chain,
      };

      onComplete({
        projectWallet: payload,
      });
      setWalletAddError("");
    }
  };

  return (
    // <form>
    <>
      <h2 className="text-2xl font-bold mb-6 text-black text-center">
        Wallet Connection
      </h2>

      <div className="space-y-4 pb-6 border-b">
        <div>
          <label
            htmlFor="selectedNetwork"
            className="block mb-2 font-medium text-black"
          >
            Select Chain
          </label>
          <select
            id="selectedNetwork"
            disabled
            value={
              connectedWalletAddressInfo.chain === "EVM" ? "EVM" : "SOLANA"
            }
            // onChange={(e) => setSelectedNetwork(e.target.value)}
            className="w-full p-3 border  border-gray-300 rounded-md text-black"
            required
          >
            <option value="">Select Chain </option>
            <option value="SOLANA">SOLANA</option>
            <option value="EVM">EVM</option>
          </select>
        </div>
        <div>
          <div>
            <label
              // htmlFor={`fdv-${index}`}
              className="block mb-2 font-medium text-black"
            >
              Set fundraising wallet
            </label>
            <input
              // id={`fdv-${index}`}
              type="text"
              // value=""
              onChange={handleWalleAddChange}
              placeholder="Set fundraising Wallet"
              className="w-full text-black p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          {walletAddError && (
            <p className=" m-0 text-red-500">{walletAddError}</p>
          )}
        </div>
        <div>
          <label
            // htmlFor={`fdv-${index}`}
            className="block mb-2 font-medium text-black"
          >
            Connected wallet address
          </label>
          <input
            // id={`fdv-${index}`}
            type="text"
            disabled
            value={connectedWalletAddressInfo.walletAdd}
            onChange={() => {}}
            placeholder="Set fundraising Wallet"
            className="w-full p-3 border text-black border-gray-300 rounded-md"
            required
          />
        </div>
      </div>

      <button
        onClick={handleFinish}
        // type="submit"
        className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Finish
      </button>
    </>
  );
};

export default WalletConnection;
