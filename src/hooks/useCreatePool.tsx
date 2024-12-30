import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
interface PoolData {
  name: string;
  addresses: string[];
  fee?: number;
  maxAllocation?: number;
  minAllocation?: number;
  projectId: string;
}

const addPools = async (payload: PoolData) => {
  try {
    const res = await api.post(`/api/project/addPool`, payload);
    console.log(res);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const useAddPools = () => {
  return useMutation({
    mutationFn: addPools,
  });
};
