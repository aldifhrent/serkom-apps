import { useMutation } from "@tanstack/react-query";

import { Beasiswa } from "@prisma/client";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
export const useDeleteBeasiswa = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete<Beasiswa>(
        `/api/beasiswa/${id}`,
      );
      return response.data;
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};
