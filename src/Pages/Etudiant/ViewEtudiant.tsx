import { FunctionComponent } from "react";
import { LoadingOutlined, ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
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
import { useGetEtudiantById } from "@/hooks/useGetEtudiantById";
import { useGetAllEtudiant } from "@/hooks/useGetAllEtudiant";
import { useDeleteEtudiant } from "@/hooks/useDeleteEtudiant";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ViewEtudiant: FunctionComponent = () => {
  const req = useParams();
  const etudiantId = Number(req.id);
  const { data: etudiant, isLoading: ecLoading } = useGetEtudiantById(etudiantId ? etudiantId : 0);
  const { refetch: refetchEtudiant } = useGetAllEtudiant();
  const { mutateAsync: etudiantDelete, isPending: deleteLoading } = useDeleteEtudiant({
    action() { refetchEtudiant(); },
  });
  const navigate = useNavigate();

  function handleDelete(itemId: number) {
    etudiantDelete(itemId);
    navigate("/admin/etudiant");
  }

  if (ecLoading) return <LoadingSpinner />;

  return (
    <div className="px-4 sm:px-10">
      <Button variant="ghost" className="mb-4" onClick={() => navigate("/admin/etudiant")}>
        <ArrowLeftOutlined className="mr-1" /> Retour
      </Button>
      {etudiant && (
        <div className="max-w-4xl mx-auto">
          <div className="text-2xl font-bold font-lato text-gray-800 mb-6">ETUDIANT</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserOutlined className="text-primary" />
                  Identité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Nom complet</p>
                  <p className="font-semibold text-gray-800">{etudiant[0].nom} {etudiant[0].prenom}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Matricule</p>
                  <p className="font-semibold text-lg">{etudiant[0].matricule}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Date de naissance</p>
                  <p className="font-semibold">{etudiant[0].date_naiss}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Lieu de naissance</p>
                  <p className="font-semibold">{etudiant[0].lieu_naiss}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" onClick={() => navigate(`/admin/etudiant/edit/${etudiant[0].id_etudiant}`)}>
                  Modifier
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">Supprimer</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Suppression d'un étudiant</AlertDialogTitle>
                      <AlertDialogDescription>Voulez-vous vraiment supprimer cet étudiant ?</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction className="m-0 p-0" asChild>
                        <Button onClick={() => handleDelete(etudiant[0].id_etudiant)} variant="destructive" disabled={deleteLoading}>
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

export default ViewEtudiant;
