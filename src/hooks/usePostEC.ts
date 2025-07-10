import { postEC } from "@/api/EC"
import { TOAST_TYPE } from "@/constants/ToastType"
import { CreateEC } from "@/types/EC"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"

export const usePostEC = ({action}: {action?: () => void}) => {
    
    const mutation = useMutation({
        mutationFn: (data: CreateEC) => postEC(data),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Element constitutif ajouté !"
            })
        },
        onError: () => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de l'ajout de l'element constitutif !"
            })
        }
    })

    return mutation;
}