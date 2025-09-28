import { DatePicker } from "antd";
import { FunctionComponent, lazy, Suspense, useEffect } from "react";
import dayjs from "dayjs";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { EditEtudiantType } from "@/types/Etudiant";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditEtudiantValidation } from "@/validation/etudiant.validation";
import { useGetAllEtudiant } from "@/hooks/useGetAllEtudiant";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { useGetEtudiantById } from "@/hooks/useGetEtudiantById";
import { usePatchEtudiant } from "@/hooks/usePatchEtudiant";
const Navigation = lazy(() => import("@/components/navigation/Navigation"));

const EditEtudiant: FunctionComponent = () => {
  const req = useParams();
  const etudiantId = Number(req.id);
  const { data: etudiant, isLoading, refetch } = useGetEtudiantById(etudiantId);
  const {
    handleSubmit: submit,
    formState: { errors },
    control,
    setValue,
  } = useForm<EditEtudiantType>({
    resolver: yupResolver(EditEtudiantValidation),
  });
  const { refetch: refetchEtudiant } = useGetAllEtudiant();
  const { mutateAsync: etudiantEdit, isPending: editLoading } =
    usePatchEtudiant({
      action() {
        refetchEtudiant();
        refetch();
      },
    });
  const navigate = useNavigate();

  useEffect(() => {
    setValue("id_etudiant", req.id ? req.id : "");
  }, []);

  const submitEditEtudiant = (data: EditEtudiantType) => {
    etudiantEdit(data);
    navigate("/admin/etudiant");
  };

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format("YYYY-MM-DD");
  };

  return (
    <div>
      <Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}>
        <Navigation />
      </Suspense>
      <div className="pb-5 pt-24 bg-gray-100 min-h-screen">
        <div className="text-3xl mx-auto w-max font-bold">
          MODIFER UN ETUDIANT
        </div>
        {isLoading && <LoadingOutlined className="text-3xl" />}
        {etudiant && (
          <form
            className="p-7 mx-auto w-80 bg-white rounded mt-4"
            onSubmit={submit(submitEditEtudiant)}
          >
            <Label htmlFor="matricule" className="mb-1">
              Matricule :{" "}
            </Label>
            <Controller
              control={control}
              name="matricule"
              defaultValue={etudiant[0].matricule}
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  disabled
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
              defaultValue={etudiant[0].nom}
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
              defaultValue={etudiant[0].prenom}
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
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
              defaultValue={formatDate(etudiant[0].date_naiss)}
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
              defaultValue={etudiant[0].lieu_naiss}
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
                variant={"primary"}
                type="submit"
                disabled={editLoading}
                className={`${editLoading && "cursor-not-allowed"}`}
              >
                {editLoading && <LoadingOutlined />}
                MODIFIER
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditEtudiant;
