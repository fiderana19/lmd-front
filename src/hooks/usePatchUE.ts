import { patchUE } from "@/api/UE"
import { TOAST_TYPE } from "@/constants/ToastType"
import { EditUEType } from "@/types/UE"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"

export const usePatchUE = ({action}: {action?: () => void}) => {
    const mutation = useMutation({
        mutationFn: (data: EditUEType) => patchUE(data),
        onSuccess: () => {
            if(action) {
                action()
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Unité d'enseignement modifié !"
            })
        },
        onError: () => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la modification de l'unité d'enseignement !"
            })
        }
    })

    return mutation;
}