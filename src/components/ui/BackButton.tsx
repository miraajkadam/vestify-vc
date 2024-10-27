import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
    >
      <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
    </button>
  );
};

export default BackButton;
