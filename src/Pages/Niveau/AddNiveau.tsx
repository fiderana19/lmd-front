import { FunctionComponent } from "react";
import { Controller, useForm } from "react-hook-form";
import { CreateNiveauType } from "@/types/Niveau";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateNiveauValidation } from "@/validation/niveau.validation";
import { usePostNiveau } from "@/hooks/usePostNiveau";
import { useGetAllNiveau } from "@/hooks/useGetAllNiveau";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import FormCard from "@/components/shared/FormCard";

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
        {(["titre_niveau", "descri_niveau", "domaine", "mention", "parcours"] as const).map((field) => (
          <div key={field}>
            <Label htmlFor={field}>{field === "titre_niveau" ? "Titre" : field.charAt(0).toUpperCase() + field.slice(1)}</Label>
            <Controller control={control} name={field}
              render={({ field: { value, onChange } }) => (
                <Input value={value} onChange={onChange} className={errors[field] ? "border-red-500" : ""} />
              )}
            />
            {errors[field] && <p className="text-xs text-red-500 mt-1">{errors[field].message}</p>}
          </div>
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
