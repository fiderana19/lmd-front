import { postEtudiant } from "@/api/Etudiant"
import { TOAST_TYPE } from "@/constants/ToastType"
import { CreateEtudiantType } from "@/types/Etudiant"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"

export const usePostEtudiant = ({action}: {action: () => void}) => {
    const mutation = useMutation({
        mutationFn: (data: CreateEtudiantType) => postEtudiant(data),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Etudiant ajouté !"
            })
        },
        onError: () => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de l'ajout de l'etudiant !"
            })
        }
    })

    return mutation;
}