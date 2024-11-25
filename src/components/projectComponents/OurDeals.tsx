"use client";
import React, { useEffect, useState } from "react";

interface OurDealsProps {
  onComplete: (data: {
    deals: {
      maximum: number;
      minimum: number;
      acceptedTokens: string;
      poolFee: number;
      startDate: string;
      endDate: string;
    };
  }) => void;
  initialData?: {
    maximum: number;
    minimum: number;
    acceptedTokens: string;
    poolFee: number;
    startDate: string; // Initial TGE
    endDate: string; // Initial Vesting
  };
}

const OurDeals: React.FC<OurDealsProps> = ({ onComplete, initialData }) => {
  const [minimum, setMinimum] = useState<string>(
    initialData?.minimum !== undefined ? initialData.minimum.toString() : ""
  );
  const [maximum, setMaximum] = useState<string>(
    initialData?.maximum !== undefined ? initialData.maximum.toString() : ""
  );
  const [acceptedTokens, setAcceptedTokens] = useState<string>(
    initialData?.acceptedTokens || ""
  );
  const [poolFee, setPoolFee] = useState<string>(
    initialData?.poolFee !== undefined ? initialData.poolFee.toString() : ""
  );
  const [tge, setTge] = useState<string>(initialData?.startDate || ""); // State for TGE
  const [vesting, setVesting] = useState<string>(initialData?.endDate || ""); // State for Vesting

  useEffect(() => {
    if (initialData) {
      setMinimum(initialData?.minimum?.toString());
      setMaximum(initialData?.maximum?.toString());
      setAcceptedTokens(initialData?.acceptedTokens);
      setPoolFee(initialData?.poolFee?.toString());
      setTge(initialData?.startDate);
      setVesting(initialData?.endDate);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      deals: {
        maximum: parseFloat(maximum),
        minimum: parseFloat(minimum),
        acceptedTokens,
        poolFee: parseFloat(poolFee),
        startDate: new Date(tge).toISOString(),
        endDate: new Date(vesting).toISOString(),
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-black">Our Deals</h2>

      <div>
        <label
          htmlFor="startDate"
          className="block mb-2 font-medium text-black"
        >
          Start Date
        </label>
        <input
          id="startDate"
          type="date"
          value={tge}
          onChange={(e) => setTge(e.target.value)} // Update state for TGE
          className="w-full p-3 border border-gray-300 rounded-md text-black"
          required
        />
      </div>

      <div>
        <label htmlFor="endDate" className="block mb-2 font-medium text-black">
          End Date
        </label>
        <input
          id="endDate"
          type="date"
          value={vesting}
          onChange={(e) => setVesting(e.target.value)} // Update state for Vesting
          className="w-full p-3 border border-gray-300 rounded-md text-black"
          required
        />
      </div>

      <div>
        <label htmlFor="minimum" className="block mb-2 font-medium text-black">
          Minimum
        </label>
        <input
          id="minimum"
          type="number"
          step="0.01"
          value={minimum}
          onChange={(e) => setMinimum(e.target.value)}
          placeholder="Enter Minimum"
          className="w-full p-3 border border-gray-300 rounded-md text-black"
          required
        />
      </div>

      <div>
        <label htmlFor="maximum" className="block mb-2 font-medium text-black">
          Maximum
        </label>
        <input
          id="maximum"
          type="number"
          step="0.01"
          value={maximum}
          onChange={(e) => setMaximum(e.target.value)}
          placeholder="Enter Maximum"
          className="w-full p-3 border border-gray-300 rounded-md text-black"
          required
        />
      </div>

      <div>
        <label
          htmlFor="acceptedTokens"
          className="block mb-2 font-medium text-black"
        >
          Select tokens accepted
        </label>
        <select
          id="acceptedTokens"
          value={acceptedTokens}
          onChange={(e) => setAcceptedTokens(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md text-black"
          required
        >
          <option value="">Select token accepted</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="USDT">USDT</option>
        </select>
      </div>

      <div>
        <label htmlFor="poolFee" className="block mb-2 font-medium text-black">
          Pool Fee
        </label>
        <input
          id="poolFee"
          type="number"
          step="0.1"
          value={poolFee}
          onChange={(e) => setPoolFee(e.target.value)}
          placeholder="Enter Pool Fee"
          className="w-full p-3 border border-gray-300 rounded-md text-black"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Proceed
      </button>
    </form>
  );
};

export default OurDeals;
