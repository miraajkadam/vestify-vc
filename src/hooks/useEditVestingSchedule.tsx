import { api } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";

type BatchProps = {
  projectId: string;
  payload: any;
};

const editSchedulingBatches = async ({ projectId, payload }: BatchProps) => {
  try {
    const res = await api.put(
      `/api/project/${projectId}/editVestingSchedule`,
      payload
    );
    console.log(res, "RESPONSE");
  } catch (err) {
    throw err;
  }
};

export const useEditSchedulingBatch = () => {
  return useMutation({
    mutationFn: editSchedulingBatches,
  });
};
