"use client";
import React, { useState } from "react";
import Chains from "@/components/projectComponents/Chains";
import EVMWallets from "@/components/web3/EVMWallets";
import SolanaWallets from "@/components/web3/SolanaWallets";

function Page() {
  const [selectedChain, setSelectedChain] = useState<string | null>(null);

  const handleChainSelection = (chainType: string) => {
    setSelectedChain(chainType);
  };

  const handleBack = () => {
    setSelectedChain(null); // Reset to show Chains component
  };

  return (
    <div className="h-full w-full bg-white flex justify-center items-center flex-col">
      {/* Conditionally render the Chains component if no chain is selected */}
      {!selectedChain && <Chains onSelectChain={handleChainSelection} />}

      {/* Show the back button and wallet components when a chain is selected */}
      {selectedChain && (
        <button
          className="absolute top-4 left-24 p-2 bg-gray-400 rounded-full "
          onClick={handleBack}
        >
          <span className="text-xl font-bold">&larr;</span> {/* Back Arrow */}
        </button>
      )}

      {/* Conditional rendering of Wallet components */}
      {selectedChain === "EVM" && <EVMWallets />}
      {selectedChain === "Solana" && <SolanaWallets />}
    </div>
  );
}

export default Page;
