import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { QueryCacheKey } from '../api/QueryCacheKey';
import { showToast } from '../utils/Toast';
import { TOAST_TYPE } from '../constants/ToastType';
import { getAllAnnee } from "@/api/Annee";

export const useGetAllAnnee = () => {
    const { data, isLoading, error, isError, refetch } = useQuery({
        queryKey: [QueryCacheKey.ANNEE],
        queryFn: () => getAllAnnee(),
        staleTime: Infinity,
    })

    useEffect(() => {
        if(isError) {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la récuperation des années !"
            })
        }
    }, [error])

    return {
        data: data?.data,
        isLoading,
        refetch
    }
}