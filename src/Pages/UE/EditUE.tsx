import { FunctionComponent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { EditUEType } from "@/types/UE";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditUEValidation } from "@/validation/ue.validation";
import { Input } from "@/components/ui/input";
import { handleNumberKeyPress } from "@/utils/handleKeyPress";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LoadingOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useGetUEById } from "@/hooks/useGetUEById";
import { usePatchUE } from "@/hooks/usePatchUE";
import { useGetAllUE } from "@/hooks/useGetAllUE";
import FormCard from "@/components/shared/FormCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import FormField from "@/components/shared/FormField";

const EditUE: FunctionComponent = () => {
  const req = useParams();
  const UEId = Number(req.id);
  const { data: ue, isLoading, refetch } = useGetUEById(UEId ? UEId : 0);
  const { refetch: refetchUE } = useGetAllUE();
  const { mutateAsync: UEEdit, isPending: patchLoading } = usePatchUE({
    action() { refetchUE(); refetch(); },
  });
  const { handleSubmit: submit, formState: { errors }, control, setValue } = useForm<EditUEType>({
    resolver: yupResolver(EditUEValidation),
  });
  const navigate = useNavigate();

  useEffect(() => { setValue("id_ue", req.id ? req.id : ""); }, [req.id]);

  const editUESubmit = (data: EditUEType) => { UEEdit(data); navigate("/admin/ue"); };

  if (isLoading) return <LoadingSpinner />;

  return (
    <FormCard title="MODIFIER UNITE D'ENSEIGNEMENT">
      {ue && (
        <form onSubmit={submit(editUESubmit)} className="space-y-4">
          <FormField label="Nom de l'UE" name="nom_ue" control={control} error={errors.nom_ue} defaultValue={ue[0].nom_ue}>
            <Input />
          </FormField>
          <FormField label="Crédit de l'UE" name="credit_ue" control={control} error={errors.credit_ue} defaultValue={ue[0].credit_ue}>
            <Input onKeyPress={handleNumberKeyPress} />
          </FormField>
          <div className="flex justify-between pt-2">
            <Button type="button" variant="ghost" onClick={() => navigate("/admin/ue")}>
              <ArrowLeftOutlined className="mr-1" /> Retour
            </Button>
            <Button type="submit" disabled={patchLoading}>
              {patchLoading && <LoadingOutlined className="mr-1" />} MODIFIER
            </Button>
          </div>
        </form>
      )}
    </FormCard>
  );
};

export default EditUE;
