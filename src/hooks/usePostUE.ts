import { postUE } from "@/api/UE";
import { TOAST_TYPE } from "@/constants/ToastType";
import { CreateUEType } from "@/types/UE";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query";

export const usePostUE = ({ action }: { action?: () => void }) => {
  const mutation = useMutation({
    mutationFn: (data: CreateUEType) => postUE(data),
    onSuccess: () => {
      if (action) {
        action();
      }
      showToast({
        type: TOAST_TYPE.SUCCESS,
        message: "Unité d'enseignement ajouté !",
      });
    },
    onError: () => {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de l'ajout de l'unité d'enseignement !",
      });
    },
  });

  return mutation;
};
