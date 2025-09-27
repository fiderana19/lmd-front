import { deleteUE } from "@/api/UE";
import { TOAST_TYPE } from "@/constants/ToastType";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query";

export const useDeleteUE = ({ action }: { action?: () => void }) => {
  const mutation = useMutation({
    mutationFn: (id: number) => deleteUE(id),
    onSuccess: () => {
      if (action) {
        action();
      }
      showToast({
        type: TOAST_TYPE.SUCCESS,
        message: "Unité d'enseignement supprimé !",
      });
    },
    onError: () => {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors la suppression de l'unité d'enseignement !",
      });
    },
  });

  return mutation;
};
