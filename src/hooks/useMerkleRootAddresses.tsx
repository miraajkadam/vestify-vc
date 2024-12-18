import { useQuery } from "@tanstack/react-query";

import Cookies from "js-cookie";

import { jwtDecode } from "jwt-decode";
import { api } from "@/lib/api";
import { generateMerkleRoot } from "@/utils/merkleRoot";

interface DecodedToken {
  user: {
    id: string;
  };
  iat: number;
}
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
interface GetSubscribedUserResponse {
  success: boolean;
  message: string;
  data: string[];
}

const getSubscribedUsers = async () => {
  try {
    const token = Cookies.get("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const decodedToken = jwtDecode<DecodedToken>(token);
    const vcId = decodedToken.user.id;

    const response = await api.get<ApiResponse<GetSubscribedUserResponse>>(
      `/api/vc/${vcId}/subscribers`
    );

    // const wallets = generateMerkleRoot(response.data.data.data);
    const wallets = generateMerkleRoot([
      "0x5e2c12098f76e5437d8304b3fa35b2d5297a2596",
    ]);
    return wallets;
  } catch (err) {
    throw err;
  }
};

export const useMerkleRootWallets = () => {
  return useQuery({
    queryKey: ["subscribed-users"],
    queryFn: async () => {
      return getSubscribedUsers();
    },
  });
};
