import { postNote } from "@/api/Note"
import { TOAST_TYPE } from "@/constants/ToastType"
import { CreateNote } from "@/types/Note"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"

export const usePostNote = ({action}: {action?: () => void}) => {
    const mutation = useMutation({
        mutationFn: (data: CreateNote) => postNote(data),
        onSuccess: () => {
            if(action) {
                action()
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Note ajouté !"
            })
        },
        onError: () => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de l'ajout du note !"
            })
        }
    })

    return mutation;
}