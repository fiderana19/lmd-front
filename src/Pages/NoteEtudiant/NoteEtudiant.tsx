import { useState, FunctionComponent } from "react";
import {
  CheckCircleFilled, CloseCircleFilled, FileOutlined, LoadingOutlined,
} from "@ant-design/icons";
import { useGetAllEtudiant } from "@/hooks/useGetAllEtudiant";
import { useGetAllNiveau } from "@/hooks/useGetAllNiveau";
import { useGetAllAnnee } from "@/hooks/useGetAllAnnee";
import { useForm } from "react-hook-form";
import { NoteEtudiantSearch } from "@/types/Note";
import { usePostEtudiantForResult } from "@/hooks/usePostEtudiantForResult";
import { usePostEtudiantFinalForResult } from "@/hooks/usePostEtudiantFinalForResult ";
import { usePostEtudiantMarkForResult } from "@/hooks/usePostEtudiantMarkForResult";
import { usePostEtudiantUnityForResult } from "@/hooks/usePostEtudiantUnityForResult";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { NoteEtudiantSearchValidation } from "@/validation/note.validation";
import { transformLetter } from "@/utils/Format";
import { Card, CardContent } from "@/components/ui/card";
import FormField from "@/components/shared/FormField";
import Combobox from "@/components/ui/combobox";

const NoteEtudiant: FunctionComponent = () => {
  const { data: etudiant } = useGetAllEtudiant();
  const { data: niveau } = useGetAllNiveau();
  const { data: annee } = useGetAllAnnee();
  const { handleSubmit: submit, formState: { errors }, control } = useForm<NoteEtudiantSearch>({
    resolver: yupResolver(NoteEtudiantSearchValidation),
  });
  const { mutateAsync: postEtudiant } = usePostEtudiantForResult();
  const { mutateAsync: postFinal } = usePostEtudiantFinalForResult();
  const { mutateAsync: postMark } = usePostEtudiantMarkForResult();
  const { mutateAsync: postUnity } = usePostEtudiantUnityForResult();
  const [resultEtudiant, setResultEtudiant] = useState<any>();
  const [resultFinal, setResultFinal] = useState<any>();
  const [resultMark, setResultMark] = useState<any>();
  const [resultUnity, setResultUnity] = useState<any>();
  const [selectedEtudiantId, setSelectedEtudiantId] = useState<number>();
  const [selectedAnneeId, setSelectedAnneeId] = useState<string>("");
  const [selectedNiveauId, setSelectedNiveauId] = useState<number>();
  let [isView, setIsView] = useState(false);

  const handleSubmit = async (data: NoteEtudiantSearch) => {
    setIsView(true);
    const et = await postEtudiant(data);
    setResultEtudiant(et?.data[0]);
    const f = await postFinal(data);
    setResultFinal(f?.data);
    const m = await postMark(data);
    setResultMark(m?.data);
    const u = await postUnity(data);
    setResultUnity(u?.data);
    setSelectedAnneeId(data?.id_annee);
    setSelectedEtudiantId(data?.id_etudiant);
    setSelectedNiveauId(data?.id_niveau);
  };

  const etudiantOptions = etudiant?.map((et: any) => ({
    value: String(et.id_etudiant),
    label: `${et.matricule} ${et.nom} ${et.prenom}`,
  })) || [];

  const niveauOptions = niveau?.map((niv: any) => ({
    value: String(niv.id_niveau),
    label: `${niv.titre_niveau} ${niv.parcours}`,
  })) || [];

  const anneeOptions = annee?.map((ann: any) => ({
    value: String(ann.id_annee),
    label: String(ann.id_annee),
  })) || [];

  return (
    <div className="px-4 sm:px-10">
      <div className="text-xl font-bold font-lato text-center mb-6">
        RECHERCHER NOTE D'UN ÉTUDIANT
      </div>
      <form className="flex flex-wrap justify-center gap-2 items-end" onSubmit={submit(handleSubmit)}>
        <FormField label="Étudiant" name="id_etudiant" control={control} error={errors.id_etudiant} className="md:w-56">
          <Combobox items={etudiantOptions} placeholder="Étudiant" searchPlaceholder="Rechercher..." />
        </FormField>
        <FormField label="Niveau" name="id_niveau" control={control} error={errors.id_niveau} className="md:w-56">
          <Combobox items={niveauOptions} placeholder="Niveau" searchPlaceholder="Rechercher..." />
        </FormField>
        <FormField label="Année" name="id_annee" control={control} error={errors.id_annee} className="md:w-56">
          <Combobox items={anneeOptions} placeholder="Année" searchPlaceholder="Rechercher..." />
        </FormField>
        <Button type="submit">Rechercher</Button>
      </form>

      {isView && (
        <div className="mt-8 max-w-4xl mx-auto">
          <h2 className="text-lg font-bold text-center mb-4">NOTE D'UN ÉTUDIANT</h2>
          {resultEtudiant && (
            <Card className="mb-6">
              <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
                <div>
                  <p className="text-xs text-gray-500">Étudiant</p>
                  <p className="font-semibold">{resultEtudiant.nom} {resultEtudiant.prenom}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Matricule</p>
                  <p className="font-semibold">{resultEtudiant.matricule}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Niveau</p>
                  <p className="font-semibold">{resultEtudiant.titre_niveau}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Année</p>
                  <p className="font-semibold">{resultEtudiant.id_annee}</p>
                </div>
              </CardContent>
            </Card>
          )}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">UE</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">EC</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase text-center">Note/20</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase text-center">Crédits</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase text-center">Validation</th>
                </tr>
              </thead>
              {resultUnity?.map((item: any, index: any) => (
                <tbody key={index} className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium" rowSpan={item.notes.length + 1}>
                      {item.id_ue}
                    </td>
                  </tr>
                  {item.notes.map((note: any) => (
                    <tr key={note.nom_ec}>
                      <td className="px-4 py-2 text-sm">{note.nom_ec}</td>
                      <td className="px-4 py-2 text-sm text-center">{note.valeur}</td>
                      <td className="px-4 py-2 text-sm text-center">{item.credit_ue}</td>
                      <td className="px-4 py-2 text-sm text-center">
                        {item.credit_ue > 0
                          ? <span className="text-green-600 flex items-center justify-center gap-1"><CheckCircleFilled /> VALIDE</span>
                          : <span className="text-red-600 flex items-center justify-center gap-1"><CloseCircleFilled /> NON VALIDE</span>
                        }
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50">
                    <td colSpan={3} className="px-4 py-2 text-sm font-bold text-right">MOYENNE</td>
                    <td colSpan={2} className="px-4 py-2 text-sm font-bold">{item.moyenne?.toFixed(2)}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
          {resultMark && (
            <div className="flex flex-wrap gap-4 justify-around mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-center">
                <p className="text-xs text-gray-500">MOYENNE GÉNÉRALE</p>
                <p className="text-lg font-bold">{resultMark.moyenne_generale}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">TOTAL CRÉDITS</p>
                <p className="text-lg font-bold">{resultMark.total_credits}/60</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">OBSERVATION FINALE</p>
                <p className="text-lg font-bold">{resultFinal}</p>
              </div>
            </div>
          )}
          <div className="flex justify-end mt-6">
            <a href={`/admin/releve/pdf/${selectedEtudiantId}/${selectedNiveauId}/${transformLetter(selectedAnneeId)}`} target="_blank">
              <Button variant="secondary"><FileOutlined className="mr-1" /> GÉNÉRER UN RELEVÉ DE NOTES</Button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteEtudiant;
