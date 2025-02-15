import { ProjectDataState } from "@/components/projectComponents/ProjectCreationForm";
import { TeamAndAdvisor } from "@/components/projectid/types";
import { httpClientRequest } from "@/utils/axios-utils";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { url } from "inspector";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface SignUpData {
  username: string;
  email: string;
  password: string;
  accountType: string;
}

interface VCData {
  id: string;
  name: string;
  description: string;
  logoBase64: string;
  subscriptionFee: number;
  tags: string[];
  kycDone: boolean;
  socials: {
    x?: string;
    instagram?: string;
    discord?: string;
    telegram?: string;
    medium?: string;
    youtube?: string;
  };
}

export type ProjectRound =
  | "PRE SEED"
  | "SEED"
  | "PRIVATE 1"
  | "PRIVATE 2"
  | "PRIVATE 3"
  | "PUBLIC";

export interface ProjectInfo {
  name: string;
  categories: string[];
  description: string;
  vcId: string;
}

export interface TokenMetrics {
  round?: ProjectRound;
  fdv: string;
  price: string;
  tgeUnlock: number;
  tge: string;
  tgeSummary?: string;
  lockupPeriod?: number;
  releaseType?: string;
  releaseMonths?: number;
}

export interface TokenMetricsV2 {
  round?: string;
  fdv: string;
  price: string;
  tgeUnlock: number;
  tge: string;
  lockupPeriod?: number;
  releaseType?: string;
  releaseMonths?: number;
  raisedAmt: number;
  noOfMonths: number,
  projectTokenTicker: string,
}

export interface PastProjectTokenMetric {
  round: string;
  price: number;
  lockupPeriod?: number;
  releaseType?: string;
  releaseMonths?: number;
}

export interface CurProjectTokenMetric {
  round?: string;
  price: number;
  tgeUnlock: number;
  tge: string;
  lockupPeriod?: number;
  releaseType?: string;
  releaseMonths?: number;
  fdv: number;
  noOfMonths?: number,
  raisedAmt?: number,
  projectTokenTicker?: string,
}

export interface Deals {
  maximum: number;
  minimum: number;
  acceptedTokens: string;
  poolFee: number;
  startDate: string;
  endDate: string;
}

export interface TeamMember {
  name: string;
  title: string;
  description: string;
  imgBase64?: string;
}

export interface RoundDetails {
  maximum: number;
  minimum: number;
  acceptedTokens: string;
  poolFee: number;
  startDate: string;
  endDate: string;
  raiseAmount: number;
  tokenTicker: string;
}

export interface Partner {
  name: string;
  logoBase64: string | null;
}

export interface ProjectSocials {
  x?: string;
  website?: string;
  discord?: string;
  telegram?: string;
  medium?: string;
  youtube?: string;
}

export interface ProjectData {
  info: ProjectInfo;
  tokenMetrics: TokenMetricsV2[];
  deals: Deals;
  teamAndAdvisors: TeamMember[];
  partnersAndInvestors: Partner[];
  projectSocials: ProjectSocials;
  projectWallet: projectWallet;
  onChain: onChain;
}

export interface ProjectDataV2 {
  info: ProjectInfo;
  curProjTokenMetrics: CurProjectTokenMetric;
  pastProjTokenMetrics: PastProjectTokenMetric[];
  roundDetails: RoundDetails;
  teamAndAdvisors: TeamAndAdvisor[];
  partnersAndInvestors: Partner[];
  projectSocials: ProjectSocials;
  projectWallet: projectWallet;
  onChain: onChain;
}

interface projectWallet {
  chain: string | undefined;
  walletAddress?: string | undefined;
}

interface onChain {
  projectId: string;
}
export interface VCProfile {
  name: string;
  description: string;
  logoBase64: string;
  subscriptionFee: string;
  tags: string[];
  kycDone: boolean;
  fundSize: string;

  projects: {
    id: string;
    name: string;
    pledgeAmount: string;
    marketCap: string;
    topGainer: string;
    raisedAmount: string;
    ongoingClaim: number;
  }[];
  // projects: Project[];
}

// Assuming the response includes a `projects` field

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface CreateVCResponse {
  vcId: string;
}

export interface GetVCProjectsResponse {
  success: boolean;
  message: string;
  data: {
    projects: Project[]; // Array of projects
    vcId: string; // Assuming VC ID is also part of the response
    message: string;
    success: boolean;
  };
}

interface DecodedToken {
  user: {
    id: string;
  };
  iat: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  round: string;
}

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      throw new Error(error.response.data.message || "An error occurred");
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error("Error setting up request");
    }
  }
);

export const signUp = async (
  data: SignUpData
): Promise<ApiResponse<{ access_token: string }>> => {
  const response = await api.post<ApiResponse<{ access_token: string }>>(
    "api/auth/signup",
    data
  );
  return response.data;
};

export const createVC = async (
  data: VCData
): Promise<ApiResponse<CreateVCResponse>> => {
  try {
    const response = await api.post<ApiResponse<CreateVCResponse>>(
      "/api/vc/new",
      data
    );

    return response.data;
  } catch (error) {
    console.error("Error in createVC API call:", error);
    throw error;
  }
};

export const createProject = async (
  data: Omit<ProjectData, "info" | "onChain"> & {
    info: Omit<ProjectInfo, "vcId">;
  },
  projectId: string
): Promise<AxiosResponse<ApiResponse<{ project: ProjectDataState }>>> => {
  const token = Cookies.get("access_token");
  if (!token) {
    throw new Error("No access token found");
  }

  const decodedToken = jwtDecode<DecodedToken>(token);
  const vcId = decodedToken.user.id;
  console.log(" create project api raw data", data);
  let curProjTokenMetrics: CurProjectTokenMetric = {
    round: data.tokenMetrics[0].round,
    price: +data.tokenMetrics[0].price,
    tgeUnlock: data.tokenMetrics[0].tgeUnlock,
    tge: data.tokenMetrics[0].tge,
    fdv:  1000000000,
    lockupPeriod: Number(data.tokenMetrics[0].lockupPeriod),
    releaseType: data.tokenMetrics[0].releaseType,
    releaseMonths: Number(data.tokenMetrics[0].noOfMonths) || 1,
    // noOfMonths: Number(data.tokenMetrics[0].noOfMonths),
    // raisedAmt: Number(data.tokenMetrics[0].raisedAmt),
    // projectTokenTicker: data.tokenMetrics[0].projectTokenTicker,
  };
  const projectData: ProjectDataV2 = {
    info: {
      ...data.info,
      vcId,
    },
    curProjTokenMetrics: curProjTokenMetrics,
    pastProjTokenMetrics: [
      {
        round: data.tokenMetrics[0].round || "PRIVATE_3",
        price: +data.tokenMetrics[0].price,
      },
    ],
    roundDetails: {
      maximum: data.deals.maximum,
      minimum: data.deals.minimum,
      acceptedTokens: data.deals.acceptedTokens || "0x6C3DfEC39a45F2673AABdCe2290A1F33A027597C",
      poolFee: data.deals.poolFee,
      startDate: data.deals.startDate,
      endDate: data.deals.endDate,
      raiseAmount: data.tokenMetrics[0].raisedAmt,
      tokenTicker: data.info.name.toUpperCase(),
    },
    teamAndAdvisors: data.teamAndAdvisors,
    partnersAndInvestors: [
      {
        logoBase64: "b21hZSB3YSBtb3Ugc2hpbmRlaXJ1",
        name: "Venture Capital Inc.",
      },
    ],
    projectSocials: data.projectSocials,
    projectWallet: {
      chain: data.projectWallet.chain,
      walletAddress: data.projectWallet.walletAddress,
    },
    onChain: {
      projectId: projectId,
    },
  };
  let releaseMonths = Number(data.tokenMetrics[0].noOfMonths) || 1;
  let lockupPeriod = Number(data.tokenMetrics[0].lockupPeriod);
  let releaseType = data.tokenMetrics[0].releaseType;

  projectData.curProjTokenMetrics.releaseMonths = releaseMonths;
  projectData.curProjTokenMetrics.lockupPeriod = lockupPeriod;
  projectData.curProjTokenMetrics.releaseType = releaseType;

  projectData.pastProjTokenMetrics[0].releaseMonths = releaseMonths;
  projectData.pastProjTokenMetrics[0].lockupPeriod = lockupPeriod;
  projectData.pastProjTokenMetrics[0].releaseType = releaseType;

  projectData.projectSocials.discord =  data.projectSocials.discord || "https://discord.gg/project_invite",
  projectData.projectSocials.telegram = data.projectSocials.telegram || "https://t.me/project_channel",
  projectData.projectSocials.medium = data.projectSocials.medium || "https://medium.com/@project_blog",
  projectData.projectSocials.website = data.projectSocials.website || "https://www.example.com",

  projectData.teamAndAdvisors[0].imgBase64 = "b21hZSB3YSBtb3Ugc2hpbmRlaXJ1";

  const projectDatev2 = {
    info: {
      name: "Bitcoin",
      categories: ["Tech", "DEFI", "Crypto"],
      description:
        "Bitcoin is a leading cryptocurrency with significant market potential.",
      vcId: "1c30cc8e-ad15-480e-9593-82a3a8ecc82c",
    },
    curProjTokenMetrics: {
      round: "SEED",
      price: 1.23,
      tgeUnlock: 60,
      tge: "2024-08-28T12:20:13.264Z",
      lockupPeriod: 180,
      releaseType: "QUARTERLY",
      releaseMonths: 3,
      fdv: 1000000000,
    },
    pastProjTokenMetrics: [
      {
        price: 1.23,
        lockupPeriod: 180,
        releaseMonths: 3,
        releaseType: "QUARTERLY",
        round: "PRIVATE_3",
      },
    ],
    roundDetails: {
      maximum: 2000.5,
      minimum: 1000,
      acceptedTokens: "BTC",
      poolFee: 2.5,
      startDate: "2024-08-18T12:20:13.264Z",
      endDate: "2024-08-28T12:20:13.264Z",
      raiseAmount: 123123123123,
      tokenTicker: "FOMO",
    },
    teamAndAdvisors: [
      {
        description:
          "Experienced advisor with a background in blockchain technology.",
        name: "Alice Johnson",
        title: "Blockchain Specialist",
        imgBase64: "b21hZSB3YSBtb3Ugc2hpbmRlaXJ1",
      },
    ],
    partnersAndInvestors: [
      {
        logoBase64: "b21hZSB3YSBtb3Ugc2hpbmRlaXJ1",
        name: "Venture Capital Inc.",
      },
    ],
    projectSocials: {
      x: "https://x.com/project_handle",
      discord: "https://discord.gg/project_invite",
      telegram: "https://t.me/project_channel",
      medium: "https://medium.com/@project_blog",
      website: "https://www.example.com",
    },
    projectWallet: {
      chain: "EVM",
      walletAddress: "0x32Be343B94f860124dC4fEe278FDCBD38C102D88",
    },
    onChain: {
      projectId: "bdcdfb7e-379e-4d55-8fac-212422f61220",
    },
  };
  console.log(projectData, "projectData for create project api");

  return api.post<ApiResponse<{ project: ProjectDataState }>>(
    "api/project/new",
    projectData
  );
};

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    access_token: string;
  };
}

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("api/auth/login", data);
  return response.data;
};

export const getVCProfile = async (): Promise<
  ApiResponse<GetVCProjectsResponse>
> => {
  try {
    const token = Cookies.get("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const decodedToken = jwtDecode<DecodedToken>(token);
    const vcId = decodedToken.user.id;

    const response = await api.get<ApiResponse<GetVCProjectsResponse>>(
      `/api/vc/${vcId}/profile`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching VC profile:", error);
    throw error;
  }
};

export const logout = async (): Promise<ApiResponse<null>> => {
  try {
    const response = await api.post<ApiResponse<null>>("/api/auth/logout");
    if (response.data.success) {
      Cookies.remove("access_token");
    }
    return response.data;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

export const getVCProjects = async (
  vcId: string
): Promise<GetVCProjectsResponse> => {
  try {
    const response = await api.get<GetVCProjectsResponse>(
      `/api/vc/${vcId}/projects`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching VC projects:", error);
    throw error;
  }
};

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

interface ApiWalletAddResponse {
  success: boolean;
  message: string;
}

export const getProjectDetails = async (
  projectId?: string
): Promise<ApiResponse<ProjectDetails>> => {
  try {
    const response = await api.get<ApiResponse<ProjectDetails>>(
      `/api/project/0xf9492e17a64410373b44a9c8137a0bc7e26700a405d3960342233e1075f74203`
    );
    console.log("response data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching project details:", error);
    throw error; // Rethrow the error to handle it in the calling component
  }
};
