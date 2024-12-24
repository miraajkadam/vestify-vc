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
  round: ProjectRound;
  fdv: string;
  price: string;
  tgeUnlock: number;
  tge: string;
  tgeSummary: string;
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
  tokenMetrics: TokenMetrics[];
  deals: Deals;
  teamAndAdvisors: TeamMember[];
  partnersAndInvestors: Partner[];
  projectSocials: ProjectSocials;
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
  data: Omit<ProjectData, "info"> & { info: Omit<ProjectInfo, "vcId"> }
): Promise<AxiosResponse<ApiResponse<{ project: ProjectData }>>> => {
  const token = Cookies.get("access_token");
  if (!token) {
    throw new Error("No access token found");
  }

  const decodedToken = jwtDecode<DecodedToken>(token);
  const vcId = decodedToken.user.id;

  const projectData: ProjectData = {
    ...data,
    info: {
      ...data.info,
      vcId,
    },
  };
  console.log(projectData);

  return api.post<ApiResponse<{ project: ProjectData }>>(
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
