import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ProjectDetails {
  project: {
    name: string;
    description: string;

    categories: string[];
    tokensReceived: string;
  };
  tokenMetrics: {
    round: string;
    fdv: string;
    price: string;
    tgeUnlock: number;
    tge: string;
    tgeSummary: string;
  };
  deals: {
    maximum: number;
    minimum: number;
    acceptedTokens: string;
    poolFee: number;
    startDate: string;
    endDate: string;
  };
  projectSocials: {
    medium?: string;
    discord?: string;
    x?: string;
    telegram?: string;
    youtube?: string;
    website?: string;
  };
  // socailLinks: {
  //   medium?: string;
  //   discord?: string;
  //   x?: string;
  //   telegram?: string;
  //   youtube?: string;
  //   website?: string;
  // };
  teamAndAdvisors: Array<{
    name: string;
    title: string;
    description: string;
    logoBase64?: string;
  }>;
  partnersAndInvestors: Array<{
    name: string;
    logoBase64: string;
  }>;
}

const getProjectDetails = async (
  projectId: string
): Promise<ApiResponse<ProjectDetails>> => {
  try {
    const res = await api.get(`/api/project/${projectId}`);
    console.log(res.data, "ALL DETAILS DATA");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const useProjectDetails = (projectId: string) => {
  return useQuery({
    queryKey: ["projectDetails"],
    queryFn: () => getProjectDetails(projectId),
  });
};
