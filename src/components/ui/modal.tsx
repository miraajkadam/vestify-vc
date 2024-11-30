import React from "react";

interface ModalProps {
  title: string;
  isOpen: boolean;
  closeModal: () => void;
  handleMetamask?: ()=> void;
}

const Wallets = () => {
  return (
    <>
      <div className="flex p-3 justify-between items-center bg-bgsecondry rounded-xl">
        <div className="flex gap-1 items-center">
          <div className="w-10 h-10 ">
            <img className="w-full h-full object-cover" src="/Metamask.svg" />
          </div>
          <div>
            <p className="m-0 text-black text-base">Metamask</p>
          </div>
        </div>
        <div
          className="px-2 py-1 "
          style={{ background: "#f0f0f0", borderRadius: "10px" }}
        >
          <button
            className="text-base"
            style={{
              color: " rgba(0, 0, 0, 0.3)",
            }}
          >
            Detected
          </button>
        </div>
      </div>
    </>
  );
};

const Modal = ({ closeModal, title, isOpen, handleMetamask }: ModalProps) => {
  return (
    <>
      <div
        className={` ${
          isOpen ? "flex" : "hidden"
        } h-[376.77px] px-7 py-8 bg-white rounded-[10px] border border-[#d0d4dd] flex-col justify-start items-end inline-flex`}
        // className={` ${isOpen ? "flex" : "hidden"} bg-gray-50 fixed z-20 `}
        onClick={closeModal}
      >
        <div
          className="fixed inset-0 bg-gray-500/75 transition-opacity"
          // aria-hidden="true"
        ></div>
        <div
          id="popup-modal"
          tabIndex={-1}
          className={`   fixed inset-0 z-50 flex  items-center justify-center overflow-hidden`}
        >
          <div className="relative p-4 w-full max-w-[550px] max-h-full">
            <div className="relative bg-white rounded-lg shadow p-5">
              <button
                type="button"
                onClick={closeModal}
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
                <div className="h-[68px] flex-col justify-start items-center gap-2 flex">
                  <div className="text-center text-[#101828] text-[28px] font-semibold font-['Urbanist'] leading-[33.60px]">
                    Connect a wallet on Ethereum to continue
                  </div>
                  {/* {address && (
            <div className="text-center text-[#101828] text-[16px] font-semibold font-['Urbanist'] leading-[19.20px]">
              {address}
            </div>
          )}
          {ensName && status === "success" && (
            <div className="text-center text-[#101828] text-[16px] font-semibold font-['Urbanist'] leading-[19.20px]">
              ENS Name: {ensName}
            </div>
          )} */}
                  {/* {status === "error" && (
            <div className="text-center text-red-500 text-[16px]">
              Error fetching ENS name: {error?.message}
            </div>
          )} */}
                </div>
                <div className="flex-col w-full justify-start items-start gap-2.5 flex">
                  {/* MetaMask Wallet */}
                  <div
                    className="px-[15px] w-full py-2.5 bg-[#f6f6f6] rounded-[10px] justify-between items-center inline-flex cursor-pointer"
                    onClick={handleMetamask}
                  >
                    <div className="justify-start items-center gap-[5px] flex">
                      <div className="w-10 h-10 relative">
                        <img
                          className="w-[30.99px] h-[30.99px] absolute"
                          src="/Metamask.svg"
                          alt="MetaMask"
                        />
                      </div>
                      <div className="text-black text-base font-semibold font-['Urbanist'] leading-normal">
                        MetaMask
                      </div>
                    </div>
                    {/* {isConnected ? (
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
                  {walletStatus?.metamask}
                </span>
              </button>
            )} */}
                  </div>

                  {/* WalletConnect */}
                  <div className="px-[15px] w-full py-2.5 bg-[#f6f6f6] rounded-[10px] justify-between items-center inline-flex cursor-pointer">
                    <div className="justify-start items-center gap-[5px] flex">
                      <div className="w-10 h-10 relative">
                        <img
                          className="w-[29.46px] h-[29.46px] absolute"
                          src="/Walletconnect.svg"
                          alt="WalletConnect"
                        />
                      </div>
                      <div className="text-black text-base font-semibold font-['Urbanist'] leading-normal">
                        WalletConnect
                      </div>
                    </div>
                    <button className="px-2 py-1.5 bg-[#f0f0f0] rounded-[10px] justify-center items-center flex">
                      {/* <span className="text-black/30 text-base font-semibold font-['Urbanist'] leading-normal">
                        {walletStatus?.walletConnect}
                      </span> */}
                    </button>
                  </div>
                  {/* Trust Wallet */}
                  <div className="px-[15px] w-full py-2.5 bg-[#f6f6f6] rounded-[10px] justify-between items-center inline-flex cursor-pointer">
                    <div className="justify-start items-center gap-[5px] flex">
                      <div className="w-10 h-10 relative">
                        <img
                          className="w-[34.84px] h-[34.84px] rounded-[20px] absolute"
                          src="/Trustwallet.svg"
                          alt="TrustWallet"
                        />
                      </div>
                      <div className="text-black text-base font-semibold font-['Urbanist'] leading-normal">
                        TrustWallet
                      </div>
                    </div>
                    <button className="px-2 py-1.5 bg-[#f0f0f0] rounded-[10px] justify-center items-center flex">
                      {/* <span className="text-black/30 text-base font-semibold font-['Urbanist'] leading-normal">
                        {walletStatus?.trustWallet}
                      </span> */}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <svg
                    className="size-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold text-gray-900"
                    id="modal-title"
                  >
                    Deactivate account
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to deactivate your account? All of
                      your data will be permanently removed. This action cannot
                      be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Deactivate
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div> */}
    </>
  );
};

export default Modal;
