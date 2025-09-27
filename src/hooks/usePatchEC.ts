import { patchEC } from "@/api/EC";
import { TOAST_TYPE } from "@/constants/ToastType";
import { EditECType } from "@/types/EC";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query";

export const usePatchEC = ({ action }: { action: () => void }) => {
  const mutation = useMutation({
    mutationFn: (data: EditECType) => patchEC(data),
    onSuccess: () => {
      if (action) {
        action();
      }
      showToast({
        type: TOAST_TYPE.SUCCESS,
        message: "Element constitutif modifié !",
      });
    },
    onError: () => {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la modification de l'element constitutif !",
      });
    },
  });

  return mutation;
};
