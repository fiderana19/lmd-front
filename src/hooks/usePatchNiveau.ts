import { patchNiveau } from "@/api/Niveau"
import { TOAST_TYPE } from "@/constants/ToastType"
import { EditNiveauType } from "@/types/Niveau"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"

export const usePatchNiveau = ({action}: {action?: () => void}) => {
    const mutation = useMutation({
        mutationFn: (data: EditNiveauType) => patchNiveau(data),
        onSuccess: () => {
            if(action) {
                action()
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Niveau modifié !"
            })
        },
        onError: () => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la modification du niveau !"
            })
        }
    })

    return mutation;
}