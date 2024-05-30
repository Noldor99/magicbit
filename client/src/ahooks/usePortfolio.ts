import { useQuery } from '@tanstack/react-query'
import { toast } from "@/components/ui/use-toast"
import {
  QueryPortfolioParams,
  apiPortfolio,
} from '@/actions/client/portfolioAction'
import { AxiosError } from 'axios';


interface UseGetPortfolioProps {
  enabled?: boolean;
  params?: QueryPortfolioParams;
}

export const useGetPortfolio = ({ enabled = true, params }: UseGetPortfolioProps) => {
  return useQuery({
    queryKey: ['portfolio', params],
    queryFn: async () => {
      try {
        return await apiPortfolio.getAll(params ?? {});
      } catch (error) {
        const errorMessage =
          ((error as AxiosError)?.response?.data as { message: string })
            ?.message || "Unknown error"

        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        })
        throw error;
      }
    },
    enabled,
  });
};
