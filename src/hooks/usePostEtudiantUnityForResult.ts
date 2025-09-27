import { postEtudiantUnityForResult } from "@/api/Result";
import { TOAST_TYPE } from "@/constants/ToastType";
import { NoteEtudiantSearch } from "@/types/Note";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query";

export const usePostEtudiantUnityForResult = () => {
  const mutation = useMutation({
    mutationFn: (data: NoteEtudiantSearch) => postEtudiantUnityForResult(data),
    onError: () => {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la reuperation des resultats !",
      });
    },
  });

  return mutation;
};
