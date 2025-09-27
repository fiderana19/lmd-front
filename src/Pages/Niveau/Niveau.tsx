import { useState, FunctionComponent } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
  PlusOutlined,
  EyeFilled,
} from "@ant-design/icons";
import { useGetAllNiveau } from "@/hooks/useGetAllNiveau";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useDeleteNiveau } from "@/hooks/useDeleteNiveau";
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
import Navigation from "@/components/navigation/Navigation";

const Niveau: FunctionComponent = () => {
  const { data: niveau, isLoading, refetch: refecthNiveau } = useGetAllNiveau();
  const { mutateAsync: niveauDelete, isPending: deleteLoading } =
    useDeleteNiveau({
      action() {
        refecthNiveau();
      },
    });
  const [searchNiveau, setSearchNiveau] = useState("");
  const navigate = useNavigate();

  const handleDelete = (id: number) => {
    niveauDelete(id);
  };

  return (
    <div>
      <Navigation />
      <div className="pb-5 pt-24">
        <div className="px-10">
          <div className="block sm:flex justify-between">
            <div className="text-xl font-bold font-lato">LES NIVEAUX</div>
            <div className="flex justify-end items-center gap-1.5">
              <Input
                className="my-1 mx-1 w-52"
                placeholder="Saisir le titre..."
                value={searchNiveau}
                onChange={(e) => setSearchNiveau(e.target.value)}
              />
              <Button onClick={() => navigate("/admin/niveau/create")}>
                <div className="sm:hidden block">
                  <PlusOutlined />
                </div>
                <div className="sm:block hidden"> AJOUTER </div>
              </Button>
            </div>
          </div>
          <div className="my-7">
            <div className="sm:block hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Titre
                    </th>
                    <th className="md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Domaine
                    </th>
                    <th className="md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Mention
                    </th>
                    <th className="md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Parcours
                    </th>
                    <th className="px-1 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {niveau &&
                    niveau.map((niv: any, index: any) => {
                      if (
                        searchNiveau &&
                        !niv.titre_niveau.includes(searchNiveau)
                      ) {
                        return null;
                      }
                      return (
                        <tr key={index}>
                          <td className="md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900">
                            {" "}
                            {niv.titre_niveau}{" "}
                          </td>
                          <td className="md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900">
                            {" "}
                            {niv.descri_niveau}{" "}
                          </td>
                          <td className="md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900">
                            {" "}
                            {niv.domaine}{" "}
                          </td>
                          <td className="md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900">
                            {" "}
                            {niv.mention}{" "}
                          </td>
                          <td className="md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900">
                            {" "}
                            {niv.parcours}{" "}
                          </td>
                          <td className="px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900">
                            <div className="flex justify-center gap-1.5">
                              <Button
                                size={"icon"}
                                variant={"secondary"}
                                onClick={() =>
                                  navigate(
                                    `/admin/niveau/view/${niv.id_niveau}`,
                                  )
                                }
                              >
                                <EyeFilled />
                              </Button>
                              <Button
                                size={"icon"}
                                onClick={() =>
                                  navigate(
                                    `/admin/niveau/edit/${niv.id_niveau}`,
                                  )
                                }
                              >
                                <EditOutlined />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger>
                                  <Button variant={"destructive"} size={"icon"}>
                                    <DeleteOutlined />
                                  </Button>
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
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction className="m-0 p-0">
                                      <Button
                                        onClick={() =>
                                          handleDelete(niv.id_niveau)
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
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              {isLoading && (
                <div className="w-full">
                  <LoadingOutlined className="w-max mx-auto text-3xl" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Niveau;
