import React, { useState, useEffect } from "react";
import { useAccount, useConnect, useEnsName, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { metaMask } from "wagmi/connectors";

function EVMWallets() {
  const [walletStatus, setWalletStatus] = useState({
    metamask: "Not Connected",
    walletConnect: "Not Connected",
    trustWallet: "Not Connected",
  });
  const { isConnected, address } = useAccount();
  const { connect } = useConnect();
  const { connectors, disconnect } = useDisconnect();

  // Wagmi hook for ENS name
  const { data: ensName, error, status } = useEnsName({ address });

  // Detect MetaMask on initial load
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setWalletStatus((prev) => ({ ...prev, metamask: "Detected" }));
    }
  }, []);

  const connectMetaMask = () => {
    if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
      connect({ connector: metaMask() });
    } else {
      alert("MetaMask is not installed. Please install it.");
      window.open("https://metamask.io/download.html", "_blank");
    }
  };

  const connectWalletConnect = async () => {
    // Implement WalletConnect integration here if needed
    // You can use wagmi's WalletConnect connector if you'd like
  };

  const handleDisconnect = () => {
    // disconnect({ connectors });
    connectors.forEach((connector) => {
      disconnect({ connector });
    });
    setWalletStatus((prev) => ({
      ...prev,
      metamask: "Not Connected",
      walletConnect: "Not Connected",
      trustWallet: "Not Connected",
    }));
  };

  return (
    <div className="h-[376.77px] px-7 py-8 bg-white rounded-[10px] border border-[#d0d4dd] flex-col justify-start items-end inline-flex">
      <div className="flex-col justify-start items-center gap-8 flex">
        <div className="h-[68px] flex-col justify-start items-center gap-2 flex">
          <div className="text-center text-[#101828] text-[28px] font-semibold font-['Urbanist'] leading-[33.60px]">
            Connect a wallet on EVM to continue
          </div>
          {address && (
            <div className="text-center text-[#101828] text-[16px] font-semibold font-['Urbanist'] leading-[19.20px]">
              {address}
            </div>
          )}
          {ensName && status === "success" && (
            <div className="text-center text-[#101828] text-[16px] font-semibold font-['Urbanist'] leading-[19.20px]">
              ENS Name: {ensName}
            </div>
          )}
          {status === "error" && (
            <div className="text-center text-red-500 text-[16px]">
              Error fetching ENS name: {error?.message}
            </div>
          )}
        </div>
        <div className="flex-col w-full justify-start items-start gap-2.5 flex">
          {/* MetaMask Wallet */}
          <div
            className="px-[15px] w-full py-2.5 bg-[#f6f6f6] rounded-[10px] justify-between items-center inline-flex cursor-pointer"
            onClick={connectMetaMask}
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
                  {walletStatus?.metamask}
                </span>
              </button>
            )}
          </div>

          {/* WalletConnect */}
          <div
            className="px-[15px] w-full py-2.5 bg-[#f6f6f6] rounded-[10px] justify-between items-center inline-flex cursor-pointer"
            onClick={connectWalletConnect}
          >
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
              <span className="text-black/30 text-base font-semibold font-['Urbanist'] leading-normal">
                {walletStatus.walletConnect}
              </span>
            </button>
          </div>

          {/* Trust Wallet */}
          <div
            className="px-[15px] w-full py-2.5 bg-[#f6f6f6] rounded-[10px] justify-between items-center inline-flex cursor-pointer"
            onClick={connectWalletConnect}
          >
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
              <span className="text-black/30 text-base font-semibold font-['Urbanist'] leading-normal">
                {walletStatus.trustWallet}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EVMWallets;

// import React, { useState, useEffect } from "react";
// import { useAccount, useConnect, useEnsName, useDisconnect } from "wagmi";
// import { injected } from "wagmi/connectors"; // Wagmi's MetaMask connector

// function EVMWallets() {
//   const [walletStatus, setWalletStatus] = useState({
//     metamask: "Not Detected",
//     walletConnect: "Not Connected",
//     trustWallet: "Not Connected",
//   });
//   const { isConnected, address } = useAccount();
//   const { connect } = useConnect();
//   const { disconnect } = useDisconnect();

//   // Wagmi hook for ENS name
//   const { data: ensName, error, status } = useEnsName({ address });

//   // Detect MetaMask on initial load
//   useEffect(() => {
//     if (typeof window.ethereum !== "undefined") {
//       setWalletStatus((prev) => ({ ...prev, metamask: "Detected" }));
//     }
//   }, []);

//   const connectMetaMask = () => {
//     if (typeof window.ethereum !== "undefined") {
//       connect({ connector: injected() });
//     } else {
//       alert("MetaMask is not installed. Please install it.");
//       window.open("https://metamask.io/download.html", "_blank");
//     }
//   };

//   const connectWalletConnect = async () => {
//     // Implement WalletConnect integration here if needed
//     // You can use wagmi's WalletConnect connector if you'd like
//   };

//   return (
//     <div className="h-[376.77px] px-7 py-8 bg-white rounded-[10px] border border-[#d0d4dd] flex-col justify-start items-end inline-flex">
//       <div className="flex-col justify-start items-center gap-8 flex">
//         <div className="h-[68px] flex-col justify-start items-center gap-2 flex">
//           <div className="text-center text-[#101828] text-[28px] font-semibold font-['Urbanist'] leading-[33.60px]">
//             Connect a wallet on EVM to continue
//           </div>
//           {address && (
//             <div className="text-center text-[#101828] text-[16px] font-semibold font-['Urbanist'] leading-[19.20px]">
//               {address}
//             </div>
//           )}
//           {ensName && status === "success" && (
//             <div className="text-center text-[#101828] text-[16px] font-semibold font-['Urbanist'] leading-[19.20px]">
//               ENS Name: {ensName}
//             </div>
//           )}
//           {status === "error" && (
//             <div className="text-center text-red-500 text-[16px]">
//               Error fetching ENS name: {error?.message}
//             </div>
//           )}
//         </div>
//         <div className="flex-col w-full justify-start items-start gap-2.5 flex">
//           {/* MetaMask Wallet */}
//           <div
//             className="px-[15px] w-full py-2.5 bg-[#f6f6f6] rounded-[10px] justify-between items-center inline-flex cursor-pointer"
//             onClick={connectMetaMask}
//           >
//             <div className="justify-start items-center gap-[5px] flex">
//               <div className="w-10 h-10 relative">
//                 <img
//                   className="w-[30.99px] h-[30.99px] absolute"
//                   src="/Metamask.svg"
//                   alt="MetaMask"
//                 />
//               </div>
//               <div className="text-black text-base font-semibold font-['Urbanist'] leading-normal">
//                 MetaMask
//               </div>
//             </div>
//             <button className="px-2 py-1.5 bg-[#f0f0f0] rounded-[10px] justify-center items-center flex">
//               <span className="text-black/30 text-base font-semibold font-['Urbanist'] leading-normal">
//                 {walletStatus?.metamask}
//               </span>
//             </button>
//           </div>

//           {/* WalletConnect */}
//           <div
//             className="px-[15px] w-full py-2.5 bg-[#f6f6f6] rounded-[10px] justify-between items-center inline-flex cursor-pointer"
//             onClick={connectWalletConnect}
//           >
//             <div className="justify-start items-center gap-[5px] flex">
//               <div className="w-10 h-10 relative">
//                 <img
//                   className="w-[29.46px] h-[29.46px] absolute"
//                   src="/Wallecconnect.svg"
//                   alt="WalletConnect"
//                 />
//               </div>
//               <div className="text-black text-base font-semibold font-['Urbanist'] leading-normal">
//                 WalletConnect
//               </div>
//             </div>
//             <button className="px-2 py-1.5 bg-[#f0f0f0] rounded-[10px] justify-center items-center flex">
//               <span className="text-black/30 text-base font-semibold font-['Urbanist'] leading-normal">
//                 {walletStatus.walletConnect}
//               </span>
//             </button>
//           </div>

//           {/* Trust Wallet */}
//           <div
//             className="px-[15px] w-full py-2.5 bg-[#f6f6f6] rounded-[10px] justify-between items-center inline-flex cursor-pointer"
//             onClick={connectWalletConnect}
//           >
//             <div className="justify-start items-center gap-[5px] flex">
//               <div className="w-10 h-10 relative">
//                 <img
//                   className="w-[34.84px] h-[34.84px] rounded-[20px] absolute"
//                   src="/Trustwallet.svg"
//                   alt="TrustWallet"
//                 />
//               </div>
//               <div className="text-black text-base font-semibold font-['Urbanist'] leading-normal">
//                 TrustWallet
//               </div>
//             </div>
//             <button className="px-2 py-1.5 bg-[#f0f0f0] rounded-[10px] justify-center items-center flex">
//               <span className="text-black/30 text-base font-semibold font-['Urbanist'] leading-normal">
//                 {walletStatus.trustWallet}
//               </span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EVMWallets;
