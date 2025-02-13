import React, { useState } from "react";
import { ChevronDown, Circle } from "lucide-react";
import ContributionDetails from "./contributionDetails";
const ContributeModal = ({ isOpen, handleInvest, handleClose }) => {
  const [amount, setAmount] = useState<string>("0");

  const handleAmountChange = (value: string) => {
    // Remove any non-digit characters except decimal point
    const cleanValue = value.replace(/[^\d.]/g, "");

    // Ensure only one decimal point
    const parts = cleanValue.split(".");
    if (parts.length > 2) return;

    // Limit to 2 decimal places
    if (parts[1]?.length > 2) return;

    setAmount(cleanValue);
  };
  return (
    <>
      <div
        className={` ${
          isOpen ? "flex" : "hidden"
        } h-auto px-7 py-8 bg-white rounded-[10px] border border-[#d0d4dd] flex-col justify-start items-end inline-flex`}
      >
        <div
          className="fixed inset-0 bg-gray-500/75 transition-opacity"
          onClick={handleClose}
        ></div>
        <div
          id="popup-modal"
          tabIndex={-1}
          className={`   fixed inset-0 z-50 flex  items-center justify-center overflow-hidden`}
        >
          {/* <ContributionDetails /> */}
          <div className=" bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Distributing</p>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Universal Project
                  </h1>
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              </div>

              {/* Stats */}
              <div className="flex gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xl font-bold text-black">$0.01</p>
                  <p className="text-sm text-gray-600">Seed Round</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 flex-1">
                  <p className="text-xl text-black font-bold">
                    $33,200/$50,000
                  </p>
                  <p className="text-sm text-gray-600">
                    Raised in pool Main Investors
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  <div className="w-1/2 h-full bg-indigo-600 rounded-full"></div>
                </div>
                <div className="text-right mt-1">
                  <span className="text-sm text-gray-600">50%</span>
                </div>
              </div>

              {/* Invest Section */}
              <div className="mb-6">
                <div className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-3">
                  <div className="font-semibold text-black">Invest</div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">0x8855.87a4</span>
                  </div>
                </div>
              </div>

              {/* Main Investors */}
              <div className="mb-6">
                <h2 className="font-semibold mb-3 text-black">
                  Main Investors
                </h2>
                <div className="grid grid-cols-3 gap-4 text-center mb-4">
                  <div className="text-indigo-600">
                    <p>Min $100.00</p>
                  </div>
                  <div className="text-indigo-600">
                    <p>Max $10,000.00</p>
                  </div>
                  <div className="text-indigo-600">
                    <p>Fee 10.00%</p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-gray-700">
                  <p>Raised In pool</p>
                  <p>$33,200.00 $50,000.00</p>
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Amount</label>
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="relative">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl font-bold text-gray-400">
                        $
                      </span>
                      <input
                        type="text"
                        value={amount}
                        onChange={(e) => handleAmountChange(e.target.value)}
                        className="w-full text-3xl font-bold pl-7 text-black focus:outline-none"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <button className="flex items-center gap-1 bg-gray-900 text-white px-3 py-1.5 rounded-lg ml-4">
                    <Circle className="w-4 h-4" />
                    <span>B-USDT</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex justify-end text-sm text-gray-600 mt-1">
                  <span>Max (122)</span>
                  <span className="mx-1">·</span>
                  <span>Bal:122.80</span>
                </div>
              </div>

              {/* Invest Button */}
              <button
                onClick={handleInvest}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Invest
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContributeModal;
