import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useFetchById = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.get(`/api/beasiswa/${id}`);

      return response.data;
    },
  });
};
