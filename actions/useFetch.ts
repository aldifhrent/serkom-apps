'use client'

import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetch = () => {
  return useQuery({
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/api/beasiswa");

        return response.data;

      } catch (error) {
        console.log(error)
      }
    },
    queryKey: ['fetch'],
    refetchInterval: 5000,
  });
};
