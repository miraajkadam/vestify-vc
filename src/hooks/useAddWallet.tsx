import { api } from "@/lib/api";
import Cookies from "js-cookie";

import { jwtDecode } from "jwt-decode";
import { useMutation } from "@tanstack/react-query";
import { FomoDeal, Network } from "fomo-deal-sdk-v1";

interface DecodedToken {
  user: {
    id: string;
  };
  iat: number;
}

interface AddWalletPayload {
  address?: `0x${string}`;
  chain: string;
}

const registerVCWallet = async (payload: AddWalletPayload) => {
  try {
    const token = Cookies.get("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const decodedToken = jwtDecode<DecodedToken>(token);
    const vcId = decodedToken.user.id;

    const addWalletPayload = {
      ...payload,
      accountId: vcId,
    };
    const res = await api.post(`/api/account/addWallet`, addWalletPayload);

    return res;
  } catch (error) {
    console.error("Error registering VC wallet:", error);
    throw error;
  }
};

export const useAddWallet = () => {
  return useMutation({
    mutationFn: registerVCWallet,
  });
};
