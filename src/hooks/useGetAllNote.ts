import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { QueryCacheKey } from "../api/QueryCacheKey";
import { showToast } from "../utils/Toast";
import { TOAST_TYPE } from "../constants/ToastType";
import { getAllNote } from "@/api/Note";

export const useGetAllNote = () => {
  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: [QueryCacheKey.NOTE],
    queryFn: () => getAllNote(),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError) {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la récuperation des notes !",
      });
    }
  }, [error]);

  return {
    data: data?.data,
    isLoading,
    refetch,
  };
};
