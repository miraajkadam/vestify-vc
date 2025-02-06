import React from "react";
import { Info } from "lucide-react";
import { useWalletInfo } from "@/store/walletContext";

const RegisterVCModal = ({
  isOpen,
  handleDisconnect,
  handleRegister,
  isPending,
  handleClose,
}: {
  isOpen: boolean;
  isPending: boolean;
  handleDisconnect: () => void;
  handleClose: () => void;
  handleRegister: () => void;
}) => {
  const { connectedWalletAddressInfo } = useWalletInfo();

  const { chain, walletAdd } = connectedWalletAddressInfo;
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
                onClick={handleClose}
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
                      VC OnChain Registration
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <div className=" text-[#101828] text-[16px] font-semibold font-['Urbanist'] leading-[19.20px]">
                  <div>
                    <label className="block mb-2 font-medium text-black">
                      Wallet address
                    </label>
                    <input
                      type="text"
                      disabled
                      value={walletAdd}
                      // onChange={() => {}}
                      placeholder="Wallet address"
                      className="w-full p-3 border text-black border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="selectedNetwork"
                    className="block mb-2 font-medium text-black"
                  >
                    Selected Chain
                  </label>
                  <select
                    id="selectedNetwork"
                    disabled
                    value={chain === "EVM" ? "EVM" : "SOLANA"}
                    // onChange={(e) => setSelectedNetwork(e.target.value)}
                    className="w-full p-3 border  border-gray-300 rounded-md text-black"
                    required
                  >
                    <option value="">Select Chain </option>
                    <option value="SOLANA">SOLANA</option>
                    <option value="EVM">EVM</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 p-4 rounded-lg mb-4">
                  <Info className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm">
                    If you want to register different wallet address disconnect
                    and connect wallet again
                  </p>
                </div>

                <div className="flex justify-between items-center mt-3">
                  <button
                    onClick={handleDisconnect}
                    className="px-4 py-2  border-indigo-600 rounded-full text-black font-semibold border-2 hover:bg-indigo-700 hover:text-white transition"
                  >
                    Disconnect
                  </button>
                  <button
                    onClick={handleRegister}
                    disabled={isPending}
                    className="bg-indigo-600 text-white px-4 py-2 cursor-pointer rounded-full hover:bg-indigo-700 flex items-center transition duration-300"
                  >
                    {isPending ? "Registering..." : "Register"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterVCModal;
