import { getECById } from "@/api/EC";
import { QueryCacheKey } from "@/api/QueryCacheKey";
import { TOAST_TYPE } from "@/constants/ToastType";
import { showToast } from "@/utils/Toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useGetECById = (id: number) => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: [QueryCacheKey.EC, id],
    queryFn: () => getECById(id),
    staleTime: Infinity,
    enabled: id !== 0,
  });

  useEffect(() => {
    if (isError) {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la récuperation de l'element !",
      });
    }
  }, [error]);

  return {
    data: data?.data,
    isLoading,
  };
};
