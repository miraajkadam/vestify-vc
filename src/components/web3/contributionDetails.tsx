import React from "react";

const ContributionDetails = () => {
  return (
    <>
      <div className="bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Contribution for Universal Project
          </h1>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total amount</span>
              <span className="font-medium text-blue-500">100 B-USDT</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Recipient</span>
              <span className="text-gray-700">Universal Project</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Receiving Wallet</span>
              <span className="text-blue-500 hover:underline cursor-pointer">
                0x8855.87a4
              </span>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Network</span>
                <span className="text-gray-700">Binance Smart Chain</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Token</span>
                <span className="text-gray-700">B-USDT</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">From wallet</span>
                <span className="text-blue-500 hover:underline cursor-pointer">
                  0x8855.87a4
                </span>
              </div>
            </div>

            <div className="flex justify-center">
              <a href="#" className="text-blue-500 hover:underline">
                View on BscScan
              </a>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Please do not close or reload the window until finished
          </p>

          <button
            // onClick={handleInvest}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default ContributionDetails;
