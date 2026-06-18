import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { CreateNiveauType } from "@/types/Niveau";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateNiveauValidation } from "@/validation/niveau.validation";
import { usePostNiveau } from "@/hooks/usePostNiveau";
import { useGetAllNiveau } from "@/hooks/useGetAllNiveau";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import FormCard from "@/components/shared/FormCard";
import FormField from "@/components/shared/FormField";

const fields: { name: keyof CreateNiveauType; label: string }[] = [
  { name: "titre_niveau", label: "Titre" },
  { name: "descri_niveau", label: "Description" },
  { name: "domaine", label: "Domaine" },
  { name: "mention", label: "Mention" },
  { name: "parcours", label: "Parcours" },
];

const AddNiveau: FunctionComponent = () => {
  const { refetch: refetchNiveau } = useGetAllNiveau();
  const { mutateAsync: createNiveau, isPending: createLoading } = usePostNiveau({
    action() { refetchNiveau(); },
  });
  const { handleSubmit: submit, formState: { errors }, control } = useForm<CreateNiveauType>({
    resolver: yupResolver(CreateNiveauValidation),
  });
  const navigate = useNavigate();

  const createNiveauSubmit = (data: CreateNiveauType) => {
    createNiveau(data);
    navigate("/admin/niveau");
  };

  return (
    <FormCard title="NOUVEAU NIVEAU">
      <form onSubmit={submit(createNiveauSubmit)} className="space-y-4">
        {fields.map(({ name, label }) => (
          <FormField key={name} label={label} name={name} control={control} error={errors[name]}>
            <Input />
          </FormField>
        ))}
        <div className="flex justify-between pt-2">
          <Button type="button" variant="ghost" onClick={() => navigate("/admin/niveau")}>
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

export default AddNiveau;
