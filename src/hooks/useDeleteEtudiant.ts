import { deleteEtudiant } from "@/api/Etudiant";
import { TOAST_TYPE } from "@/constants/ToastType";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query";

export const useDeleteEtudiant = ({ action }: { action?: () => void }) => {
  const mutation = useMutation({
    mutationFn: (id: number) => deleteEtudiant(id),
    onSuccess: () => {
      if (action) {
        action();
      }
      showToast({
        type: TOAST_TYPE.SUCCESS,
        message: "Etudiant supprimé !",
      });
    },
    onError: () => {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la suppression de l'etudiant !",
      });
    },
  });

  return mutation;
};
