import { postResultNiveauFinal } from "@/api/Result"
import { TOAST_TYPE } from "@/constants/ToastType"
import { ResultNiveauSearch } from "@/types/Note"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"

export const usePostResultNiveauFinal = () => {
    const mutation = useMutation({
        mutationFn: (data: ResultNiveauSearch) => postResultNiveauFinal(data),
        onError: () => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la reuperation des resultats !"
            })
        }
    })

    return mutation;
}