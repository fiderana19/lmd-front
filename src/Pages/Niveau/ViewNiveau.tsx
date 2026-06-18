import { FunctionComponent } from "react";
import { LoadingOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useGetNiveauById } from "@/hooks/useGetNiveauById";
import { useGetAllNiveau } from "@/hooks/useGetAllNiveau";
import { useDeleteNiveau } from "@/hooks/useDeleteNiveau";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UnorderedListOutlined } from "@ant-design/icons";

const ViewNiveau: FunctionComponent = () => {
  const req = useParams();
  const NiveauId = Number(req.id);
  const { data: niveau, isLoading: niveauLoading } = useGetNiveauById(NiveauId ? NiveauId : 0);
  const { refetch: refetchNiveau } = useGetAllNiveau();
  const { mutateAsync: deleteNiveau, isPending: deleteLoading } = useDeleteNiveau({
    action() { refetchNiveau(); },
  });
  const navigate = useNavigate();

  const NiveauDelete = (id: number) => { deleteNiveau(id); navigate("/admin/niveau"); };

  if (niveauLoading) return <LoadingSpinner />;

  return (
    <div className="px-4 sm:px-10">
      <Button variant="ghost" className="mb-4" onClick={() => navigate("/admin/niveau")}>
        <ArrowLeftOutlined className="mr-1" /> Retour
      </Button>
      {niveau && (
        <div className="max-w-4xl mx-auto">
          <div className="text-2xl font-bold font-lato text-gray-800 mb-6">NIVEAU</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UnorderedListOutlined className="text-primary" />
                  {niveau[0].titre_niveau}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{niveau[0].descri_niveau}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Informations</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Domaine</p>
                  <p className="font-semibold">{niveau[0].domaine}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Mention</p>
                  <p className="font-semibold">{niveau[0].mention}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Parcours</p>
                  <p className="font-semibold">{niveau[0].parcours}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" onClick={() => navigate(`/admin/niveau/edit/${niveau[0].id_niveau}`)}>Modifier</Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">Supprimer</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Suppression d'un niveau</AlertDialogTitle>
                      <AlertDialogDescription>Voulez-vous vraiment supprimer ce niveau ?</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction className="m-0 p-0" asChild>
                        <Button onClick={() => NiveauDelete(niveau[0].id_niveau)} variant="destructive" disabled={deleteLoading}>
                          {deleteLoading && <LoadingOutlined />} Supprimer
                        </Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewNiveau;
