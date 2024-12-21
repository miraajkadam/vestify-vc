import { api } from "@/lib/api";
import Cookies from "js-cookie";

import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import { FomoDeal, Network } from "fomo-deal-sdk-v1";
import { reset } from "viem/actions";
import { on } from "events";
import { link } from "fs";

interface ApiResponse<T> {
  // success: boolean;
  data: T;
  // message?: string;
}

interface Project {
  projectName: string;
  hardCap: string;
  marketCap: string;
  totalGainers: string;
  raisedAmount: string;
  ongoingClaim: string;
}

interface Social {
  x: string;
  discord: string;
  telegram: string;
  website: string;
}

interface GetVCProjectsResponse {
  success: boolean;
  message: string;
  data: {
    projects: Project; // Array of projects
    vcId: string; // Assuming VC ID is also part of the response
    message: string;
    success: boolean;
    description: string;
    id: string;
    kycDone: boolean;
    logoBase64: string;
    social: Social;
    tags: string[];
    subscriptionFee: string;
  };
}

interface LinkedWallets {
  address: string;
  chain: string;
}

export interface ProjectData {
  vcName: string;
  kycStatus: boolean;
  socialMedia: {
    discord: string;
    x: string;
    telegram: string;
    website: string;
  };
  fundSize: string;
  tags: never[];
  vcId: string;
  lastProjectROI: string;
  averageROI: string;
  subscriptionFee: string;
  description: string;
  project: Project[];
  linkedWallets: LinkedWallets[];
}
// projectCreateds;
interface ProjectDataState {
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

interface SdkProjectResponse {
  projectCreateds: ProjectDataState;
}

interface DecodedToken {
  user: {
    id: string;
  };
  iat: number;
}

const fomoDeal = new FomoDeal();

const getVCProfile = async (): Promise<ApiResponse<ProjectData>> => {
  try {
    const token = Cookies.get("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const decodedToken = jwtDecode<DecodedToken>(token);
    const vcId = decodedToken.user.id;

    // const [pdata, wdata] = await Promise.all([
    //   api.get<ApiResponse<GetVCProjectsResponse>>(`/api/vc/${vcId}/profile`),
    //   api.get(`/api/account/${vcId}/wallets`),
    // ]);

    // console.log(pdata, wdata, "PROMISE ALL");

    const response = await api.get<ApiResponse<GetVCProjectsResponse>>(
      `/api/vc/${vcId}/profile`
    );

    const {
      description,
      subscriptionFee,
      kycDone,
      social,
      tags,
      vcId: vc_Id,
    } = response.data.data;

    const { discord, telegram, website, x } = social;

    const projects = await fomoDeal.getAllProjects(Network.ETHEREUM);

    const vcprojects = projects?.projectCreateds?.map((item: Project) => {
      return {
        projectName: item.projectName,
        pledgeAmt: item.hardCap,
        marketCap: "",
        topGainers: "",
        raisedAmt: "",
        ongoingClaim: "",
        vcId: vc_Id,
      };
    });

    // const { hardCap, projectName } = projects.

    const projectData = {
      vcName: "",
      kycStatus: kycDone,
      socialMedia: {
        discord: discord,
        x: x,
        telegram: telegram,
        website: website,
      },
      fundSize: "", //sum of all the Raised AMT
      tags: [],
      vcId: vc_Id,
      lastProjectROI: "", //backend job
      averageROI: "", //backend job
      subscriptionFee: subscriptionFee,
      description: description,
      projectName: "",
      project: vcprojects,
      linkedWallets: [
        { address: "0x5e2c12098f76e5437d8304b3fa35b2d5297a2596", chain: "ETH" },
      ],
    };

    return { data: projectData };
    // return response.data;
  } catch (error) {
    console.error("Error fetching VC profile:", error);
    throw error;
  }
};

export const useVCProfileData = () => {
  return useQuery({
    queryKey: ["profile-data"],
    queryFn: async () => {
      return getVCProfile();
    },
  });
};
