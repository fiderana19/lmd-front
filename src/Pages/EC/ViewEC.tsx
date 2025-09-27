import { FunctionComponent } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Button } from "@/components/ui/button";
import { useGetAllEC } from "@/hooks/useGetAllEC";
import { useNavigate, useParams } from "react-router-dom";
import { useGetECById } from "@/hooks/useGetECById";
import Bg from "../../assets/pic/home-bg.jpg";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteEC } from "@/hooks/useDeleteEC";
import Navigation from "@/components/navigation/Navigation";

const ViewEC: FunctionComponent = () => {
  const req = useParams();
  const ECId = Number(req.id);
  const { data: ec, isLoading: ecLoading } = useGetECById(ECId ? ECId : 0);
  const { refetch: refetchEC } = useGetAllEC();
  const { mutateAsync: deleteEC, isPending: deleteLoading } = useDeleteEC({
    action() {
      refetchEC();
    },
  });
  const navigate = useNavigate();

  const EcDelete = (id: number) => {
    deleteEC(id);
    navigate("/admin/ec");
  };

  return (
    <div>
      <Navigation />
      <div className="pb-5 pt-24 bg-gray-100 min-h-screen">
        {ecLoading && (
          <div className="my-4 mx-auto w-max">
            <LoadingOutlined className="text-4xl" />
          </div>
        )}
        {ec && (
          <div className="mx-20">
            <div className="text-2xl font-bold">ELEMENT CONSTITUTIF</div>
            <div className="my-2 flex justify-between gap-4">
              <div className="bg-white rounded w-1/3">
                <img
                  src={Bg}
                  alt=""
                  className="w-full h-64 object-cover mx-auto rounded"
                />
                <div className="p-6">
                  <div className="flex justify-end">
                    <div className="border rounded-full bg-gray-100 text-xs border-gray-100 p-1 text-gray-500 font-bold">
                      Semestre {ec[0].semestre}
                    </div>
                  </div>
                  <div className="mb-2">Nom de l'element : </div>
                  <div className="border rounded border-gray-100 py-2 px-4 text-gray-500 font-bold">
                    {ec[0].nom_ec}
                  </div>
                </div>
              </div>
              <div className="bg-white rounded w-1/3">
                <div className="pt-4 px-4 font-semibold text-lg">
                  Les valeurs de l'element
                </div>
                <div className="p-6">
                  <div className="mb-2">Poids de l'element : </div>
                  <div className="border rounded border-gray-100 py-2 px-4 text-gray-500 font-bold text-right text-xl">
                    {ec[0].poids_ec}
                  </div>
                  <div className="mt-4 mb-2">ET de l'element : </div>
                  <div className="border rounded border-gray-100 py-2 px-4 text-gray-500 font-bold text-right text-xl">
                    {ec[0].et}
                  </div>
                  <div className="mt-4 mb-2">EP de l'element : </div>
                  <div className="border rounded border-gray-100 py-2 px-4 text-gray-500 font-bold text-right text-xl">
                    {ec[0].ep}
                  </div>
                  <div className="mt-4">ED de l'element : </div>
                  <div className="border rounded border-gray-100 py-2 px-4 text-gray-500 font-bold text-right text-xl">
                    {ec[0].ed}
                  </div>
                </div>
              </div>
              <div className="w-1/3">
                <div className="bg-white rounded">
                  <div className="pt-4 px-4 font-semibold text-lg">
                    L'unité d'enseignement de l'element
                  </div>
                  <div className="p-6">
                    <div className="mb-2">Unité d'enseignement : </div>
                    <div className="border rounded border-gray-100 py-2 px-4 text-gray-500 font-bold">
                      {ec[0].id_ue}
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded mt-4">
                  <div className="pt-4 px-4 font-semibold text-lg">Actions</div>
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <div>Modification : </div>
                      <Button
                        onClick={() =>
                          navigate(`/admin/ec/edit/${ec[0].id_ec}`)
                        }
                      >
                        Modifier
                      </Button>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div>Suppression : </div>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Button variant={"destructive"}>Supprimer</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Suppression d'un element constitutif
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Voulez-vous vraiment supprimer cet element ?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="m-0 p-0">
                              <Button
                                onClick={() => EcDelete(ec[0].id_ec)}
                                variant={"destructive"}
                                disabled={deleteLoading}
                                className={`${deleteLoading && "cursor-not-allowed"}`}
                              >
                                {deleteLoading && <LoadingOutlined />}
                                Supprimer
                              </Button>
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewEC;
