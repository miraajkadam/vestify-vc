import React from "react";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

function Navbar({
  profile,
  openModal,
  connectedWalletAdd,
  isConnected,
  handleDisconnect,
  isRegistered,
  handleRegister,
}: any) {
  const router = useRouter();
  return (
    <div className="w-full py-[32px] justify-between items-start flex">
      <div className="ml-8 justify-start items-center gap-[17.07px] flex">
        <div className="text-[#18191c] text-[25.61px] font-extrabold font-['Plus Jakarta Sans'] leading-10">
          Hi, {profile?.name}
        </div>
      </div>

      <div className="flex gap-2">
        {isConnected ? (
          <>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 flex items-center transition duration-300">
              {connectedWalletAdd}
            </button>
            <button
              onClick={handleDisconnect}
              className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 flex items-center transition duration-300"
            >
              Disconnect
            </button>
            {!isRegistered && (
              <button
                onClick={handleRegister}
                className="px-4 py-2  border-indigo-600 rounded-full text-black font-semibold border-2 hover:bg-indigo-700 hover:text-white transition"
              >
                Register Wallet
              </button>
            )}
          </>
        ) : (
          <button
            onClick={openModal}
            className="px-4 py-2  border-indigo-600 rounded-full text-black font-semibold border-2 hover:bg-indigo-700 hover:text-white transition"
          >
            Connect Wallet
          </button>
        )}

        <button
          disabled={!isConnected}
          className="bg-indigo-600 text-white px-4 py-2 cursor-pointer rounded-full hover:bg-indigo-700 flex items-center transition duration-300"
          onClick={() => router.push("/createProject")}
        >
          <FaPlus className="mr-2" />
          Add New Project
        </button>
      </div>
    </div>
  );
}

export default Navbar;
