import { useState, FunctionComponent } from "react";
import {
  CheckCircleFilled, CloseCircleFilled, FileOutlined,
} from "@ant-design/icons";
import { useGetAllEtudiant } from "@/hooks/useGetAllEtudiant";
import { useGetAllNiveau } from "@/hooks/useGetAllNiveau";
import { useGetAllAnnee } from "@/hooks/useGetAllAnnee";
import { useForm } from "react-hook-form";
import { NoteEtudiantSearch } from "@/types/Note";
import { usePostEtudiantForResult } from "@/hooks/usePostEtudiantForResult";
import { usePostEtudiantFinalForResult } from "@/hooks/usePostEtudiantFinalForResult";
import { usePostEtudiantMarkForResult } from "@/hooks/usePostEtudiantMarkForResult";
import { usePostEtudiantUnityForResult } from "@/hooks/usePostEtudiantUnityForResult";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { NoteEtudiantSearchValidation } from "@/validation/note.validation";
import { Card, CardContent } from "@/components/ui/card";
import FormField from "@/components/shared/FormField";
import Combobox from "@/components/ui/combobox";
import dayjs from "dayjs";

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
  const [resultFinal, setResultFinal] = useState<string>();
  const [resultMark, setResultMark] = useState<{ moyenne_generale: number; total_credits: number; total_credits_possible: number; mention: string }>();
  const [resultUnity, setResultUnity] = useState<{ id_ue: number; nom_ue: string; moyenne: number; credit_ue: number; credit_ue_total: number; notes: { nom_ec: string; valeur: number }[] }[]>();
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
    label: ann.libelle,
  })) || [];

  return (
    <div className="px-4 sm:px-10 print:px-0">
      <div className="text-xl font-bold font-lato text-center mb-6 print:hidden">
        RECHERCHER NOTE D'UN ÉTUDIANT
      </div>
      <form className="flex flex-wrap justify-center gap-2 items-end print:hidden" onSubmit={submit(handleSubmit)}>
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
        <div className="mt-8 max-w-4xl mx-auto print:hidden">
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
                  <p className="font-semibold">{resultEtudiant.libelle}</p>
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
                    {item.notes.map((note: any, i: number) => (
                      <tr key={note.nom_ec}>
                        {i === 0 && (
                          <td className="px-4 py-3 text-sm font-medium text-center align-middle" rowSpan={item.notes.length + 1}>
                            {item.nom_ue}
                          </td>
                        )}
                        <td className="px-4 py-2 text-sm">{note.nom_ec}</td>
                        <td className="px-4 py-2 text-sm text-center">{note.valeur}</td>
                        {i === 0 && (
                          <td className="px-4 py-3 text-sm text-center align-middle" rowSpan={item.notes.length + 1}>
                            {item.credit_ue_total}
                          </td>
                        )}
                        {i === 0 && (
                          <td className="px-4 py-3 text-sm text-center align-middle" rowSpan={item.notes.length + 1}>
                            {item.credit_ue > 0
                              ? <span className="text-green-600"><CheckCircleFilled /> VALIDE</span>
                              : <span className="text-red-600"><CloseCircleFilled /> NON VALIDE</span>
                            }
                          </td>
                        )}
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td className="px-4 py-2 text-sm font-bold text-center" colSpan={5}>MOYENNE {item.moyenne?.toFixed(2)}</td>
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
                <p className="text-lg font-bold">{resultMark.total_credits}/{resultMark.total_credits_possible}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">MENTION</p>
                <p className="text-lg font-bold">{resultMark.mention || "-"}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">OBSERVATION FINALE</p>
                <p className="text-lg font-bold">{resultFinal}</p>
              </div>
            </div>
          )}
          <div className="flex justify-end mt-6">
            <Button variant="secondary" onClick={() => window.print()}><FileOutlined className="mr-1" /> GÉNÉRER UN RELEVÉ DE NOTES</Button>
          </div>
        </div>
      )}
      <div className="hidden print:block print:mx-0 print:px-0">
        {resultEtudiant && (
          <div className="text-xs">
            <div className="text-center">
              <div className="text-sm font-bold font-lato">UNIVERSITE DE FIANARANTSOA</div>
              <div className="text-sm font-bold font-lato">ECOLE NATIONALE D'INFORMATIQUE</div>
              <div className="underline text-sm font-bold font-lato">RELEVE DE NOTES</div>
            </div>
            <div className="text-sm text-center font-bold font-lato uppercase mt-1">
              EN {resultEtudiant.descri_niveau} PROFESSIONNELLE EN INFORMATIQUE
            </div>
            <div className="flex justify-center text-sm">
              <div className="text-center font-bold font-lato mr-2">Domaine :</div>
              <div className="text-center font-lato">{resultEtudiant.domaine}</div>
            </div>
            <div className="flex justify-between mx-6 text-sm">
              <div className="text-center font-lato">
                <div className="flex justify-center">
                  <div className="text-center font-bold font-lato mr-2">Mention :</div>
                  <div className="text-center font-lato">{resultEtudiant.mention}</div>
                </div>
              </div>
              <div className="text-center font-lato">
                <div className="flex justify-center">
                  <div className="text-center font-bold font-lato mr-2">Parcours :</div>
                  <div className="text-center font-lato">{resultEtudiant.parcours}</div>
                </div>
              </div>
            </div>
            <div className="font-lato">
              <div className="text-center font-lato">
                <div className="flex">
                  <div className="underline text-center font-bold font-lato mr-2">Nom et prénoms :</div>
                  <div className="text-center font-lato">{resultEtudiant.nom} {resultEtudiant.prenom}</div>
                </div>
              </div>
              <div className="text-center font-lato">
                <div className="flex">
                  <div className="underline text-center font-bold font-lato mr-2">Date et lieu de naissance :</div>
                  <div className="text-center font-lato">{dayjs(resultEtudiant.date_naiss).format("DD-MM-YYYY")} à {resultEtudiant.lieu_naiss}</div>
                </div>
              </div>
              <div className="text-center font-lato">
                <div className="flex">
                  <div className="underline text-center font-bold font-lato mr-2">Numero d'inscription :</div>
                  <div className="text-center font-lato">{resultEtudiant.matricule}</div>
                </div>
              </div>
              <div className="flex justify-end text-xs">
                <div className="mr-2">Année universitaire:</div>
                <div>{resultEtudiant.libelle}</div>
              </div>
            </div>
            <table className="text-center min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">UE</th>
                  <th className="px-4 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">EC</th>
                  <th className="px-4 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Note/20</th>
                  <th className="px-4 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Crédits</th>
                  <th className="px-4 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Validation</th>
                </tr>
              </thead>
              {resultUnity?.map((item: any, index: any) => (
                <tbody key={index} className="text-xs bg-white divide-y divide-gray-200">
                  {item.notes.map((note: any, i: number) => (
                    <tr key={note.nom_ec}>
                      {i === 0 && (
                        <td className="px-4 py-2 leading-5 text-gray-900 font-semibold text-center align-middle" rowSpan={item.notes.length + 1}>
                          {item.nom_ue}
                        </td>
                      )}
                      <td className="px-4 py-1 leading-5 text-gray-900">{note.nom_ec}</td>
                      <td className="px-4 py-1 leading-5 text-gray-900 text-center">{note.valeur}</td>
                      {i === 0 && (
                        <td className="px-4 py-2 leading-5 text-gray-900 text-center align-middle" rowSpan={item.notes.length + 1}>
                          {item.credit_ue_total}
                        </td>
                      )}
                      {i === 0 && (
                        <td className="px-4 py-2 leading-5 text-gray-900 text-center align-middle" rowSpan={item.notes.length + 1}>
                          {item.credit_ue > 0
                            ? <span className="text-green-700"><CheckCircleFilled /> VALIDE</span>
                            : <span className="text-red-700"><CloseCircleFilled /> NON VALIDE</span>
                          }
                        </td>
                      )}
                    </tr>
                  ))}
                  <tr className="bg-gray-50">
                    <td className="px-4 py-1 leading-5 text-gray-900 font-bold text-center" colSpan={5}>MOYENNE {item.moyenne.toFixed(2)}</td>
                  </tr>
                </tbody>
              ))}
            </table>
            <div>
              {resultMark && (
                <div className="flex justify-around border-t border-t-gray-200">
                  <div className="px-6 flex justify-between whitespace-nowrap text-xs leading-5 text-gray-900 border-r border-r-gray-200">
                    <div className="font-bold mr-2">MOYENNE GENERALE</div>
                    <div>{resultMark.moyenne_generale}</div>
                  </div>
                  <div className="px-6 flex justify-between whitespace-nowrap text-xs leading-5 text-gray-900">
                    <div className="font-bold mr-2">TOTAL CREDITS</div>
                    <div>{resultMark.total_credits}/{resultMark.total_credits_possible}</div>
                  </div>
                </div>
              )}
              <div className="text-xs px-6 flex whitespace-nowrap leading-5 text-gray-900 font-bold border-y border-y-gray-200">
                <div className="mr-1">OBSERVATION FINALE :</div>
                {resultFinal && <div>{resultFinal}</div>}
              </div>
            </div>
            <div className="text-right mt-1">
              <div className="text-sm font-lato">Fait à Fianarantsoa , le ....................</div>
            </div>
            <div className="flex mt-14">
              <div className="text-xs underline font-lato">NOTE IMPORTANTE :</div>
              <div className="text-xs font-bold font-lato">Ce relevé de notes être remis en aucun cas à l'interessé sous peine d'annulation</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteEtudiant;
