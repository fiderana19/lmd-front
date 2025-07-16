import { patchEtudiant } from "@/api/Etudiant"
import { TOAST_TYPE } from "@/constants/ToastType"
import { EditEtudiantType } from "@/types/Etudiant"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"

export const usePatchEtudiant = ({action} : {action?: () => void}) => {
    const mutation = useMutation({
        mutationFn: (data: EditEtudiantType) => patchEtudiant(data),
        onSuccess: () => {
            if(action) {
                action()
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Etudiant modifié !"
            })
        },
        onError: () => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la modification de l'etudiant !"
            })
        }
    })

    return mutation;
}