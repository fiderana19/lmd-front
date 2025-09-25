import { patchNote } from "@/api/Note"
import { TOAST_TYPE } from "@/constants/ToastType"
import { EditNote } from "@/types/Note"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"

export const usePatchNote = ({action} : {action?: () => void}) => {
    const mutation = useMutation({
        mutationFn: (data: EditNote) => patchNote(data),
        onSuccess: () => {
            if(action) {
                action()
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Note modifié !"
            })
        },
        onError: () => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la modification du note !"
            })
        }
    })

    return mutation;
}