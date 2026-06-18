import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { CreateUEType } from "@/types/UE";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateUEValidation } from "@/validation/ue.validation";
import { Input } from "@/components/ui/input";
import { handleNumberKeyPress } from "@/utils/handleKeyPress";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LoadingOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { usePostUE } from "@/hooks/usePostUE";
import { useGetAllUE } from "@/hooks/useGetAllUE";
import FormCard from "@/components/shared/FormCard";
import FormField from "@/components/shared/FormField";

const AddUE: FunctionComponent = () => {
  const { refetch: refetchUE } = useGetAllUE();
  const { mutateAsync: createUE, isPending: createLoading } = usePostUE({
    action() { refetchUE(); },
  });
  const { handleSubmit: submit, formState: { errors }, control } = useForm<CreateUEType>({
    resolver: yupResolver(CreateUEValidation),
  });
  const navigate = useNavigate();

  const createUESubmit = (data: CreateUEType) => { createUE(data); navigate("/admin/ue"); };

  return (
    <FormCard title="NOUVEAU UNITE D'ENSEIGNEMENT">
      <form onSubmit={submit(createUESubmit)} className="space-y-4">
        <FormField label="Nom de l'UE" name="nom_ue" control={control} error={errors.nom_ue}>
          <Input />
        </FormField>
        <FormField label="Crédit de l'UE" name="credit_ue" control={control} error={errors.credit_ue}>
          <Input onKeyPress={handleNumberKeyPress} />
        </FormField>
        <div className="flex justify-between pt-2">
          <Button type="button" variant="ghost" onClick={() => navigate("/admin/ue")}>
            <ArrowLeftOutlined className="mr-1" /> Retour
          </Button>
          <Button type="submit" disabled={createLoading}>
            {createLoading && <LoadingOutlined className="mr-1" />} AJOUTER
          </Button>
        </div>
      </form>
    </FormCard>
  );
};

export default AddUE;
