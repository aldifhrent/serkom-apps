import { useMutation } from '@tanstack/react-query';

import { Beasiswa } from '@prisma/client';
import { axiosInstance } from '@/lib/axios';
import { toast } from 'sonner';

export const useEditDashboard = () => {
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: Partial<Beasiswa> }) => {
      const response = await axiosInstance.patch<Beasiswa>(`/api/beasiswa/${id}`, body);
      return response
    },
    onError: (error) => {
      toast.error(error.message)
    }
  });
};
