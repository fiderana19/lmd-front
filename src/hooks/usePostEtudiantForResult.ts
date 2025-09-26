import { postEtudiantForResult } from "@/api/Result"
import { TOAST_TYPE } from "@/constants/ToastType"
import { NoteEtudiantSearch } from "@/types/Note"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"

export const usePostEtudiantForResult = () => {
    const mutation = useMutation({
        mutationFn: (data: NoteEtudiantSearch) => postEtudiantForResult(data),
        onError: () => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la reuperation des resultats !"
            })
        }
    })

    return mutation;
}