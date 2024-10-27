import React from "react";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

function Navbar({ profile }) {
  const router = useRouter();
  return (
    <div className="w-full py-[32px] justify-between items-start flex">
      <div className="ml-8 justify-start items-center gap-[17.07px] flex">
        <div className="text-[#18191c] text-[25.61px] font-extrabold font-['Plus Jakarta Sans'] leading-10">
          Hi, {profile?.name}
        </div>
      </div>

      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 flex items-center transition duration-300"
        onClick={() => router.push("/add-project")}
      >
        <FaPlus className="mr-2" />
        Add New Project
      </button>
    </div>
  );
}

export default Navbar;
