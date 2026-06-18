import { useState, useEffect, FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import {
  CloseCircleFilled, CheckCircleFilled, WarningFilled, LoadingOutlined,
} from "@ant-design/icons";
import { handleFloatKeyPress } from "@/utils/handleKeyPress";
import { invertLetter } from "@/utils/Format";
import { useGetAllEtudiant } from "@/hooks/useGetAllEtudiant";
import { useGetNiveauById } from "@/hooks/useGetNiveauById";
import { useGetECById } from "@/hooks/useGetECById";
import { usePostNoteByNiveau } from "@/hooks/usePostNoteByNiveau";
import { CreateNote } from "@/types/Note";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateNoteValidation } from "@/validation/note.validation";
import { Button } from "@/components/ui/button";
import { usePostNote } from "@/hooks/usePostNote";
import { useGetAllNote } from "@/hooks/useGetAllNote";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormField from "@/components/shared/FormField";
import Combobox from "@/components/ui/combobox";

const AddNoteGlobal: FunctionComponent = () => {
  let params = useParams();
  const ec = params.ec ? Number(params.ec) : 0;
  const annee = invertLetter(params.annee ? params.annee : "");
  const niveau = params.niveau ? Number(params.niveau) : 0;
  const fetchData = { id_ec: ec, id_niveau: niveau, id_annee: annee };
  const { data: etudiant } = useGetAllEtudiant();
  const { data: niv } = useGetNiveauById(niveau);
  const { data: element } = useGetECById(ec);
  const { mutateAsync: fetchNotes, data: notes } = usePostNoteByNiveau();
  const { handleSubmit: submit, formState: { errors }, control, setValue } = useForm<CreateNote>({
    resolver: yupResolver(CreateNoteValidation),
  });
  const { refetch } = useGetAllNote();
  const { mutateAsync: createNote, isPending: createLoading } = usePostNote({
    action() { refetchNotes(); refetch(); },
  });
  const [searchNote, setSearchNote] = useState<string>("");

  useEffect(() => {
    setValue("id_annee", annee);
    setValue("id_ec", String(ec));
    setValue("id_niveau", String(niveau));
    refetchNotes();
  }, [niveau, ec, annee]);

  async function refetchNotes() { await fetchNotes(fetchData); }

  const handleSubmit = async (data: CreateNote) => { await createNote(data); };

  const scoreIcon = (valeur: number) => {
    if (valeur >= 10) return <CheckCircleFilled className="text-green-600" />;
    if (valeur >= 5) return <WarningFilled className="text-yellow-400" />;
    return <CloseCircleFilled className="text-red-600" />;
  };

  const etudiantOptions = etudiant?.map((et: any) => ({
    value: String(et.id_etudiant),
    label: `${et.nom} ${et.matricule}`,
  })) || [];

  return (
    <div>
      <div className="text-xl sm:text-2xl font-bold font-lato text-center text-gray-800 mb-6">
        NOTE {element?.nom_ec} - {niv?.titre_niveau} - {annee}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <Card>
          <CardHeader><CardTitle>Ajouter une note</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={submit(handleSubmit)} className="space-y-4">
              <FormField label="Étudiant" name="id_etudiant" control={control} error={errors.id_etudiant}>
                <Combobox items={etudiantOptions} placeholder="Sélectionnez un étudiant" searchPlaceholder="Rechercher..." emptyText="Aucun étudiant" />
              </FormField>
              <FormField label="Note" name="valeur" control={control} error={errors.valeur}>
                <Input onKeyPress={handleFloatKeyPress} />
              </FormField>
              <Button type="submit" className="w-full" disabled={createLoading}>
                {createLoading && <LoadingOutlined className="mr-1" />} Ajouter
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Notes saisies</CardTitle>
              <Input className="w-40" placeholder="Rechercher..." value={searchNote}
                onChange={(e) => setSearchNote(e.target.value)} />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto max-h-96">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">Matricule</th>
                    <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {notes?.data?.filter((n: any) => !searchNote || n.matricule.includes(searchNote))
                    .map((note: any, index: any) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-center">{note.matricule}</td>
                        <td className="px-4 py-2 text-sm text-center flex items-center justify-center gap-1">
                          {note.valeur} {scoreIcon(note.valeur)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddNoteGlobal;
