import { api } from "@/lib/api";
import Cookies from "js-cookie";

import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import { FomoDeal, Network } from "fomo-deal-sdk-v1";

interface DecodedToken {
  user: {
    id: string;
  };
  iat: number;
}

interface ApiResponse<T> {
  //   success?: boolean;
  data: T;
  //   message?: string;
}

interface ProjectResponse {
  id: string;
  description: string;
  kycDone: boolean;
  logoBase64: string;
  name: string;
  subscriptionFee: string;
  tags: any[];
  projects: Project[];
  vcId: string;
  social: Social;
}

export interface Project {
  id: string;
  name: string;
}

export interface Social {
  discord: string;
  x: string;
  telegram: string;
  website: string;
}

export interface ProjectedCreated {
  projectCreated: SDKProjects;
}

export interface SDKProjects {
  id: string;
  projectId: string;
  projectName: string;
  vcAddress: string;
  fundWallet: string;
  poolFee: string;
  price: string;
  minAllocation: string;
  maxAllocation: string;
  hardCap: string;
  merkleRoot: string;
  startTime: string;
  endTime: string;
  paymentTokens: string[];
  projectCount: string;
  timestamp: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
}
[];

const fomoDeal = new FomoDeal();

const getVCProjectsById = async (): Promise<any> => {
  try {
    const token = Cookies.get("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const decodedToken = jwtDecode<DecodedToken>(token);
    const vcId = decodedToken.user.id;
    const response = await api.get<ApiResponse<ProjectResponse>>(
      `/api/vc/${vcId}/projects`
    );

    const { id } = response.data.data.projects[0];

    const allIds = response.data.data.projects.map((project) => project.id);
    // console.log("ALL IDS", allIds);

    // console.log("BACKEND PID", response);

    const allData = await Promise.all(
      allIds.map((item) => fomoDeal.getProjectById(Network.ETHEREUM, item))
    );

    // if (allData) {
    //   const allProjects = allData.map((item) => item.projectCreated);
    //   console.log(allProjects, "ALL PROJECTS");

    // }

    // console.log(allData, "ALL DATA");

    // console.log("BACKEND PID", response);

    // const sdkVcProjects: ProjectedCreated = await fomoDeal.getProjectById(
    //   Network.ETHEREUM,
    //   id
    // );

    return allData;
  } catch (error) {
    console.error("Error fetching VC projects:", error);
    throw error;
  }
};

export const useVCProjects = () => {
  return useQuery({
    queryKey: ["vcProjectsById"],
    queryFn: async () => {
      return getVCProjectsById();
    },
  });
};
