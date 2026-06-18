import { FunctionComponent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { EditEtudiantType } from "@/types/Etudiant";
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
import FormField from "@/components/shared/FormField";
import DatePicker from "@/components/ui/date-picker";

const EditEtudiant: FunctionComponent = () => {
  const req = useParams();
  const etudiantId = Number(req.id);
  const { data: etudiant, isLoading, refetch } = useGetEtudiantById(etudiantId);
  const { handleSubmit: submit, formState: { errors }, control, setValue, reset } = useForm<EditEtudiantType>({
    resolver: yupResolver(EditEtudiantValidation),
  });
  const { refetch: refetchEtudiant } = useGetAllEtudiant();
  const { mutateAsync: etudiantEdit, isPending: editLoading } = usePatchEtudiant({
    action() { refetchEtudiant(); refetch(); },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (etudiant) {
      setValue("id_etudiant", req.id ? req.id : "");
      reset({
        id_etudiant: req.id || "",
        matricule: etudiant[0].matricule,
        nom: etudiant[0].nom,
        prenom: etudiant[0].prenom,
        date_naiss: etudiant[0].date_naiss,
        lieu_naiss: etudiant[0].lieu_naiss,
      });
    }
  }, [etudiant]);

  const submitEditEtudiant = (data: EditEtudiantType) => {
    etudiantEdit(data);
    navigate("/admin/etudiant");
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <FormCard title="MODIFIER UN ETUDIANT">
      {etudiant && (
        <form onSubmit={submit(submitEditEtudiant)} className="space-y-4">
          <FormField label="Matricule" name="matricule" control={control} error={errors.matricule}>
            <Input disabled />
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
