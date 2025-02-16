import Cookies from "js-cookie";

import { jwtDecode } from "jwt-decode";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { FomoDeal, Network } from "fomo-deal-sdk-v1";
import { reset } from "viem/actions";
import { on } from "events";
import { link } from "fs";
import { useWalletInfo } from "@/store/walletContext";

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
  address: `0x${string}` | undefined;
  chain: string;
}

export interface ProjectData {
  vcName: string;
  kycDone: boolean;
  id: string;
  social: {
    discord: string;
    x: string;
    telegram: string;
    website: string;
  };
  fundSize: string;
  tags?: any;
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

export interface WalletAPIResponse<T> {
  data: T;
  success: boolean;
  message: string;
}

export interface WalletData {
  address: `0x${string}` | undefined;
  chain: string;
}

interface SDKVCProfileResponse {
  name: string;
  fundSize: number;
  lastProjectROI: number;
  averageROI: number;
  last5ProjectsStats: {
    chain: Network;
    projectName: string;
    pledgeAmount: number;
    marketCap: number;
    topExchanges: string[];
    raisedAmount: number;
    ongoingClaim: number;
  }[];
}

export interface VCProfileData {
  name: string;
  fundSize: number;
  lastProjectROI: number;
  averageROI: number;
  last5ProjectsStats: {
    chain: Network;
    projectName: string;
    pledgeAmount: number;
    marketCap: number;
    topExchanges: string[];
    raisedAmount: number;
    ongoingClaim: number;
  }[];
  kycDone: boolean;
  discord: string;
  social: {
    x: string;
    telegram: string;
    website: string;
  };
  linkedWallets: any;
  vcId: string;
  description: string;
  tags: [];
  subscriptionFee: string;
}

const fomoDeal = new FomoDeal();

const getVCProfile = async (
  walletAdd: `0x${string}`
): Promise<VCProfileData> => {
  // const { connectedWalletAddressInfo } = useWalletInfo();
  // const { walletAdd } = connectedWalletAddressInfo;

  try {
    const token = Cookies.get("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const decodedToken = jwtDecode<DecodedToken>(token);
    const vcId = decodedToken.user.id;

    const [response, walletData] = await Promise.all([
      api.get<ApiResponse<ProjectData>>(`/api/vc/${vcId}/profile`),
      api.get<WalletAPIResponse<WalletData[]>>(`/api/account/${vcId}/wallets`),
    ]);

    const {
      id,
      tags,
      description,
      subscriptionFee,
      kycDone,
      social,
      vcId: vc_Id,
    } = response.data.data;
    console.log(response.data.data, "VC PROFILE DATA");

    const { discord, telegram, website, x } = social;

    const vcProfileData: SDKVCProfileResponse = await fomoDeal.getVCInfo({
      vcAddress: walletAdd,
    });

    const { averageROI, fundSize, last5ProjectsStats, lastProjectROI, name } =
      vcProfileData;

    // const preojectVC = await fomoDeal.getVCInfo({
    //   vcAddress: walletAdd,
    // });

    // console.log(preojectVC, "SDK preojectVC");
    //onChian ID
    // const projectById = await fomoDeal.getProjectById(
    //   Network.ETHEREUM,
    //   "0xf9492e17a64410373b44a9c8137a0bc7e26700a405d3960342233e1075f74203"
    // );
    // console.log(projectById, "PROJECT BY ID");

    // const { hardCap, projectName } = projects.

    // const projectData = {
    //   vcName: "",
    //   id: id,
    //   kycDone: kycDone,
    //   social: {
    //     discord: discord,
    //     x: x,
    //     telegram: telegram,
    //     website: website,
    //   },
    //   fundSize: "", //sum of all the Raised AMT
    //   tags: [],
    //   vcId: vc_Id,
    //   lastProjectROI: "", //backend job
    //   averageROI: "", //backend job
    //   subscriptionFee: subscriptionFee,
    //   description: description,
    //   project: vcprojects,
    //   linkedWallets: walletData?.data?.data,
    // };

    const vcProfile = {
      name,
      averageROI,
      fundSize,
      last5ProjectsStats,
      lastProjectROI,
      kycDone,
      discord: discord,
      social,
      linkedWallets: walletData?.data?.data,
      vcId: vc_Id,
      description,
      tags,
      subscriptionFee,
    };

    return vcProfile;
  } catch (error) {
    console.error("Error fetching VC profile:", error);
    throw error;
  }
};

export const useVCProfileData = (walletAdd: `0x${string}`) => {
  return useQuery({
    queryKey: ["profile-data"],
    queryFn: async () => {
      return getVCProfile(walletAdd);
    },
  });
};
