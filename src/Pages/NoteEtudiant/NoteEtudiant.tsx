import { useState, FunctionComponent, Suspense, lazy } from "react";
import { Select } from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  FileOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Option } from "antd/es/mentions";
const Navigation = lazy(() => import("@/components/navigation/Navigation"));
import { useGetAllEtudiant } from "@/hooks/useGetAllEtudiant";
import { useGetAllNiveau } from "@/hooks/useGetAllNiveau";
import { useGetAllAnnee } from "@/hooks/useGetAllAnnee";
import { Controller, useForm } from "react-hook-form";
import { NoteEtudiantSearch } from "@/types/Note";
import { usePostEtudiantForResult } from "@/hooks/usePostEtudiantForResult";
import { usePostEtudiantFinalForResult } from "@/hooks/usePostEtudiantFinalForResult ";
import { usePostEtudiantMarkForResult } from "@/hooks/usePostEtudiantMarkForResult";
import { usePostEtudiantUnityForResult } from "@/hooks/usePostEtudiantUnityForResult";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { NoteEtudiantSearchValidation } from "@/validation/note.validation";
import { transformLetter } from "@/utils/Format";

const NoteEtudiant: FunctionComponent = () => {
  const { data: etudiant } = useGetAllEtudiant();
  const { data: niveau } = useGetAllNiveau();
  const { data: annee } = useGetAllAnnee();
  const {
    handleSubmit: submit,
    formState: { errors },
    control,
  } = useForm<NoteEtudiantSearch>({
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

  return (
    <div>
      <Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}>
        <Navigation />
      </Suspense>
      <div className="pb-5 pt-24">
        <div className="lg:px-5 px-1">
          <div className="text-xl text-center font-bold font-lato mb-3">
            RECHERCHER NOTE D'UN ETUDIANT
          </div>
          <form
            className="lg:flex block lg:justify-end text-center items-center"
            onSubmit={submit(handleSubmit)}
          >
            <div className="mx-1">
              <Controller
                control={control}
                name="id_etudiant"
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    onChange={onChange}
                    className={
                      errors?.id_etudiant
                        ? "border md:w-56 w-full my-1 border-red-500"
                        : "md:w-56 w-full my-1"
                    }
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option: any) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="">Sélectionnez un etudiant</Option>
                    {etudiant &&
                      etudiant.map((et: any, index: any) => {
                        return (
                          <Option key={index} value={et.id_etudiant}>
                            {`${et.matricule} ${et.nom} ${et.prenom} `}
                          </Option>
                        );
                      })}
                  </Select>
                )}
              />
              {errors?.id_etudiant && (
                <div className="text-red-500 text-xs">
                  {errors?.id_etudiant?.message}
                </div>
              )}
            </div>
            <div className="mx-1">
              <Controller
                control={control}
                name="id_niveau"
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    onChange={onChange}
                    className={
                      errors?.id_niveau
                        ? "border md:w-56 w-full my-1 border-red-500"
                        : "md:w-56 w-full my-1"
                    }
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option: any) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="">Sélectionnez un niveau</Option>
                    {niveau &&
                      niveau.map((niv: any, index: any) => {
                        return (
                          <Option key={index} value={niv.id_niveau}>
                            {`${niv.titre_niveau} ${niv.parcours}`}
                          </Option>
                        );
                      })}
                  </Select>
                )}
              />
              {errors?.id_niveau && (
                <div className="text-red-500 text-xs">
                  {errors?.id_niveau?.message}
                </div>
              )}
            </div>
            <div className="mx-1">
              <Controller
                control={control}
                name="id_annee"
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    onChange={onChange}
                    className={
                      errors?.id_annee
                        ? "border md:w-56 w-full my-1 border-red-500"
                        : "md:w-56 w-full my-1"
                    }
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option: any) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="">Sélectionnez une année</Option>
                    {annee &&
                      annee.map((ann: any, index: any) => {
                        return (
                          <Option key={index} value={ann.id_annee}>
                            {`${ann.id_annee}`}
                          </Option>
                        );
                      })}
                  </Select>
                )}
              />
              {errors?.id_annee && (
                <div className="text-red-500 text-xs">
                  {errors?.id_annee?.message}
                </div>
              )}
            </div>
            <div className="md:block flex justify-center mx-1">
              <Button type="submit">Rechercher</Button>
            </div>
          </form>
          {isView && (
            <div>
              <div className="text-xl text-center font-bold font-lato my-6">
                NOTE D'UN ETUDIANT
              </div>
              {resultEtudiant && (
                <div className="font-lato">
                  <div className="flex">
                    <div className="font-bold underline mr-2"> Etudiant:</div>{" "}
                    <div>
                      {" "}
                      {resultEtudiant.nom} {resultEtudiant.prenom}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="font-bold underline mr-2">
                      {" "}
                      Numero d'inscription:{" "}
                    </div>
                    <div> {resultEtudiant.matricule} </div>
                  </div>
                  <div className="flex">
                    <div className="font-bold underline mr-2"> Niveau:</div>
                    <div> {resultEtudiant.titre_niveau}</div>
                  </div>
                  <div className="text-right">
                    Année universitaire: {resultEtudiant.id_annee}
                  </div>
                </div>
              )}

              <table className="text-center min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="md:px-6 px-2 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      UE
                    </th>
                    <th className="flex justify-between md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      <div>EC</div>
                      <div>Notes/20</div>
                    </th>
                    <th className="md:px-6 px-2 py-3 bg-gray-50  text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Credits
                    </th>
                    <th className="md:px-6 px-2 py-3 bg-gray-50  text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Validation
                    </th>
                  </tr>
                </thead>
                {resultUnity &&
                  resultUnity.map((item: any, index: any) => (
                    <tbody
                      key={index}
                      className="bg-white divide-y divide-gray-200"
                    >
                      <tr key={item.id_ue}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-900">
                          {" "}
                          {item.id_ue}
                        </td>
                        {item.notes.map((note: any) => (
                          <div
                            className="flex justify-between"
                            key={note.nom_ec}
                          >
                            <td className="md:px-6 px-2 py-4 sm:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900">
                              {note.nom_ec}{" "}
                            </td>
                            <td className="mr-6 md:px-6 px-2 py-4 whitespace-nowrap text-sm leading-5 text-gray-900">
                              {" "}
                              {note.valeur}
                            </td>
                          </div>
                        ))}
                        <td className="md:px-6 px-2 py-4 whitespace-nowrap text-sm leading-5 text-gray-900">
                          {item.credit_ue}
                        </td>
                        <td className="md:px-6 px-2 py-4 whitespace-nowrap text-sm leading-5 text-gray-900  flex justify-center">
                          {item.credit_ue > 0 ? (
                            <div className="text-green-700 mx-1 flex">
                              <div>
                                <CheckCircleFilled />
                              </div>
                              <div className="ml-1"> VALIDE </div>{" "}
                            </div>
                          ) : (
                            <div className="text-red-700 mx-1 flex">
                              <div>
                                <CloseCircleFilled />
                              </div>
                              <div className="ml-1">NON VALIDE </div>{" "}
                            </div>
                          )}
                        </td>
                      </tr>
                      <tr key={item.id_ue}>
                        <td></td>
                        <td className="md:px-6 px-2 py-4 whitespace-nowrap text-sm leading-5 text-gray-900 flex justify-end mr-6 font-bold">
                          {" "}
                          <div>MOYENNE </div>{" "}
                          <div className="ml-4">{item.moyenne.toFixed(2)} </div>
                        </td>
                        <td> </td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  ))}
              </table>
              <div>
                {resultMark && (
                  <div className="flex justify-around border-t border-t-gray-200">
                    <div className="px-6 py-4 flex justify-between whitespace-nowrap text-sm leading-5 text-gray-900 border-r border-r-gray-200">
                      <div className="font-bold mr-2">MOYENNE GENERALE </div>
                      <div> {resultMark.moyenne_generale} </div>
                    </div>
                    <div className="px-6 py-4 flex justify-between whitespace-nowrap text-sm leading-5 text-gray-900 ">
                      <div className="font-bold mr-2">TOTAL CREDITS </div>
                      <div> {resultMark.total_credits}/60 </div>
                    </div>
                  </div>
                )}
                <div className="px-6 py-4 flex whitespace-nowrap text-sm leading-5 text-gray-900 font-bold border-y border-y-gray-200 ">
                  <div className="mr-1">OBSERVATION FINALE : </div>
                  {resultFinal && <div> {resultFinal} </div>}
                </div>
              </div>
              <div className="flex justify-end my-10">
                <a
                  href={`/admin/releve/pdf/${selectedEtudiantId}/${selectedNiveauId}/${transformLetter(selectedAnneeId)}`}
                  target="_blank"
                >
                  <Button variant={"secondary"}>
                    <FileOutlined /> GENERER UN RELEVE DE NOTES
                  </Button>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteEtudiant;
