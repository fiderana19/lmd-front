import { Select } from "antd";
import { Option } from "antd/es/mentions";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllNiveau } from "@/hooks/useGetAllNiveau";
import { useGetAllEC } from "@/hooks/useGetAllEC";
import { useGetAllAnnee } from "@/hooks/useGetAllAnnee";
import { Controller, useForm } from "react-hook-form";
import { CreateGlobalNote } from "@/types/Note";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateGlobalNoteValidation } from "../../validation/note.validation";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LoadingOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { transformLetter } from "@/utils/Format";
import FormCard from "@/components/shared/FormCard";

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

  return (
    <FormCard title="AJOUT GLOBAL DES NOTES">
      <form onSubmit={submit(handleSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="niveau">Niveau</Label>
          <Controller control={control} name="niveau"
            render={({ field: { value, onChange } }) => (
              <Select value={value} onChange={onChange}
                className={errors.niveau ? "border w-full border-red-500" : "w-full"}
                showSearch optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  option.children?.toLowerCase().includes(input.toLowerCase())
                }>
                <Option value="">Sélectionnez un niveau</Option>
                {niveauLoading && <Option value=""><LoadingOutlined /></Option>}
                {niveau?.map((niv: any, index: any) => (
                  <Option key={index} value={niv.id_niveau}>{niv.titre_niveau} - {niv.parcours}</Option>
                ))}
              </Select>
            )}
          />
          {errors.niveau && <p className="text-xs text-red-500 mt-1">{errors.niveau.message}</p>}
        </div>
        <div>
          <Label htmlFor="ec">Élément Constitutif</Label>
          <Controller control={control} name="ec"
            render={({ field: { value, onChange } }) => (
              <Select value={value} onChange={onChange}
                className={errors.ec ? "border w-full border-red-500" : "w-full"}
                showSearch optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  option.children?.toLowerCase().includes(input.toLowerCase())
                }>
                <Option value="">Sélectionnez un élément</Option>
                {ecLoading && <Option value=""><LoadingOutlined /></Option>}
                {ec?.map((element: any, index: any) => (
                  <Option key={index} value={element.id_ec}>{element.nom_ec} - {element.id_ue}</Option>
                ))}
              </Select>
            )}
          />
          {errors.ec && <p className="text-xs text-red-500 mt-1">{errors.ec.message}</p>}
        </div>
        <div>
          <Label htmlFor="annee">Année universitaire</Label>
          <Controller control={control} name="annee"
            render={({ field: { value, onChange } }) => (
              <Select value={value} onChange={onChange}
                className={errors.annee ? "border w-full border-red-500" : "w-full"}
                showSearch optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  option.children?.toLowerCase().includes(input.toLowerCase())
                }>
                <Option value="">Sélectionnez une année</Option>
                {anneeLoading && <Option value=""><LoadingOutlined /></Option>}
                {annee?.map((ann: any, index: any) => (
                  <Option key={index} value={ann.id_annee}>{ann.id_annee}</Option>
                ))}
              </Select>
            )}
          />
          {errors.annee && <p className="text-xs text-red-500 mt-1">{errors.annee.message}</p>}
        </div>
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
