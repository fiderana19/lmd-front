import { DatePicker } from "antd";
import { FunctionComponent } from "react";
import dayjs from "dayjs";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { CreateEtudiantType } from "@/types/Etudiant";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateEtudiantValidation } from "@/validation/etudiant.validation";
import { usePostEtudiant } from "@/hooks/usePostEtudiant";
import { useGetAllEtudiant } from "@/hooks/useGetAllEtudiant";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import Navigation from "@/components/navigation/Navigation";

const AddEtudiant: FunctionComponent = () => {
  const {
    handleSubmit: submit,
    formState: { errors },
    control,
  } = useForm<CreateEtudiantType>({
    resolver: yupResolver(CreateEtudiantValidation),
  });
  const { refetch: refetchEtudiant } = useGetAllEtudiant();
  const { mutateAsync: createEtudiant, isPending: createLoading } =
    usePostEtudiant({
      action() {
        refetchEtudiant();
      },
    });
  const navigate = useNavigate();

  const submitCreateEtudiant = (data: CreateEtudiantType) => {
    createEtudiant(data);
    navigate("/admin/etudiant");
  };

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format("YYYY-MM-DD");
  };

  return (
    <div>
      <Navigation />
      <div className="pb-5 pt-24 bg-gray-100 min-h-screen">
        <div className="text-3xl mx-auto w-max font-bold">NOUVEAU ETUDIANT</div>
        <form
          className="p-7 mx-auto w-80 bg-white rounded mt-4"
          onSubmit={submit(submitCreateEtudiant)}
        >
          <Label htmlFor="matricule" className="mb-1">
            Matricule :{" "}
          </Label>
          <Controller
            control={control}
            name="matricule"
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                onChange={onChange}
                className={`${errors.matricule && "border border-red-500 text-red-500 rounded"}`}
              />
            )}
          />
          {errors.matricule && (
            <div className="text-red-500 text-xs w-full">
              {errors.matricule.message}
            </div>
          )}
          <Label htmlFor="nom" className="mb-1 mt-4">
            Nom :{" "}
          </Label>
          <Controller
            control={control}
            name="nom"
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                onChange={onChange}
                className={`${errors.nom && "border border-red-500 text-red-500 rounded"}`}
              />
            )}
          />
          {errors.nom && (
            <div className="text-red-500 text-xs w-full">
              {errors.nom.message}
            </div>
          )}
          <Label htmlFor="prenom" className="mt-4 mb-1">
            Prenom :{" "}
          </Label>
          <Controller
            control={control}
            name="prenom"
            defaultValue=" "
            render={({ field: { value, onChange } }) => (
              <Input
                value={value ? value : " "}
                onChange={onChange}
                className={`${errors.prenom && "border border-red-500 text-red-500 rounded"}`}
              />
            )}
          />
          {errors.prenom && (
            <div className="text-red-500 text-xs w-full">
              {errors.prenom.message}
            </div>
          )}
          <Label htmlFor="date_naiss" className="mt-4 mb-1">
            Date de naissance :{" "}
          </Label>
          <Controller
            control={control}
            name="date_naiss"
            render={({ field: { value, onChange } }) => (
              <DatePicker
                className={`w-full ${errors.date_naiss && "border border-red-500 text-red-500 rounded"}`}
                placeholder=""
                onChange={() => onChange(formatDate(value))}
                value={value ? dayjs(value) : null}
                format="YYYY-MM-DD"
              />
            )}
          />
          {errors.date_naiss && (
            <div className="text-red-500 text-xs w-full">
              {errors.date_naiss.message}
            </div>
          )}
          <Label htmlFor="lieu_naiss" className="mt-4 mb-1">
            Lieu de naissance :{" "}
          </Label>
          <Controller
            control={control}
            name="lieu_naiss"
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                onChange={onChange}
                className={`${errors.lieu_naiss && "border border-red-500 text-red-500 rounded"}`}
              />
            )}
          />
          {errors.lieu_naiss && (
            <div className="text-red-500 text-xs w-full">
              {errors.lieu_naiss.message}
            </div>
          )}
          <div className="flex justify-center mt-4">
            <Button
              variant={"success"}
              type="submit"
              disabled={createLoading}
              className={`${createLoading && "cursor-not-allowed"}`}
            >
              {createLoading && <LoadingOutlined />}
              AJOUTER
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEtudiant;
