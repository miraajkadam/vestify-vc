import { api } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";

const getDistPoolDetails = async (distPoolId: string) => {
  try {
    // const res = await api.get(`/api/project/distpool/${distPoolId}/details`);
    const res = await api.get(
      `/api/project/distpool/594dd71c-e071-4bd5-986d-9eb609d3cf27/details`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

// export const useDistPoolDetails = (poolId: string) => {
//   return useMutation((poolId:string)=>getDistPoolDetails(poolId))
// };

export const useDistPoolDetails = () => {
  return useMutation({
    mutationFn: (poolId: string) => getDistPoolDetails(poolId),
  });
};
