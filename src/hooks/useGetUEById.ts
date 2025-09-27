import { QueryCacheKey } from "@/api/QueryCacheKey";
import { getUEById } from "@/api/UE";
import { TOAST_TYPE } from "@/constants/ToastType";
import { showToast } from "@/utils/Toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useGetUEById = (id: number) => {
  const { data, isError, error, refetch, isLoading } = useQuery({
    queryKey: [QueryCacheKey.UE, id],
    queryFn: () => getUEById(id),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError) {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la récuperation de l'unité d'enseignement !",
      });
    }
  }, [error]);

  return {
    data: data?.data,
    isLoading,
    refetch,
  };
};
