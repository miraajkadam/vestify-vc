import { api } from "@/lib/api";
import Cookies from "js-cookie";

import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  round: string;
}

interface GetVCProjectsResponse {
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

const getVCProfile = async (): Promise<ApiResponse<GetVCProjectsResponse>> => {
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

export const useVCProfileData = () => {
  return useQuery({
    queryKey: ["profile-data"],
    queryFn: async () => {
      return getVCProfile();
    },
  });
};
