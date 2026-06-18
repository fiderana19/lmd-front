import { Select } from "antd";
import { FunctionComponent, useEffect } from "react";
import { handleFloatKeyPress, handleNumberKeyPress } from "@/utils/handleKeyPress";
import { useGetAllUE } from "@/hooks/useGetAllUE";
import { LoadingOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Controller, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditECValidation } from "../../validation/ec.validation";
import { useGetAllEC } from "@/hooks/useGetAllEC";
import { useNavigate, useParams } from "react-router-dom";
import { useGetECById } from "@/hooks/useGetECById";
import { usePatchEC } from "@/hooks/usePatchEC";
import { EditECType } from "@/types/EC";
import FormCard from "@/components/shared/FormCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const { Option } = Select;

const EditEC: FunctionComponent = () => {
  const req = useParams();
  const ECId = Number(req.id);
  const { data: ec, isLoading: ecLoading } = useGetECById(ECId ? ECId : 0);
  const { data: ues, isLoading: ueLoading } = useGetAllUE();
  const { refetch: refetchEC } = useGetAllEC();
  const { handleSubmit: submit, formState: { errors }, control, setValue } = useForm<EditECType>({
    resolver: yupResolver(EditECValidation),
  });
  const { mutateAsync: ECEdit, isPending: patchLoading } = usePatchEC({
    action() { refetchEC(); },
  });
  const navigate = useNavigate();

  useEffect(() => { setValue("id_ec", req.id ? req.id : ""); }, []);

  const ECSubmit = (data: EditECType) => { ECEdit(data); navigate("/admin/ec"); };

  if (ecLoading) return <LoadingSpinner />;

  return (
    <FormCard title="MODIFIER UN ELEMENT CONSTITUTIF">
      {ec && (
        <form onSubmit={submit(ECSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="nom_ec">Nom de l'élément</Label>
            <Controller name="nom_ec" control={control} defaultValue={ec[0].nom_ec}
              render={({ field: { value, onChange } }) => <Input value={value} onChange={onChange} />}
            />
            {errors.nom_ec && <p className="text-xs text-red-500 mt-1">{errors.nom_ec.message}</p>}
          </div>
          <div>
            <Label htmlFor="semestre">Semestre</Label>
            <Controller name="semestre" control={control} defaultValue={ec[0].semestre}
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange} className="w-full" placeholder="Sélectionner le semestre">
                  <Option value="Paire">Paire</Option>
                  <Option value="Impaire">Impaire</Option>
                </Select>
              )}
            />
            {errors.semestre && <p className="text-xs text-red-500 mt-1">{errors.semestre.message}</p>}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(["et", "ed", "ep"] as const).map((field) => (
              <div key={field}>
                <Label htmlFor={field}>{field.toUpperCase()}</Label>
                <Controller name={field} control={control} defaultValue={ec[0][field]}
                  render={({ field: { value, onChange } }) => (
                    <Input value={value} onChange={onChange} onKeyPress={handleFloatKeyPress} />
                  )}
                />
                {errors[field] && <p className="text-xs text-red-500 mt-1">{errors[field].message}</p>}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="credit_ec">Crédit</Label>
              <Controller name="credit_ec" control={control} defaultValue={ec[0].credit_ec}
                render={({ field: { value, onChange } }) => (
                  <Input value={value} onChange={onChange} onKeyPress={handleNumberKeyPress} />
                )}
              />
              {errors.credit_ec && <p className="text-xs text-red-500 mt-1">{errors.credit_ec.message}</p>}
            </div>
            <div>
              <Label htmlFor="poids_ec">Poids</Label>
              <Controller name="poids_ec" control={control} defaultValue={ec[0].poids_ec}
                render={({ field: { value, onChange } }) => (
                  <Input value={value} onChange={onChange} onKeyPress={handleFloatKeyPress} />
                )}
              />
              {errors.poids_ec && <p className="text-xs text-red-500 mt-1">{errors.poids_ec.message}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="id_ue">Unité</Label>
            <Controller name="id_ue" control={control} defaultValue={ec[0].id_ue}
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange} className="w-full" placeholder="Sélectionner l'unité"
                  showSearch optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.children?.toLowerCase().includes(input.toLowerCase())
                  }>
                  {ueLoading && <Option value=""><LoadingOutlined /></Option>}
                  {ues?.map((ue: any, index: any) => (
                    <Option key={index} value={ue.id_ue}>{ue.nom_ue} - {ue.credit_ue}</Option>
                  ))}
                </Select>
              )}
            />
            {errors.id_ue && <p className="text-xs text-red-500 mt-1">{errors.id_ue.message}</p>}
          </div>
          <div className="flex justify-between pt-2">
            <Button type="button" variant="ghost" onClick={() => navigate("/admin/ec")}>
              <ArrowLeftOutlined className="mr-1" /> Retour
            </Button>
            <Button type="submit" disabled={patchLoading}>
              {patchLoading && <LoadingOutlined className="mr-1" />} MODIFIER
            </Button>
          </div>
        </form>
      )}
    </FormCard>
  );
};

export default EditEC;
