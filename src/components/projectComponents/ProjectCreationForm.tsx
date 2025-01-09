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
import { any, string } from "zod";
import { TeamMember, Partner, ProjectRound } from "@/lib/api";
import Chains from "./Chains";
import {
  FomoDeal,
  Network,
  EthereumOptions,
  ProjectParams,
  SolanaOptions,
} from "fomo-deal-sdk-v1";
import { ethers } from "ethers";
import WalletConnection from "./WalletConnection";
import { useWalletInfo } from "@/store/walletContext";
import { useMerkleRootWallets } from "@/hooks/useMerkleRootAddresses";
import { Config, useConnectorClient } from "wagmi";

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
    projectToken: string;
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
  projectWallet: {
    chain: string | undefined;
    walletAddress?: `0x${string}` | undefined;
    fundWalletAddress: string;
  };
};

const ProjectCreationForm: React.FC<{
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ step, setStep }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFinalStep, setIsFinalStep] = useState(false);
  const { data: merkleRootWallets } = useMerkleRootWallets();
  console.log(merkleRootWallets, "merkleRootWallets");
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
    projectWallet: {
      chain: "",
      walletAddress: `0x${""}`,
      fundWalletAddress: "",
    },
  });

  const router = useRouter();

  const steps = [
    { name: "Basic Information", component: BasicInformation },
    { name: "Token Metrics", component: TokenMetrics },
    { name: "Our Deals", component: OurDeals },
    { name: "Team & Advisors", component: TeamAndAdvisors },
    { name: "Partners & Investors", component: PartnersAndInvestors },
    { name: "Socials", component: Socials },
    { name: "ConnectWallet", component: WalletConnection },
  ];

  const fomoDeal = new FomoDeal();
  const CurrentStepComponent = steps[step - 1].component;

  const getTokens = async () => {
    const tokens = await fomoDeal.getSupportedTokens(Network.ETHEREUM);
    console.log(tokens, "TOKENS");
  };
  getTokens();

  const createProjectSDK = async (
    chain: string | undefined,
    projectData: ProjectParams
  ) => {
    const network = chain === "EVM" ? Network.ETHEREUM : Network.SOLANA;
    const signer = new ethers.BrowserProvider(window.ethereum);

    let options = {
      ethereum: {
        provider: signer,
      },
    }; // TODO : need to check
    const sdkData = await fomoDeal.createOrUpdateProject(
      network,
      options,
      projectData
    );
    return sdkData;
  };

  const handleStepComplete = (stepData: Partial<ProjectDataState>) => {
    console.log("Step Data received in handleStepComplete:", stepData);
    // setProjectData((prev) => ({ ...prev, ...stepData }));
    setProjectData((prev) => {
      const updatedData = { ...prev, ...stepData };
      console.log("Updated Project Data:", updatedData);
      return updatedData;
    });
    // handleSubmit();

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

  const addProject = async (
    projectData: ProjectDataState,
    projectID: string
  ) => {
    try {
      console.log(" project data:", projectData);
      const response = await createProject(projectData, projectID);
      console.log("Project created:", response);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating project:", error);
      setError(
        "An error occurred while creating the project. Please try again."
      );
    } finally {
      setIsLoading(false);
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
      console.log("projectDataToCreate");
      // await createProject(projectDataToCreate);
      const projectDataParams: ProjectParams = {
        projectName: projectData.info.name,
        poolFee: projectData.deals.poolFee,
        price: Number(projectData.tokenMetrics[0].price),
        minAllocation: projectData.deals.minimum,
        maxAllocation: projectData.deals.maximum,
        vcAddress: `${projectData.projectWallet.walletAddress}`, //connected wallet
        fundWallet: projectData.projectWallet.fundWalletAddress,
        hardCap: 1000000000000000, // TODO : need to check [maximum raising amt]
        merkleRoot: merkleRootWallets as string,
        startTime: new Date(projectData.deals.startDate).getTime(), //[epoc timestamp ]
        endTime: new Date(projectData.deals.endDate).getTime(),
        paymentTokenAddresses: ["0x6C3DfEC39a45F2673AABdCe2290A1F33A027597C"], // TODO : need to check
        projectToken: projectData.tokenMetrics[0].projectToken, // TODO : need to check  token address
        projectCount: 0, // TODO : need to check //depends on project status [new=>0,existing one =>increment counter will get from SDK ]
      };
      console.log(projectDataParams, "projectDataParams");
      const sdkData = createProjectSDK(
        projectData?.projectWallet?.chain,
        projectDataParams
      );

      const data = await sdkData;
      console.log(data, "data");
      addProject(projectDataToCreate, data);
      // router.push("/dashboard");
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
                : step === 7
                ? projectData.projectWallet
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
