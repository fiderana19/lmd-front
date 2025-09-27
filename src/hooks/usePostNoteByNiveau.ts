import { postNoteByNiveau } from "@/api/Note";
import { TOAST_TYPE } from "@/constants/ToastType";
import { NoteByNiveau } from "@/types/Note";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query";

export const usePostNoteByNiveau = () => {
  const mutation = useMutation({
    mutationFn: (data: NoteByNiveau) => postNoteByNiveau(data),
    onError: () => {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la reuperation des notes !",
      });
    },
  });

  return mutation;
};
