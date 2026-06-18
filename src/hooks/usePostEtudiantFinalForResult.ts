import { postEtudiantFinalForResult } from "@/api/Result";
import { TOAST_TYPE } from "@/constants/ToastType";
import { NoteEtudiantSearch } from "@/types/Note";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query";

export const usePostEtudiantFinalForResult = () => {
  const mutation = useMutation({
    mutationFn: (data: NoteEtudiantSearch) => postEtudiantFinalForResult(data),
    onError: () => {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la reuperation des resultats !",
      });
    },
  });

  return mutation;
};
