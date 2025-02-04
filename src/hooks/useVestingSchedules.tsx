import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const getVestingSchedules = async (projectId: string) => {
  try {
    const res = await api.get(`/api/project/${projectId}/getVestingSchedule`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const useVestingSchedules = (projectId: string) => {
  return useQuery({
    queryKey: ["vesting-schedules"],
    queryFn: async () => {
      return getVestingSchedules(projectId);
    },
  });
};
