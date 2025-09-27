import { Select, Card } from "antd";
import { Option } from "antd/es/mentions";
import { useState, useEffect, FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import {
  CloseCircleFilled,
  CheckCircleFilled,
  WarningFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import { handleFloatKeyPress } from "@/utils/handleKeyPress";
import Navigation from "@/components/navigation/Navigation";
import { invertLetter } from "@/utils/Format";
import { useGetAllEtudiant } from "@/hooks/useGetAllEtudiant";
import { useGetNiveauById } from "@/hooks/useGetNiveauById";
import { useGetECById } from "@/hooks/useGetECById";
import { usePostNoteByNiveau } from "@/hooks/usePostNoteByNiveau";
import { CreateNote } from "@/types/Note";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateNoteValidation } from "@/validation/note.validation";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { usePostNote } from "@/hooks/usePostNote";
import { useGetAllNote } from "@/hooks/useGetAllNote";

const AddNoteGlobal: FunctionComponent = () => {
  let params = useParams();
  const ec = params.ec ? Number(params.ec) : 0;
  const annee = invertLetter(params.annee ? params?.annee : "");
  const niveau = params.niveau ? Number(params.niveau) : 0;
  const fetchData = { id_ec: ec, id_niveau: niveau, id_annee: annee };
  const { data: etudiant } = useGetAllEtudiant();
  const { data: niv } = useGetNiveauById(Number(niveau) | 0);
  const { data: element } = useGetECById(Number(ec) | 0);
  const { mutateAsync: fetchNotes, data: notes } = usePostNoteByNiveau();
  const {
    handleSubmit: submit,
    formState: { errors },
    control,
    setValue,
  } = useForm<CreateNote>({
    resolver: yupResolver(CreateNoteValidation),
  });
  const { refetch } = useGetAllNote();
  const { mutateAsync: createNote, isPending: createLoading } = usePostNote({
    action() {
      refetchNotes();
      refetch();
    },
  });
  const [searchNote, setSearchNote] = useState<string>("");

  useEffect(() => {
    setValue("id_annee", annee);
    setValue("id_ec", String(ec));
    setValue("id_niveau", String(niveau));
    refetchNotes();
  }, [niveau, ec, annee]);

  async function refetchNotes() {
    await fetchNotes(fetchData);
  }

  const handleSubmit = async (data: CreateNote) => {
    await createNote(data);
  };

  return (
    <div>
      <Navigation />
      <div className="mx-auto pb-5 pt-24 sm:px-10 px-5">
        <div className="lg:whitespace-nowrap whitespace-normal uppercase flex justify-center text-2xl font-bold font-lato">
          NOTE {element?.nom_ec} DES ETUDIANTS {niv?.titre_niveau} EN ANNEE{" "}
          {annee}
        </div>
        <div className="md:flex block justify-between lg:mx-32 mx-5 my-4">
          <Card>
            <form className="my-7 mx-auto" onSubmit={submit(handleSubmit)}>
              <Label htmlFor="id_etudiant" className="mb-1">
                Etudiant :{" "}
              </Label>
              <Controller
                control={control}
                name="id_etudiant"
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    onChange={onChange}
                    className={
                      errors?.id_etudiant
                        ? "border w-full my-1 border-red-500"
                        : "w-full my-1"
                    }
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
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
                            {`${et.nom} ${et.matricule}`}
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
              <Label htmlFor="valeur" className="mb-1 mt-2">
                Note :{" "}
              </Label>
              <Controller
                control={control}
                name="valeur"
                render={({ field: { value, onChange } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    onKeyPress={handleFloatKeyPress}
                    className={errors?.valeur ? "border border-red-500" : ""}
                  />
                )}
              />
              {errors?.valeur && (
                <div className="text-red-500 text-xs">
                  {errors?.valeur?.message}
                </div>
              )}
              <Button type="submit" className="w-full mt-2">
                {createLoading && <LoadingOutlined />}
                Ajouter
              </Button>
            </form>
          </Card>
          <div className="md:w-1/2 w-full md:py-0 py-4">
            <div className="flex justify-end">
              <Input
                className="my-2 mx-1 w-52"
                placeholder="Saisir la matricule..."
                value={searchNote}
                onChange={(e) => setSearchNote(e.target.value)}
              />
            </div>
            <div>
              <table className=" min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Matricule
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Note
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {notes?.data &&
                    notes?.data.map((note: any, index: any) => {
                      if (searchNote && !note.matricule.includes(searchNote)) {
                        return null;
                      }
                      return (
                        <tr key={index}>
                          <td className="px-6 py-4 text-center whitespace-nowrap text-sm leading-5 text-gray-900">
                            {" "}
                            {note.matricule}{" "}
                          </td>
                          <td className="flex justify-center px-6 py-4 text-center whitespace-nowrap text-sm leading-5 text-gray-900">
                            {note.valeur}
                            {note.valeur >= 10 ? (
                              <div className="text-green-700 mx-1">
                                <CheckCircleFilled />
                              </div>
                            ) : note.valeur >= 5 ? (
                              <div className="text-yellow-300 mx-1">
                                <WarningFilled />
                              </div>
                            ) : (
                              <div className="text-red-600 mx-1">
                                <CloseCircleFilled />
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNoteGlobal;
