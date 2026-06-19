import { useState, FunctionComponent } from "react";
import { FileOutlined } from "@ant-design/icons";
import { useGetAllAnnee } from "@/hooks/useGetAllAnnee";
import { useGetAllNiveau } from "@/hooks/useGetAllNiveau";
import { ResultCritere } from "@/constants/Critere";
import { useForm } from "react-hook-form";
import { ResultNiveauSearch } from "@/types/Note";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResultNiveauSearchValidation } from "@/validation/note.validation";
import { usePostResultNiveauInfo } from "@/hooks/usePostResultNiveauInfo";
import { usePostResultNiveauFinal } from "@/hooks/usePostResultNiveauFinal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FormField from "@/components/shared/FormField";
import Combobox from "@/components/ui/combobox";

const ResultatParNiveau: FunctionComponent = () => {
  const { data: annee } = useGetAllAnnee();
  const { data: niveau } = useGetAllNiveau();
  const [isView, setIsView] = useState<boolean>(false);
  const { handleSubmit: search, formState: { errors }, control } = useForm<ResultNiveauSearch>({
    resolver: yupResolver(ResultNiveauSearchValidation),
  });
  const { mutateAsync: getResultInfo } = usePostResultNiveauInfo();
  const { mutateAsync: getResultFinal } = usePostResultNiveauFinal();
  const [resultFinal, setResultFinal] = useState<any>();
  const [resultInfo, setResultInfo] = useState<any>();
  const [selectedAnneeId, setSelectedAnneeId] = useState<string>("");
  const [selectedCritere, setSelectedCritere] = useState<string>("");
  const [selectedNiveauId, setSelectedNiveauId] = useState<number>();

  const handleSubmit = async (data: ResultNiveauSearch) => {
    const i = await getResultInfo(data);
    setResultInfo(i?.data[0]);
    const f = await getResultFinal(data);
    setResultFinal(f?.data);
    setIsView(true);
    setSelectedAnneeId(data?.id_annee);
    setSelectedNiveauId(data?.id_niveau);
    setSelectedCritere(data?.obs);
  };

  const niveauOptions = niveau?.map((niv: any) => ({
    value: String(niv.id_niveau),
    label: `${niv.titre_niveau} ${niv.parcours}`,
  })) || [];

  const anneeOptions = annee?.map((ann: any) => ({
    value: String(ann.id_annee),
    label: ann.libelle,
  })) || [];

  const critereOptions = ResultCritere?.map((c: any) => ({
    value: c,
    label: c,
  })) || [];

  return (
    <div className="px-4 sm:px-10 print:px-0">
      <div className="text-xl font-bold font-lato text-center mb-6 print:hidden">
        RECHERCHER RÉSULTAT D'UN NIVEAU
      </div>
      <form className="flex flex-wrap justify-center gap-2 items-end print:hidden" onSubmit={search(handleSubmit)}>
        <FormField label="Niveau" name="id_niveau" control={control} error={errors.id_niveau} className="md:w-56">
          <Combobox items={niveauOptions} placeholder="Niveau" searchPlaceholder="Rechercher..." />
        </FormField>
        <FormField label="Année" name="id_annee" control={control} error={errors.id_annee} className="md:w-56">
          <Combobox items={anneeOptions} placeholder="Année" searchPlaceholder="Rechercher..." />
        </FormField>
        <FormField label="Critère" name="obs" control={control} error={errors.obs} className="md:w-56">
          <Combobox items={critereOptions} placeholder="Critère" searchPlaceholder="Rechercher..." />
        </FormField>
        <Button type="submit">Rechercher</Button>
      </form>

      {isView && (
        <div className="mt-8 max-w-4xl mx-auto print:hidden">
          <h2 className="text-lg font-bold text-center mb-4">RÉSULTAT</h2>
          {resultInfo && (
            <Card className="mb-6">
              <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
                <div><p className="text-xs text-gray-500">Domaine</p><p className="font-semibold">{resultInfo.domaine}</p></div>
                <div><p className="text-xs text-gray-500">Mention</p><p className="font-semibold">{resultInfo.mention}</p></div>
                <div><p className="text-xs text-gray-500">Parcours</p><p className="font-semibold">{resultInfo.parcours}</p></div>
                <div><p className="text-xs text-gray-500">Niveau</p><p className="font-semibold">{resultInfo.titre_niveau}</p></div>
              </CardContent>
            </Card>
          )}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Matricule</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Nom et prénom</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Résultat</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {resultFinal?.map((final: any, index: any) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{final.matricule}</td>
                    <td className="px-4 py-3 text-sm">{final.nom} {final.prenom}</td>
                    <td className="px-4 py-3 text-sm font-semibold">{final.final}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-6">
            <Button onClick={() => window.print()}><FileOutlined className="mr-1" /> GÉNÉRER LE RÉSULTAT</Button>
          </div>
        </div>
      )}
      <div className="hidden print:block print:mx-0 print:px-0">
        <div className="py-1">
          <div className="px-4">
            <div className="text-center">
              <div className="text-lg font-bold font-lato">UNIVERSITE DE FIANARANTSOA</div>
              <div className="text-lg font-bold font-lato">ECOLE NATIONALE D'INFORMATIQUE</div>
              {resultInfo && (
                <div className="text-right mt-4">ANNEE UNIVERSITAIRE : {resultInfo.libelle}</div>
              )}
              <div className="underline text-xl font-bold font-lato my-1">LISTE DES ETUDIANTS {selectedCritere}</div>
            </div>
            {resultInfo && (
              <div className="font-lato">
                <div className="flex">
                  <div className="font-bold underline mr-2">Parcours:</div>
                  <div>{resultInfo.parcours}</div>
                </div>
                <div className="flex">
                  <div className="font-bold underline mr-2">Niveau:</div>
                  <div>{resultInfo.descri_niveau}</div>
                </div>
              </div>
            )}
            <div className="my-2">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Matricule</th>
                    <th className="px-6 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Nom et prenom</th>
                    <th className="px-6 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Resultat</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {resultFinal && resultFinal.map((final: any, index: any) => (
                    <tr key={index}>
                      <td className="px-6 whitespace-nowrap text-sm leading-5 text-gray-900">{final.matricule}</td>
                      <td className="px-6 whitespace-nowrap text-sm leading-5 text-gray-900">{final.nom} {final.prenom}</td>
                      <td className="px-6 whitespace-nowrap text-sm leading-5 text-gray-900">{final.final}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultatParNiveau;
