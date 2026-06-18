import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllNiveau } from "@/hooks/useGetAllNiveau";
import { useGetAllEC } from "@/hooks/useGetAllEC";
import { useGetAllAnnee } from "@/hooks/useGetAllAnnee";
import { useForm } from "react-hook-form";
import { CreateGlobalNote } from "@/types/Note";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateGlobalNoteValidation } from "../../validation/note.validation";
import { Button } from "@/components/ui/button";
import { LoadingOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { transformLetter } from "@/utils/Format";
import FormCard from "@/components/shared/FormCard";
import FormField from "@/components/shared/FormField";
import Combobox from "@/components/ui/combobox";

const AddNotePerso: FunctionComponent = () => {
  const { data: niveau, isLoading: niveauLoading } = useGetAllNiveau();
  const { data: ec, isLoading: ecLoading } = useGetAllEC();
  const { data: annee, isLoading: anneeLoading } = useGetAllAnnee();
  const { handleSubmit: submit, formState: { errors }, control } = useForm<CreateGlobalNote>({
    resolver: yupResolver(CreateGlobalNoteValidation),
  });
  const navigate = useNavigate();

  const handleSubmit = (data: CreateGlobalNote) => {
    navigate(`/admin/addglobal/note/${data?.ec}/${data?.niveau}/${transformLetter(data?.annee)}`);
  };

  const niveauOptions = niveau?.map((niv: any) => ({
    value: String(niv.id_niveau),
    label: `${niv.titre_niveau} - ${niv.parcours}`,
  })) || [];

  const ecOptions = ec?.map((element: any) => ({
    value: String(element.id_ec),
    label: `${element.nom_ec} - ${element.id_ue}`,
  })) || [];

  const anneeOptions = annee?.map((ann: any) => ({
    value: String(ann.id_annee),
    label: String(ann.id_annee),
  })) || [];

  return (
    <FormCard title="AJOUT GLOBAL DES NOTES">
      <form onSubmit={submit(handleSubmit)} className="space-y-4">
        <FormField label="Niveau" name="niveau" control={control} error={errors.niveau}>
          <Combobox items={niveauOptions} placeholder="Sélectionnez un niveau" searchPlaceholder="Rechercher un niveau..." emptyText={niveauLoading ? "Chargement..." : "Aucun niveau"} />
        </FormField>
        <FormField label="Élément Constitutif" name="ec" control={control} error={errors.ec}>
          <Combobox items={ecOptions} placeholder="Sélectionnez un élément" searchPlaceholder="Rechercher un élément..." emptyText={ecLoading ? "Chargement..." : "Aucun élément"} />
        </FormField>
        <FormField label="Année universitaire" name="annee" control={control} error={errors.annee}>
          <Combobox items={anneeOptions} placeholder="Sélectionnez une année" searchPlaceholder="Rechercher une année..." emptyText={anneeLoading ? "Chargement..." : "Aucune année"} />
        </FormField>
        <div className="flex justify-between pt-2">
          <Button variant="secondary" asChild>
            <Link to="/admin/note"><ArrowLeftOutlined className="mr-1" /> Retour</Link>
          </Button>
          <Button type="submit">Suivant</Button>
        </div>
      </form>
    </FormCard>
  );
};

export default AddNotePerso;
