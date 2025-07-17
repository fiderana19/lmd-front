import { postNiveau } from "@/api/Niveau"
import { TOAST_TYPE } from "@/constants/ToastType"
import { CreateNiveauType } from "@/types/Niveau"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"

export const usePostNiveau = ({action}: {action?: () => void}) => {
    const mutation = useMutation({
        mutationFn: (data: CreateNiveauType) => postNiveau(data),
        onSuccess: () => {
            if(action) {
                action()
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Niveau ajouté !"
            })
        },
        onError: () => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de l'ajout de niveau !"
            })
        }
    })

    return mutation;
}