import React from "react";

interface FormErrorProps {
  message: string;
}

export const FormError: React.FC<FormErrorProps> = ({ message }) => {
  return <p className="text-red-600 text-center">{message}</p>;
};
