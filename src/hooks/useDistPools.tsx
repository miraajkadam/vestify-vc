import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const getDistPools = async (projectId: string) => {
  try {
    const res = await api.get(`/api/project/${projectId}/distPools`);
    return res.data;
  } catch (error) {
    console.error("Error getting distribution pools:", error);
    throw error;
  }
};

export const useDistPools = (projectId: string) => {
  return useQuery({
    queryKey: ["dist-pools"],
    queryFn: async () => {
      return getDistPools(projectId);
    },
  });
};
