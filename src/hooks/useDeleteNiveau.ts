import { deleteNiveau } from "@/api/Niveau";
import { TOAST_TYPE } from "@/constants/ToastType";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query";

export const useDeleteNiveau = ({ action }: { action?: () => void }) => {
  const mutation = useMutation({
    mutationFn: (id: number) => deleteNiveau(id),
    onSuccess: () => {
      if (action) {
        action();
      }
      showToast({
        type: TOAST_TYPE.SUCCESS,
        message: "Niveau supprimé! ",
      });
    },
    onError: () => {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la suppression du niveau !",
      });
    },
  });

  return mutation;
};
