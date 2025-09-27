import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { QueryCacheKey } from "../api/QueryCacheKey";
import { showToast } from "../utils/Toast";
import { TOAST_TYPE } from "../constants/ToastType";
import { getAllEtudiant } from "@/api/Etudiant";

export const useGetAllEtudiant = () => {
  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: [QueryCacheKey.ETUDIANT],
    queryFn: () => getAllEtudiant(),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError) {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la récuperation des etudiants !",
      });
    }
  }, [error]);

  return {
    data: data?.data,
    isLoading,
    refetch,
  };
};
