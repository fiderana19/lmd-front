import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { QueryCacheKey } from "../api/QueryCacheKey";
import { getAllEC } from "../api/EC";
import { showToast } from "../utils/Toast";
import { TOAST_TYPE } from "../constants/ToastType";

export const useGetAllEC = () => {
  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: [QueryCacheKey.EC],
    queryFn: () => getAllEC(),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError) {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la récuperation des EC !",
      });
    }
  }, [error]);

  return {
    data: data?.data,
    isLoading,
    refetch,
  };
};
