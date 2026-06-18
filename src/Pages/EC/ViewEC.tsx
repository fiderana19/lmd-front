import { FunctionComponent } from "react";
import { LoadingOutlined, ArrowLeftOutlined, ReadOutlined } from "@ant-design/icons";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useGetECById } from "@/hooks/useGetECById";
import { useGetAllEC } from "@/hooks/useGetAllEC";
import { useDeleteEC } from "@/hooks/useDeleteEC";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ViewEC: FunctionComponent = () => {
  const req = useParams();
  const ECId = Number(req.id);
  const { data: ec, isLoading: ecLoading } = useGetECById(ECId ? ECId : 0);
  const { refetch: refetchEC } = useGetAllEC();
  const { mutateAsync: deleteEC, isPending: deleteLoading } = useDeleteEC({
    action() { refetchEC(); },
  });
  const navigate = useNavigate();

  const EcDelete = (id: number) => { deleteEC(id); navigate("/admin/ec"); };

  if (ecLoading) return <LoadingSpinner />;

  return (
    <div className="px-4 sm:px-10">
      <Button variant="ghost" className="mb-4" onClick={() => navigate("/admin/ec")}>
        <ArrowLeftOutlined className="mr-1" /> Retour
      </Button>
      {ec && (
        <div className="max-w-4xl mx-auto">
          <div className="text-2xl font-bold font-lato text-gray-800 mb-6">ELEMENT CONSTITUTIF</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ReadOutlined className="text-primary" />
                  {ec[0].nom_ec}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                  Semestre {ec[0].semestre}
                </span>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Valeurs de l'élément</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Poids", value: ec[0].poids_ec },
                  { label: "ET", value: ec[0].et },
                  { label: "EP", value: ec[0].ep },
                  { label: "ED", value: ec[0].ed },
                  { label: "Crédit", value: ec[0].credit_ec },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="font-semibold">{item.value}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Unité d'enseignement</CardTitle></CardHeader>
              <CardContent>
                <p className="font-semibold">{ec[0].id_ue}</p>
              </CardContent>
              <CardContent className="space-y-3 border-t pt-4">
                <Button className="w-full" onClick={() => navigate(`/admin/ec/edit/${ec[0].id_ec}`)}>Modifier</Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">Supprimer</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Suppression d'un élément constitutif</AlertDialogTitle>
                      <AlertDialogDescription>Voulez-vous vraiment supprimer cet élément ?</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction className="m-0 p-0" asChild>
                        <Button onClick={() => EcDelete(ec[0].id_ec)} variant="destructive" disabled={deleteLoading}>
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

export default ViewEC;
