import { FunctionComponent } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { CreateEtudiantType } from "@/types/Etudiant";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateEtudiantValidation } from "@/validation/etudiant.validation";
import { usePostEtudiant } from "@/hooks/usePostEtudiant";
import { useGetAllEtudiant } from "@/hooks/useGetAllEtudiant";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import FormCard from "@/components/shared/FormCard";
import FormField from "@/components/shared/FormField";
import DatePicker from "@/components/ui/date-picker";

const AddEtudiant: FunctionComponent = () => {
  const { handleSubmit: submit, formState: { errors }, control } = useForm<CreateEtudiantType>({
    resolver: yupResolver(CreateEtudiantValidation),
  });
  const { refetch: refetchEtudiant } = useGetAllEtudiant();
  const { mutateAsync: createEtudiant, isPending: createLoading } = usePostEtudiant({
    action() { refetchEtudiant(); },
  });
  const navigate = useNavigate();

  const submitCreateEtudiant = (data: CreateEtudiantType) => {
    createEtudiant(data);
    navigate("/admin/etudiant");
  };

  return (
    <FormCard title="NOUVEAU ETUDIANT">
      <form onSubmit={submit(submitCreateEtudiant)} className="space-y-4">
        <FormField label="Matricule" name="matricule" control={control} error={errors.matricule}>
          <Input />
        </FormField>
        <FormField label="Nom" name="nom" control={control} error={errors.nom}>
          <Input />
        </FormField>
        <FormField label="Prénom" name="prenom" control={control} error={errors.prenom}>
          <Input />
        </FormField>
        <FormField label="Date de naissance" name="date_naiss" control={control} error={errors.date_naiss}>
          <DatePicker />
        </FormField>
        <FormField label="Lieu de naissance" name="lieu_naiss" control={control} error={errors.lieu_naiss}>
          <Input />
        </FormField>
        <div className="flex justify-between pt-2">
          <Button type="button" variant="ghost" onClick={() => navigate("/admin/etudiant")}>
            <ArrowLeftOutlined className="mr-1" /> Retour
          </Button>
          <Button type="submit" disabled={createLoading}>
            {createLoading && <LoadingOutlined className="mr-1" />}
            AJOUTER
          </Button>
        </div>
      </form>
    </FormCard>
  );
};

export default AddEtudiant;
