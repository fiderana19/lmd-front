import { FunctionComponent, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { EditNiveauType } from "@/types/Niveau";
import { Label } from "@/components/ui/label";
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

  const fields = ["titre_niveau", "descri_niveau", "domaine", "mention", "parcours"] as const;

  return (
    <FormCard title="MODIFIER NIVEAU">
      {niveau && (
        <form onSubmit={submit(editNiveauSubmit)} className="space-y-4">
          {fields.map((field) => (
            <div key={field}>
              <Label htmlFor={field}>{field === "titre_niveau" ? "Titre" : field.charAt(0).toUpperCase() + field.slice(1)}</Label>
              <Controller control={control} name={field} defaultValue={niveau[0][field]}
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
