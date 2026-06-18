import { FunctionComponent } from "react";
import { Controller, useForm } from "react-hook-form";
import { CreateUEType } from "@/types/UE";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateUEValidation } from "@/validation/ue.validation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { handleNumberKeyPress } from "@/utils/handleKeyPress";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LoadingOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { usePostUE } from "@/hooks/usePostUE";
import { useGetAllUE } from "@/hooks/useGetAllUE";
import FormCard from "@/components/shared/FormCard";

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
        <div>
          <Label htmlFor="nom_ue">Nom de l'UE</Label>
          <Controller name="nom_ue" control={control}
            render={({ field: { value, onChange } }) => (
              <Input value={value} onChange={onChange} className={errors.nom_ue ? "border-red-500" : ""} />
            )}
          />
          {errors.nom_ue && <p className="text-xs text-red-500 mt-1">{errors.nom_ue.message}</p>}
        </div>
        <div>
          <Label htmlFor="credit_ue">Crédit de l'UE</Label>
          <Controller name="credit_ue" control={control}
            render={({ field: { value, onChange } }) => (
              <Input value={value} onChange={onChange} onKeyPress={handleNumberKeyPress}
                className={errors.credit_ue ? "border-red-500" : ""} />
            )}
          />
          {errors.credit_ue && <p className="text-xs text-red-500 mt-1">{errors.credit_ue.message}</p>}
        </div>
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
