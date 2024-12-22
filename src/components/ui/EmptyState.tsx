import React from "react";
import { FileQuestion, Plus, Wallet } from "lucide-react";

const EmptyState = ({
  isWalletConnected,
  handleButtonClick,
}: {
  isWalletConnected: boolean;
  handleButtonClick: () => void;
}) => {
  return (
    <div className="bg-white  w-full rounded-lg shadow-sm p-8 flex flex-col items-center justify-center min-h-[400px] border border-gray-100">
      <div className="h-16 w-16 bg-[#443cc4] rounded-full flex items-center justify-center mb-6">
        <FileQuestion className="h-8 w-8 bg-[#443cc4]" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        VC is not registered yet.
      </h3>
      <p className="text-gray-500 text-center mb-6 max-w-sm">
        Get started by creating a new project to organize your work and
        collaborate with others.
      </p>
      <button
        onClick={handleButtonClick}
        className="px-6 py-2 bg-[#443cc4] text-white rounded-lg transition-colors flex items-center gap-2"
      >
        <Wallet className="h-4 w-4" />
        {isWalletConnected ? "Register VC" : "Connect Wallet"}
        {/* Register VC */}
      </button>
    </div>
  );
};

export default EmptyState;
