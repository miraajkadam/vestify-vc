import { api } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";

type BatchProps = {
  projectId: string;
  payload: any;
};

const addSchedulingBatches = async ({ projectId, payload }: BatchProps) => {
  try {
    const res = await api.post(
      `/api/project/${projectId}/addVestingSchedule`,
      payload
    );
    console.log(res, "RESPONSE");
  } catch (err) {
    throw err;
  }
};

export const useAddSchedulingBatch = () => {
  return useMutation({
    mutationFn: addSchedulingBatches,
  });
};
