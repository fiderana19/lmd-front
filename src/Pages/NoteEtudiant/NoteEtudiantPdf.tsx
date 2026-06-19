import { useState, useEffect, FunctionComponent } from "react";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { usePostEtudiantFinalForResult } from "@/hooks/usePostEtudiantFinalForResult";
import { usePostEtudiantForResult } from "@/hooks/usePostEtudiantForResult";
import { usePostEtudiantMarkForResult } from "@/hooks/usePostEtudiantMarkForResult";
import { usePostEtudiantUnityForResult } from "@/hooks/usePostEtudiantUnityForResult";
import { invertLetter } from "@/utils/Format";

const NoteEtudiantPdf: FunctionComponent = () => {
  let params = useParams();
  const id = params.id ? Number(params?.id) : 0;
  const annee = params?.annee ? invertLetter(params.annee) : "";
  const niveau = params.niveau ? Number(params?.niveau) : 0;
  const fetchData = { id_etudiant: id, id_niveau: niveau, id_annee: annee };
  const { mutateAsync: postEtudiant } = usePostEtudiantForResult();
  const { mutateAsync: postFinal } = usePostEtudiantFinalForResult();
  const { mutateAsync: postMark } = usePostEtudiantMarkForResult();
  const { mutateAsync: postUnity } = usePostEtudiantUnityForResult();
  const [resultEtudiant, setResultEtudiant] = useState<any>();
  const [resultFinal, setResultFinal] = useState<any>();
  const [resultMark, setResultMark] = useState<any>();
  const [resultUnity, setResultUnity] = useState<any>();

  useEffect(() => {
    fetch();
    window.print();

    async function fetch() {
      const et = await postEtudiant(fetchData);
      console.log(et?.data[0]);
      setResultEtudiant(et?.data[0]);
      const f = await postFinal(fetchData);
      setResultFinal(f?.data);
      const m = await postMark(fetchData);
      setResultMark(m?.data);
      const u = await postUnity(fetchData);
      setResultUnity(u?.data);
    }
  }, [id, annee, niveau]);

  return (
    <div>
      <div className="text-xs">
        <div className=" text-center">
          <div className="text-sm font-bold font-lato">
            UNIVERSITE DE FIANARANTSOA
          </div>
          <div className=" text-sm font-bold font-lato">
            ECOLE NATIONALE D'INFORMATIQUE
          </div>
          <div className="underline text-sm font-bold font-lato">
            RELEVE DE NOTES
          </div>
        </div>
        {resultEtudiant && (
          <div>
            <div className="text-sm text-center font-bold font-lato uppercase">
              EN {resultEtudiant.descri_niveau} PROFESSIONNELLE EN
              INFORMATIQUE{" "}
            </div>
            <div className="flex justify-center text-sm">
              <div className="text-center font-bold font-lato mr-2">
                Domaine :{" "}
              </div>
              <div className="text-center font-lato">
                {resultEtudiant.domaine}{" "}
              </div>
            </div>
            <div className="flex justify-between mx-6 text-sm">
              <div className="text-center font-lato ">
                <div className="flex justify-center">
                  <div className="text-center font-bold font-lato mr-2">
                    Mention :{" "}
                  </div>
                  <div className="text-center font-lato">
                    {resultEtudiant.mention}{" "}
                  </div>
                </div>
              </div>
              <div className="text-center font-lato ">
                <div className="flex justify-center">
                  <div className="text-center font-bold font-lato mr-2">
                    Parcours :{" "}
                  </div>
                  <div className="text-center font-lato">
                    {resultEtudiant.parcours}{" "}
                  </div>
                </div>
              </div>
            </div>
            {resultEtudiant && (
              <div className="font-lato">
                <div className="text-center font-lato ">
                  <div className="flex">
                    <div className="underline text-center font-bold font-lato mr-2">
                      Nom et prénoms :{" "}
                    </div>
                    <div className="text-center font-lato">
                      {resultEtudiant.nom} {resultEtudiant.prenom}
                    </div>
                  </div>
                </div>
                <div className="text-center font-lato ">
                  <div className="flex">
                    <div className="underline text-center font-bold font-lato mr-2">
                      Date et lieu de naissance :{" "}
                    </div>
                    <div className="text-center font-lato">
                      {dayjs(resultEtudiant.date_naiss).format("DD-MM-YYYY")} à{" "}
                      {resultEtudiant.lieu_naiss}
                    </div>
                  </div>
                </div>
                <div className="text-center font-lato ">
                  <div className="flex">
                    <div className="underline text-center font-bold font-lato mr-2">
                      Numero d'inscription :{" "}
                    </div>
                    <div className="text-center font-lato">
                      {resultEtudiant.matricule}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end text-xs">
                  <div className="mr-2"> Année universitaire:</div>
                  <div> {resultEtudiant.libelle}</div>
                </div>
              </div>
            )}

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
                        <td className="px-4 py-2 leading-5 text-gray-900 font-semibold align-top" rowSpan={item.notes.length + 1}>
                          {item.nom_ue}
                        </td>
                      )}
                      <td className="px-4 py-1 leading-5 text-gray-900">{note.nom_ec}</td>
                      <td className="px-4 py-1 leading-5 text-gray-900">{note.valeur}</td>
                      {i === 0 && (
                        <td className="px-4 py-2 leading-5 text-gray-900 align-top" rowSpan={item.notes.length + 1}>
                          {item.credit_ue_total}
                        </td>
                      )}
                      {i === 0 && (
                        <td className="px-4 py-2 leading-5 text-gray-900 align-top" rowSpan={item.notes.length + 1}>
                          {item.credit_ue > 0
                            ? <span className="text-green-700"><CheckCircleFilled /> VALIDE</span>
                            : <span className="text-red-700"><CloseCircleFilled /> NON VALIDE</span>
                          }
                        </td>
                      )}
                    </tr>
                  ))}
                  <tr className="bg-gray-50">
                    <td className="px-4 py-1 leading-5 text-gray-900 font-bold text-right" colSpan={2}>MOYENNE</td>
                    <td className="px-4 py-1 leading-5 text-gray-900 font-bold" colSpan={3}>{item.moyenne.toFixed(2)}</td>
                  </tr>
                </tbody>
              ))}
            </table>
            <div>
              {resultMark && (
                <div className="flex justify-around border-t border-t-gray-200">
                  <div className="px-6 flex justify-between whitespace-nowrap text-xs leading-5 text-gray-900 border-r border-r-gray-200">
                    <div className="font-bold mr-2">MOYENNE GENERALE </div>
                    <div> {resultMark.moyenne_generale} </div>
                  </div>
                  <div className="px-6 flex justify-between whitespace-nowrap text-xs leading-5 text-gray-900 ">
                    <div className="font-bold mr-2">TOTAL CREDITS </div>
                    <div> {resultMark.total_credits}/{resultMark.total_credits_possible} </div>
                  </div>
                </div>
              )}
              <div className="text-xs first-line:px-6 flex whitespace-nowrap leading-5 text-gray-900 font-bold border-y border-y-gray-200 ">
                <div className="mr-1">OBSERVATION FINALE : </div>
                {resultFinal && <div> {resultFinal} </div>}
              </div>
            </div>
          </div>
        )}
        <div className="text-right mt-1">
          <div className="text-sm font-lato">
            Fait à Fianarantsoa , le ....................
          </div>
        </div>
        <div className="flex mt-14">
          <div className="text-xs underline font-lato">NOTE IMPORTANTE :</div>
          <div className="text-xs font-bold font-lato">
            Ce relevé de notes être remis en aucun cas à l'interessé sous peine
            d'annulation
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteEtudiantPdf;
