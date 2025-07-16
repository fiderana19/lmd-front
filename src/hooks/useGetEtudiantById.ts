import { getEtudiantById } from "@/api/Etudiant"
import { QueryCacheKey } from "@/api/QueryCacheKey"
import { TOAST_TYPE } from "@/constants/ToastType"
import { showToast } from "@/utils/Toast"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export const useGetEtudiantById = (id: number) => {
    const { data, error, isError, refetch, isLoading } = useQuery({
        queryKey: [QueryCacheKey.ETUDIANT, id],
        queryFn: () => getEtudiantById(id),
        staleTime: Infinity
    })

    useEffect(() => {
        if(isError) {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la recuperation de l'etudiant !"
            })
        }
    }, [error])

    return {
        data: data?.data,
        refetch,
        isLoading
    }
}