"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProjectCreationForm from "@/components/projectComponents/ProjectCreationForm";
import BackButton from "@/components/ui/BackButton";
import { useWalletInfo } from "@/store/walletContext";

export default function CreateProjectPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const { connectedWalletAddressInfo } = useWalletInfo();

  console.log(connectedWalletAddressInfo);
  const handleBack = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    } else {
      router.push("/vc");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add new Project</h1>
      <div className="flex items-center mb-6">
        <BackButton onClick={handleBack} />
      </div>
      <ProjectCreationForm step={7} setStep={setStep} />
    </div>
  );
}
