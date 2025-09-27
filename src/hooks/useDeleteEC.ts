import { deleteEC } from "@/api/EC";
import { TOAST_TYPE } from "@/constants/ToastType";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query";

export const useDeleteEC = ({ action }: { action?: () => void }) => {
  const mutation = useMutation({
    mutationFn: (id: number) => deleteEC(id),
    onSuccess: () => {
      if (action) {
        action();
      }
      showToast({
        type: TOAST_TYPE.SUCCESS,
        message: "Element constitutif supprimé !",
      });
    },
    onError: () => {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la suppression de l'element constitutif !",
      });
    },
  });

  return mutation;
};
