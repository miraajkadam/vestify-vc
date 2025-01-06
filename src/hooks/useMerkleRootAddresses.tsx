import { useQuery } from "@tanstack/react-query";

import Cookies from "js-cookie";

import { jwtDecode } from "jwt-decode";
import { api } from "@/lib/api";
import { generateMerkleRoot } from "@/utils/merkleRoot";
import crypto from "crypto";

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
    let input = [];
    if (response.data.data.length === 0) {
      input = [`0x${crypto.randomBytes(32).toString("hex")}`];
      // input = [`0x4e01832Ed404e29c161ce48DB40ec64426B2401B`];
    } else {
      input = response.data.data.data;
    }
    console.log(input, "input");
    const wallet = generateMerkleRoot(input);
    return `0x${wallet}`;
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
