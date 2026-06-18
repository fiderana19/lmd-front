import { FunctionComponent } from "react";
import { handleFloatKeyPress, handleNumberKeyPress } from "@/utils/handleKeyPress";
import { useGetAllUE } from "@/hooks/useGetAllUE";
import { LoadingOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateECValidation } from "@/validation/ec.validation";
import { usePostEC } from "@/hooks/usePostEC";
import { useGetAllEC } from "@/hooks/useGetAllEC";
import { useNavigate } from "react-router-dom";
import { CreateECType } from "@/types/EC";
import FormCard from "@/components/shared/FormCard";
import FormField from "@/components/shared/FormField";
import Combobox from "@/components/ui/combobox";

const semesterOptions = [
  { value: "Paire", label: "Paire" },
  { value: "Impaire", label: "Impaire" },
];

const AddEC: FunctionComponent = () => {
  const { data: ues, isLoading: ueLoading } = useGetAllUE();
  const { refetch: refetchEC } = useGetAllEC();
  const { handleSubmit: submit, formState: { errors }, control } = useForm<CreateECType>({
    resolver: yupResolver(CreateECValidation),
  });
  const { mutateAsync: createEC, isPending: ecLoading } = usePostEC({
    action() { refetchEC(); },
  });
  const navigate = useNavigate();

  const ECSubmit = (data: CreateECType) => { createEC(data); navigate("/admin/ec"); };

  const ueOptions = ues?.map((ue: any) => ({
    value: String(ue.id_ue),
    label: `${ue.nom_ue} - ${ue.credit_ue}`,
  })) || [];

  return (
    <FormCard title="NOUVEAU ELEMENT CONSTITUTIF">
      <form onSubmit={submit(ECSubmit)} className="space-y-4">
        <FormField label="Nom de l'élément" name="nom_ec" control={control} error={errors.nom_ec}>
          <Input />
        </FormField>
        <FormField label="Semestre" name="semestre" control={control} error={errors.semestre}>
          <Combobox items={semesterOptions} placeholder="Sélectionner le semestre" />
        </FormField>
        <div className="grid grid-cols-3 gap-2">
          <FormField label="ET" name="et" control={control} error={errors.et}>
            <Input onKeyPress={handleFloatKeyPress} />
          </FormField>
          <FormField label="ED" name="ed" control={control} error={errors.ed}>
            <Input onKeyPress={handleFloatKeyPress} />
          </FormField>
          <FormField label="EP" name="ep" control={control} error={errors.ep}>
            <Input onKeyPress={handleFloatKeyPress} />
          </FormField>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <FormField label="Crédit" name="credit_ec" control={control} error={errors.credit_ec}>
            <Input onKeyPress={handleNumberKeyPress} />
          </FormField>
          <FormField label="Poids" name="poids_ec" control={control} error={errors.poids_ec}>
            <Input onKeyPress={handleFloatKeyPress} />
          </FormField>
        </div>
        <FormField label="Unité" name="id_ue" control={control} error={errors.id_ue}>
          <Combobox items={ueOptions} placeholder="Sélectionner l'unité" searchPlaceholder="Rechercher une unité..." emptyText={ueLoading ? "Chargement..." : "Aucune unité"} />
        </FormField>
        <div className="flex justify-between pt-2">
          <Button type="button" variant="ghost" onClick={() => navigate("/admin/ec")}>
            <ArrowLeftOutlined className="mr-1" /> Retour
          </Button>
          <Button type="submit" disabled={ecLoading}>
            {ecLoading && <LoadingOutlined className="mr-1" />} AJOUTER
          </Button>
        </div>
      </form>
    </FormCard>
  );
};

export default AddEC;
