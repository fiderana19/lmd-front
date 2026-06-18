import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { handleFloatKeyPress } from "@/utils/handleKeyPress";
import { useGetAllEtudiant } from "@/hooks/useGetAllEtudiant";
import { useGetAllNiveau } from "@/hooks/useGetAllNiveau";
import { useGetAllEC } from "@/hooks/useGetAllEC";
import { LoadingOutlined } from "@ant-design/icons";
import { useGetAllAnnee } from "@/hooks/useGetAllAnnee";
import { useForm } from "react-hook-form";
import { CreateNote } from "@/types/Note";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateNoteValidation } from "@/validation/note.validation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePostNote } from "@/hooks/usePostNote";
import { useGetAllNote } from "@/hooks/useGetAllNote";
import FormField from "@/components/shared/FormField";
import Combobox from "@/components/ui/combobox";

const AddNote: FunctionComponent = () => {
  const { data: etudiants, isLoading: etudiantLoading } = useGetAllEtudiant();
  const { data: niveaux, isLoading: niveauLoading } = useGetAllNiveau();
  const { data: ecs, isLoading: ecLoading } = useGetAllEC();
  const { data: annee, isLoading: anneeLoading } = useGetAllAnnee();
  const {
    handleSubmit: submit,
    formState: { errors },
    control,
  } = useForm<CreateNote>({
    resolver: yupResolver(CreateNoteValidation),
  });
  const { refetch: refetchNote } = useGetAllNote();
  const { mutateAsync: createNote, isPending: createLoading } = usePostNote({
    action() { refetchNote(); },
  });

  const handleSubmit = async (data: CreateNote) => {
    await createNote(data);
  };

  const etudiantOptions = etudiants?.map((et: any) => ({
    value: String(et.id_etudiant),
    label: `${et.matricule} - ${et.nom} ${et.prenom}`,
  })) || [];

  const niveauOptions = niveaux?.map((niv: any) => ({
    value: String(niv.id_niveau),
    label: `${niv.titre_niveau} - ${niv.parcours}`,
  })) || [];

  const ecOptions = ecs?.map((element: any) => ({
    value: String(element.id_ec),
    label: `${element.nom_ec} - ${element.id_ue}`,
  })) || [];

  const anneeOptions = annee?.map((ann: any) => ({
    value: String(ann.id_annee),
    label: String(ann.id_annee),
  })) || [];

  return (
    <div>
      <form className="sm:w-2/3 w-full my-7 mx-auto space-y-4" onSubmit={submit(handleSubmit)}>
        <FormField label="Note" name="valeur" control={control} error={errors.valeur}>
          <Input onKeyPress={handleFloatKeyPress} />
        </FormField>
        <FormField label="Étudiant" name="id_etudiant" control={control} error={errors.id_etudiant}>
          <Combobox items={etudiantOptions} placeholder="Sélectionnez un étudiant" searchPlaceholder="Rechercher un étudiant..." emptyText={etudiantLoading ? "Chargement..." : "Aucun étudiant"} />
        </FormField>
        <FormField label="Niveau" name="id_niveau" control={control} error={errors.id_niveau}>
          <Combobox items={niveauOptions} placeholder="Sélectionnez un niveau" searchPlaceholder="Rechercher un niveau..." emptyText={niveauLoading ? "Chargement..." : "Aucun niveau"} />
        </FormField>
        <FormField label="Élément Constitutif" name="id_ec" control={control} error={errors.id_ec}>
          <Combobox items={ecOptions} placeholder="Sélectionnez un élément" searchPlaceholder="Rechercher un élément..." emptyText={ecLoading ? "Chargement..." : "Aucun élément"} />
        </FormField>
        <FormField label="Année universitaire" name="id_annee" control={control} error={errors.id_annee}>
          <Combobox items={anneeOptions} placeholder="Sélectionnez une année" searchPlaceholder="Rechercher une année..." emptyText={anneeLoading ? "Chargement..." : "Aucune année"} />
        </FormField>
        <div className="flex justify-center my-3">
          <Button type="submit" disabled={createLoading}>
            {createLoading && <LoadingOutlined />}
            Ajouter
          </Button>
        </div>
      </form>
      <Link to="/admin/addnote" className="flex justify-center">
        <Button variant="link" type="submit">
          Faire un ajout global
        </Button>
      </Link>
    </div>
  );
};

export default AddNote;
