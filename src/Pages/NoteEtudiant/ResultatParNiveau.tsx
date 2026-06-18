import { useState, FunctionComponent } from "react";
import { Select } from "antd";
import { FileOutlined, LoadingOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";
import { useGetAllAnnee } from "@/hooks/useGetAllAnnee";
import { useGetAllNiveau } from "@/hooks/useGetAllNiveau";
import { ResultCritere } from "@/constants/Critere";
import { Controller, useForm } from "react-hook-form";
import { ResultNiveauSearch } from "@/types/Note";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResultNiveauSearchValidation } from "@/validation/note.validation";
import { usePostResultNiveauInfo } from "@/hooks/usePostResultNiveauInfo";
import { usePostResultNiveauFinal } from "@/hooks/usePostResultNiveauFinal";
import { Button } from "@/components/ui/button";
import { transformLetter } from "@/utils/Format";
import { Card, CardContent } from "@/components/ui/card";

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

  return (
    <div className="px-4 sm:px-10">
      <div className="text-xl font-bold font-lato text-center mb-6">
        RECHERCHER RÉSULTAT D'UN NIVEAU
      </div>
      <form className="flex flex-wrap justify-center gap-2 items-end" onSubmit={search(handleSubmit)}>
        {(["id_niveau", "id_annee", "obs"] as const).map((field) => (
          <div key={field}>
            <Controller control={control} name={field}
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange}
                  className={errors[field] ? "border md:w-56 w-full border-red-500" : "md:w-56 w-full"}
                  showSearch optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.children?.toLowerCase().includes(input.toLowerCase())
                  }>
                  <Option value="">{field === "id_niveau" ? "Niveau" : field === "id_annee" ? "Année" : "Critère"}</Option>
                  {field === "id_niveau" && niveau?.map((niv: any, i: any) => (
                    <Option key={i} value={niv.id_niveau}>{niv.titre_niveau} {niv.parcours}</Option>
                  ))}
                  {field === "id_annee" && annee?.map((ann: any, i: any) => (
                    <Option key={i} value={ann.id_annee}>{ann.id_annee}</Option>
                  ))}
                  {field === "obs" && ResultCritere.map((c: any, i: any) => (
                    <Option key={i} value={c}>{c}</Option>
                  ))}
                </Select>
              )}
            />
            {errors[field] && <p className="text-xs text-red-500">{errors[field].message}</p>}
          </div>
        ))}
        <Button type="submit">Rechercher</Button>
      </form>

      {isView && (
        <div className="mt-8 max-w-4xl mx-auto">
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
            <a href={`/admin/resultat/pdf/${selectedCritere}/${selectedNiveauId}/${transformLetter(selectedAnneeId)}`} target="_blank">
              <Button><FileOutlined className="mr-1" /> GÉNÉRER LE RÉSULTAT</Button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultatParNiveau;
