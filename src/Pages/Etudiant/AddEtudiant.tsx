import { DatePicker } from "antd";
import { FunctionComponent } from "react";
import dayjs from "dayjs";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { CreateEtudiantType } from "@/types/Etudiant";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateEtudiantValidation } from "@/validation/etudiant.validation";
import { usePostEtudiant } from "@/hooks/usePostEtudiant";
import { useGetAllEtudiant } from "@/hooks/useGetAllEtudiant";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import FormCard from "@/components/shared/FormCard";

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

  const formatDate = (dateString: string) => dayjs(dateString).format("YYYY-MM-DD");

  return (
    <FormCard title="NOUVEAU ETUDIANT">
      <form onSubmit={submit(submitCreateEtudiant)} className="space-y-4">
        <div>
          <Label htmlFor="matricule">Matricule</Label>
          <Controller
            control={control}
            name="matricule"
            render={({ field: { value, onChange } }) => (
              <Input value={value} onChange={onChange} className={errors.matricule ? "border-red-500" : ""} />
            )}
          />
          {errors.matricule && <p className="text-xs text-red-500 mt-1">{errors.matricule.message}</p>}
        </div>
        <div>
          <Label htmlFor="nom">Nom</Label>
          <Controller
            control={control}
            name="nom"
            render={({ field: { value, onChange } }) => (
              <Input value={value} onChange={onChange} className={errors.nom ? "border-red-500" : ""} />
            )}
          />
          {errors.nom && <p className="text-xs text-red-500 mt-1">{errors.nom.message}</p>}
        </div>
        <div>
          <Label htmlFor="prenom">Prénom</Label>
          <Controller
            control={control}
            name="prenom"
            render={({ field: { value, onChange } }) => (
              <Input value={value} onChange={onChange} className={errors.prenom ? "border-red-500" : ""} />
            )}
          />
          {errors.prenom && <p className="text-xs text-red-500 mt-1">{errors.prenom.message}</p>}
        </div>
        <div>
          <Label htmlFor="date_naiss">Date de naissance</Label>
          <Controller
            control={control}
            name="date_naiss"
            render={({ field: { value, onChange } }) => (
              <DatePicker
                className={`w-full ${errors.date_naiss ? "border-red-500" : ""}`}
                placeholder=""
                onChange={() => onChange(formatDate(value))}
                value={value ? dayjs(value) : null}
                format="YYYY-MM-DD"
              />
            )}
          />
          {errors.date_naiss && <p className="text-xs text-red-500 mt-1">{errors.date_naiss.message}</p>}
        </div>
        <div>
          <Label htmlFor="lieu_naiss">Lieu de naissance</Label>
          <Controller
            control={control}
            name="lieu_naiss"
            render={({ field: { value, onChange } }) => (
              <Input value={value} onChange={onChange} className={errors.lieu_naiss ? "border-red-500" : ""} />
            )}
          />
          {errors.lieu_naiss && <p className="text-xs text-red-500 mt-1">{errors.lieu_naiss.message}</p>}
        </div>
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
