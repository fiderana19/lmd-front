import { FunctionComponent, useEffect } from "react";
import { handleFloatKeyPress, handleNumberKeyPress } from "@/utils/handleKeyPress";
import { useGetAllUE } from "@/hooks/useGetAllUE";
import { LoadingOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditECValidation } from "../../validation/ec.validation";
import { useGetAllEC } from "@/hooks/useGetAllEC";
import { useNavigate, useParams } from "react-router-dom";
import { useGetECById } from "@/hooks/useGetECById";
import { usePatchEC } from "@/hooks/usePatchEC";
import { EditECType } from "@/types/EC";
import FormCard from "@/components/shared/FormCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import FormField from "@/components/shared/FormField";
import Combobox from "@/components/ui/combobox";

const semesterOptions = [
  { value: "Paire", label: "Paire" },
  { value: "Impaire", label: "Impaire" },
];

const EditEC: FunctionComponent = () => {
  const req = useParams();
  const ECId = Number(req.id);
  const { data: ec, isLoading: ecLoading } = useGetECById(ECId ? ECId : 0);
  const { data: ues, isLoading: ueLoading } = useGetAllUE();
  const { refetch: refetchEC } = useGetAllEC();
  const { handleSubmit: submit, formState: { errors }, control, setValue, reset } = useForm<EditECType>({
    resolver: yupResolver(EditECValidation),
  });
  const { mutateAsync: ECEdit, isPending: patchLoading } = usePatchEC({
    action() { refetchEC(); },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (ec) {
      setValue("id_ec", req.id ? req.id : "");
      reset({
        id_ec: String(req.id || ""),
        nom_ec: ec[0].nom_ec,
        semestre: ec[0].semestre,
        et: ec[0].et,
        ed: ec[0].ed,
        ep: ec[0].ep,
        credit_ec: ec[0].credit_ec,
        poids_ec: ec[0].poids_ec,
        id_ue: String(ec[0].id_ue),
      });
    }
  }, [ec]);

  const ECSubmit = (data: EditECType) => { ECEdit(data); navigate("/admin/ec"); };

  if (ecLoading) return <LoadingSpinner />;

  const ueOptions = ues?.map((ue: any) => ({
    value: String(ue.id_ue),
    label: `${ue.nom_ue} - ${ue.credit_ue}`,
  })) || [];

  return (
    <FormCard title="MODIFIER UN ELEMENT CONSTITUTIF">
      {ec && (
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
            <Button type="submit" disabled={patchLoading}>
              {patchLoading && <LoadingOutlined className="mr-1" />} MODIFIER
            </Button>
          </div>
        </form>
      )}
    </FormCard>
  );
};

export default EditEC;
