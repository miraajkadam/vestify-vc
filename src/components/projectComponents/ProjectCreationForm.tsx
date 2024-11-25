"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BasicInformation from "./BasicInformation";
import TokenMetrics from "./TokenMetrics";
import OurDeals from "./OurDeals";
import TeamAndAdvisors from "./TeamAndAdvisors";
import PartnersAndInvestors from "./PartnersAndInvestors";
import Socials from "./Socials";
import { createProject } from "@/lib/api";
import StepIndicator from "./StepIndicator";
import { any } from "zod";
import { TeamMember, Partner, ProjectRound } from "@/lib/api";

type ProjectDataState = {
  info: {
    name: string;
    categories: string[];
    description: string;
  };
  tokenMetrics: {
    fdv: string;
    price: string;
    tgeUnlock: number;
    tge: string;
    round: string;
    tgeSummary: string;
  }[];
  deals: {
    maximum: number;
    minimum: number;
    acceptedTokens: string;
    poolFee: number;
    startDate: string;
    endDate: string;
  };
  teamAndAdvisors: any[];
  partnersAndInvestors: any[];
  projectSocials: Record<string, string>;
};

const ProjectCreationForm: React.FC<{
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ step, setStep }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFinalStep, setIsFinalStep] = useState(false);
  const [projectData, setProjectData] = useState<ProjectDataState>({
    info: {
      name: "",
      categories: [],
      description: "",
    },
    tokenMetrics: [],
    deals: {
      maximum: 0,
      minimum: 0,
      acceptedTokens: "",
      poolFee: 0,
      startDate: "",
      endDate: "",
    },
    teamAndAdvisors: [],
    partnersAndInvestors: [],
    projectSocials: {},
  });

  const router = useRouter();

  const steps = [
    { name: "Basic Information", component: BasicInformation },
    { name: "Token Metrics", component: TokenMetrics },
    { name: "Our Deals", component: OurDeals },
    { name: "Team & Advisors", component: TeamAndAdvisors },
    { name: "Partners & Investors", component: PartnersAndInvestors },
    { name: "Socials", component: Socials },
  ];

  const CurrentStepComponent = steps[step - 1].component;

  const handleStepComplete = (stepData: Partial<ProjectDataState>) => {
    console.log("Step Data received in handleStepComplete:", stepData);
    // setProjectData((prev) => ({ ...prev, ...stepData }));
    setProjectData((prev) => {
      const updatedData = { ...prev, ...stepData };
      console.log("Updated Project Data:", updatedData);
      return updatedData;
    });

    // // If this is the last step, submit the project
    // if (step === steps.length) {
    //   handleSubmit();
    // } else {
    //   setStep((prevStep) => prevStep + 1);
    // }
    // Move to the next step, but mark final step if this is the last one
    if (step === steps.length) {
      setIsFinalStep(true);
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };
  useEffect(() => {
    if (isFinalStep) {
      handleSubmit(); // Trigger form submission after the final step
    }
  }, [isFinalStep]); // Trigger form submission only when isFinalStep is true
  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const projectDataToCreate = {
        ...projectData,
        tokenMetrics: projectData.tokenMetrics.map((metric) => ({
          ...metric,
          round: metric.round as ProjectRound, // Cast the round property to ProjectRound
          tgeUnlock: metric.tgeUnlock,
        })),
      };
      console.log("projectDataToCreate", projectDataToCreate);
      await createProject(projectDataToCreate);
      // await createProject(projectData);
      router.push("/dashboard");
    } catch (error) {
      console.error("Project creation error:", error);
      setError(
        "An error occurred while creating the project. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl min-h-screen mx-auto mt-10 px-4">
      <div className="mb-8">
        <StepIndicator currentStep={step} steps={steps} />
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {CurrentStepComponent && (
          <CurrentStepComponent
            onComplete={(data) => handleStepComplete(data)}
            initialData={
              step === 1
                ? (projectData.info as any)
                : step === 2
                ? projectData.tokenMetrics
                : step === 3
                ? projectData.deals
                : step === 4
                ? (projectData.teamAndAdvisors as TeamMember[])
                : step === 5
                ? (projectData.partnersAndInvestors as Partner[])
                : step === 6
                ? projectData.projectSocials
                : undefined
            }
          />
        )}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {isLoading && <p className="text-indigo-600">Creating Project...</p>}
      </div>
    </div>
  );
};

export default ProjectCreationForm;
