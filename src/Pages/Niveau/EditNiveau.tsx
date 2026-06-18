import { FunctionComponent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { EditNiveauType } from "@/types/Niveau";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useGetNiveauById } from "@/hooks/useGetNiveauById";
import { usePatchNiveau } from "@/hooks/usePatchNiveau";
import { useGetAllNiveau } from "@/hooks/useGetAllNiveau";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditNiveauValidation } from "@/validation/niveau.validation";
import FormCard from "@/components/shared/FormCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import FormField from "@/components/shared/FormField";

const fields: { name: keyof EditNiveauType; label: string }[] = [
  { name: "titre_niveau", label: "Titre" },
  { name: "descri_niveau", label: "Description" },
  { name: "domaine", label: "Domaine" },
  { name: "mention", label: "Mention" },
  { name: "parcours", label: "Parcours" },
];

const EditNiveau: FunctionComponent = () => {
  const req = useParams();
  const NiveauId = Number(req.id);
  const { data: niveau, isLoading: niveauLoading, refetch } = useGetNiveauById(NiveauId ? NiveauId : 0);
  const { refetch: refetchNiveau } = useGetAllNiveau();
  const { mutateAsync: NiveauEdit, isPending: patchLoading } = usePatchNiveau({
    action() { refetchNiveau(); refetch(); },
  });
  const { handleSubmit: submit, formState: { errors }, control, setValue } = useForm<EditNiveauType>({
    resolver: yupResolver(EditNiveauValidation),
  });
  const navigate = useNavigate();

  useEffect(() => { setValue("id_niveau", req.id ? req.id : ""); }, []);

  const editNiveauSubmit = (data: EditNiveauType) => {
    NiveauEdit(data);
    navigate("/admin/niveau");
  };

  if (niveauLoading) return <LoadingSpinner />;

  return (
    <FormCard title="MODIFIER NIVEAU">
      {niveau && (
        <form onSubmit={submit(editNiveauSubmit)} className="space-y-4">
          {fields.map(({ name, label }) => (
            <FormField key={name} label={label} name={name} control={control} error={errors[name]} defaultValue={niveau[0][name]}>
              <Input />
            </FormField>
          ))}
          <div className="flex justify-between pt-2">
            <Button type="button" variant="ghost" onClick={() => navigate("/admin/niveau")}>
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

export default EditNiveau;
