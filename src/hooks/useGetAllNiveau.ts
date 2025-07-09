import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { QueryCacheKey } from '../api/QueryCacheKey';
import { showToast } from '../utils/Toast';
import { TOAST_TYPE } from '../constants/ToastType';
import { getAllNiveau } from "@/api/Niveau";

export const useGetAllNiveau = () => {
    const { data, isLoading, error, isError, refetch } = useQuery({
        queryKey: [QueryCacheKey.NIVEAU],
        queryFn: () => getAllNiveau(),
        staleTime: Infinity,
    })

    useEffect(() => {
        if(isError) {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la récuperation des niveaux !"
            })
        }
    }, [error])

    return {
        data: data?.data,
        isLoading,
        refetch
    }
}