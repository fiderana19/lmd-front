import { FunctionComponent, lazy, Suspense } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
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
import { useGetNiveauById } from "@/hooks/useGetNiveauById";
import { useGetAllNiveau } from "@/hooks/useGetAllNiveau";
import { useDeleteNiveau } from "@/hooks/useDeleteNiveau";
const Navigation = lazy(() => import("@/components/navigation/Navigation"));

const ViewNiveau: FunctionComponent = () => {
  const req = useParams();
  const NiveauId = Number(req.id);
  const { data: niveau, isLoading: niveauLoading } = useGetNiveauById(
    NiveauId ? NiveauId : 0,
  );
  const { refetch: refetchNiveau } = useGetAllNiveau();
  const { mutateAsync: deleteNiveau, isPending: deleteLoading } =
    useDeleteNiveau({
      action() {
        refetchNiveau();
      },
    });
  const navigate = useNavigate();

  const NiveauDelete = (id: number) => {
    deleteNiveau(id);
    navigate("/admin/niveau");
  };

  return (
    <div>
      <Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}>
        <Navigation />
      </Suspense>
      <div className="pb-5 pt-24 bg-gray-100 min-h-screen">
        {niveauLoading && (
          <div className="my-4 mx-auto w-max">
            <LoadingOutlined className="text-4xl" />
          </div>
        )}
        {niveau && (
          <div className="mx-20">
            <div className="text-2xl font-bold">NIVEAU</div>
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
                      {niveau[0].titre_niveau}
                    </div>
                  </div>
                  <div className="mb-2">Nom : </div>
                  <div className="border rounded border-gray-100 py-2 px-4 text-gray-500 font-bold">
                    {niveau[0].descri_niveau}
                  </div>
                </div>
              </div>
              <div className="bg-white rounded w-1/3">
                <div className="pt-4 px-4 font-semibold text-lg">
                  Informations
                </div>
                <div className="p-6">
                  <div className="mb-2">Domaine : </div>
                  <div className="border rounded border-gray-100 py-2 px-4 text-gray-500 font-bold text-right text-xl">
                    {niveau[0].domaine}
                  </div>
                  <div className="mt-4 mb-2">Mention : </div>
                  <div className="border rounded border-gray-100 py-2 px-4 text-gray-500 font-bold text-right text-xl">
                    {niveau[0].mention}
                  </div>
                  <div className="mt-4 mb-2">Parcours : </div>
                  <div className="border rounded border-gray-100 py-2 px-4 text-gray-500 font-bold text-right text-xl">
                    {niveau[0].parcours}
                  </div>
                </div>
              </div>
              <div className="w-1/3">
                <div className="bg-white rounded">
                  <div className="pt-4 px-4 font-semibold text-lg">Actions</div>
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <div>Modification : </div>
                      <Button
                        onClick={() =>
                          navigate(`/admin/niveau/edit/${niveau[0].id_niveau}`)
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
                              Suppression d'un niveau
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Voulez-vous vraiment supprimer ce niveau ?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="m-0 p-0">
                              <Button
                                onClick={() =>
                                  NiveauDelete(niveau[0].id_niveau)
                                }
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

export default ViewNiveau;
