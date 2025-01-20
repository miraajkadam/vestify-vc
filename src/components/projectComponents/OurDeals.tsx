"use client";
import { FomoDeal, Network } from "fomo-deal-sdk-v1";
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

interface PaymentToken {
  tokenAddress?: string;
  name: string;
  symbol: string;
  chain: string;
  decimals: number;
  icon: string;
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

  const [paymentTokens, setPaymentTokens] = useState<PaymentToken[]>([]);

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
        startDate: tge,
        endDate: vesting,
      },
    });
  };

  const fomoDeal = new FomoDeal();

  const getTokens = async () => {
    const res = await fomoDeal.getSupportedPaymentToken(Network.ETHEREUM);
    setPaymentTokens(res);
  };
  getTokens();

  const tokens = [
    {
      tokenAddress: "0x4971fa9b1e4015b5862d91ef221663ca82f4add9",
      tokenName: "ETH",
    },
    {
      tokenAddress: "0x4971fa9b1e4015b5862d91ef221663ca82f4add9",
      tokenName: "BTS",
    },
    {
      tokenAddress: "0x4971fa9b1e4015b5862d91ef221663ca82f4add9",
      tokenName: "USDT",
    },
  ];

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
          onChange={(e) => {
            setAcceptedTokens(e.target.value);
            console.log(e.target.value, "TOKEN ADDRESS");
          }}
          className="w-full p-3 border border-gray-300 rounded-md text-black"
          required
        >
          {/* <option value="">Select token accepted</option> */}
          {paymentTokens.map((item) => (
            <option value={item.tokenAddress}>{item.name}</option>
          ))}
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
