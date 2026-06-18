import { DatePicker } from "antd";
import { FunctionComponent, useEffect } from "react";
import dayjs from "dayjs";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { EditEtudiantType } from "@/types/Etudiant";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditEtudiantValidation } from "@/validation/etudiant.validation";
import { useGetAllEtudiant } from "@/hooks/useGetAllEtudiant";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useGetEtudiantById } from "@/hooks/useGetEtudiantById";
import { usePatchEtudiant } from "@/hooks/usePatchEtudiant";
import FormCard from "@/components/shared/FormCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const EditEtudiant: FunctionComponent = () => {
  const req = useParams();
  const etudiantId = Number(req.id);
  const { data: etudiant, isLoading, refetch } = useGetEtudiantById(etudiantId);
  const { handleSubmit: submit, formState: { errors }, control, setValue } = useForm<EditEtudiantType>({
    resolver: yupResolver(EditEtudiantValidation),
  });
  const { refetch: refetchEtudiant } = useGetAllEtudiant();
  const { mutateAsync: etudiantEdit, isPending: editLoading } = usePatchEtudiant({
    action() { refetchEtudiant(); refetch(); },
  });
  const navigate = useNavigate();

  useEffect(() => { setValue("id_etudiant", req.id ? req.id : ""); }, []);

  const submitEditEtudiant = (data: EditEtudiantType) => {
    etudiantEdit(data);
    navigate("/admin/etudiant");
  };

  const formatDate = (dateString: string) => dayjs(dateString).format("YYYY-MM-DD");

  if (isLoading) return <LoadingSpinner />;

  return (
    <FormCard title="MODIFIER UN ETUDIANT">
      {etudiant && (
        <form onSubmit={submit(submitEditEtudiant)} className="space-y-4">
          <div>
            <Label htmlFor="matricule">Matricule</Label>
            <Controller
              control={control}
              name="matricule"
              defaultValue={etudiant[0].matricule}
              render={({ field: { value, onChange } }) => (
                <Input value={value} onChange={onChange} disabled className={errors.matricule ? "border-red-500" : ""} />
              )}
            />
            {errors.matricule && <p className="text-xs text-red-500 mt-1">{errors.matricule.message}</p>}
          </div>
          <div>
            <Label htmlFor="nom">Nom</Label>
            <Controller
              control={control}
              name="nom"
              defaultValue={etudiant[0].nom}
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
              defaultValue={etudiant[0].prenom}
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
              defaultValue={formatDate(etudiant[0].date_naiss)}
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
              defaultValue={etudiant[0].lieu_naiss}
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
            <Button type="submit" disabled={editLoading}>
              {editLoading && <LoadingOutlined className="mr-1" />}
              MODIFIER
            </Button>
          </div>
        </form>
      )}
    </FormCard>
  );
};

export default EditEtudiant;
