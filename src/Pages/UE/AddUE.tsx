import { FunctionComponent, lazy, Suspense } from "react";
import { useGetAllUE } from "@/hooks/useGetAllUE";
import { usePostUE } from "@/hooks/usePostUE";
import { Controller, useForm } from "react-hook-form";
import { CreateUEType } from "@/types/UE";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateUEValidation } from "@/validation/ue.validation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { handleNumberKeyPress } from "@/utils/handleKeyPress";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LoadingOutlined } from "@ant-design/icons";
const Navigation = lazy(() => import("@/components/navigation/Navigation"));

const AddUE: FunctionComponent = () => {
  const { refetch: refetchUE } = useGetAllUE();
  const { mutateAsync: createUE, isPending: createLoading } = usePostUE({
    action() {
      refetchUE();
    },
  });
  const {
    handleSubmit: submit,
    formState: { errors },
    control,
  } = useForm<CreateUEType>({
    resolver: yupResolver(CreateUEValidation),
  });
  const navigate = useNavigate();

  const createUESubmit = (data: CreateUEType) => {
    createUE(data);
    navigate("/admin/ue");
  };

  return (
    <div>
      <Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}>
        <Navigation />
      </Suspense>
      <div className="pb-5 pt-24 bg-gray-100 min-h-screen">
        <div className="text-3xl mx-auto w-max font-bold">
          NOUVEAU UNITE D'ENSEIGNEMENT
        </div>
        <form
          className="p-7 mx-auto w-80 bg-white rounded mt-4"
          onSubmit={submit(createUESubmit)}
        >
          <Label htmlFor="nom_ue" className="mb-1">
            Nom de l'UE :{" "}
          </Label>
          <Controller
            name="nom_ue"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                onChange={onChange}
                className={`${errors?.nom_ue && "border border-red-500 text-red-500 rounded"}`}
              />
            )}
          />
          {errors.nom_ue && (
            <div className="text-red-500 text-xs w-full text-left">
              {errors?.nom_ue.message}
            </div>
          )}
          <Label htmlFor="credit_ue" className="mb-1 mt-4">
            Credit de l'UE :{" "}
          </Label>
          <Controller
            name="credit_ue"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                onChange={onChange}
                className={`${errors?.credit_ue && "border border-red-500 text-red-500 rounded"}`}
                onKeyPress={handleNumberKeyPress}
              />
            )}
          />
          {errors.credit_ue && (
            <div className="text-red-500 text-xs w-full text-left">
              {errors?.credit_ue.message}
            </div>
          )}
          <div className="flex justify-center mt-4">
            <Button
              variant={"success"}
              type="submit"
              disabled={createLoading}
              className={`w-full ${createLoading && "cursor-not-allowed"}`}
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

export default AddUE;
