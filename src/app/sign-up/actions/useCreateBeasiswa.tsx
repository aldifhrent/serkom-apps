import { axiosInstance } from "@/lib/axios";
import { Beasiswa } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { toast } from "sonner";
export const useCreateBeasiswa = () => {
  return useMutation({
    mutationFn: async (body: any) => {
      const response: AxiosResponse<Beasiswa> = await axiosInstance.post(
        `/api/beasiswa`,
        body,
      );
      return response.data;
    },
    onError: (error) => {
      console.error("Error creating beasiswa:", error);
      toast.error(error.message);
    },
  });
};
