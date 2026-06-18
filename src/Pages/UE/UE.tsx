import { useState, FunctionComponent } from "react";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useGetAllUE } from "@/hooks/useGetAllUE";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteUE } from "@/hooks/useDeleteUE";
import PageHeader from "@/components/shared/PageHeader";
import DataTable, { Column } from "@/components/shared/DataTable";

interface UEItem {
  id_ue: number;
  nom_ue: string;
  credit_ue: number;
}

const UE: FunctionComponent = () => {
  const { data: ue, isLoading, refetch: refetchUE } = useGetAllUE();
  const { mutateAsync: ueDelete, isPending: deleteLoading } = useDeleteUE({
    action() { refetchUE(); },
  });
  const navigate = useNavigate();
  const [searchUE, setSearchUE] = useState("");

  const handleDelete = (id: number) => ueDelete(id);

  const filtered = ue?.filter((uee: any) =>
    !searchUE || uee.nom_ue.includes(searchUE)
  );

  const columns: Column<UEItem>[] = [
    { key: "nom_ue", header: "Nom de l'unité", className: "font-medium" },
    { key: "credit_ue", header: "Crédit", className: "text-center" },
    {
      key: "actions", header: "",
      render: (uee) => (
        <div className="flex justify-end gap-1.5">
          <Button size="icon" onClick={() => navigate(`/admin/ue/edit/${uee.id_ue}`)}>
            <EditOutlined />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon"><DeleteOutlined /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Suppression d'une unité d'enseignement</AlertDialogTitle>
                <AlertDialogDescription>Voulez-vous vraiment supprimer cette unité ?</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction className="m-0 p-0" asChild>
                  <Button onClick={() => handleDelete(uee.id_ue)} variant="destructive" disabled={deleteLoading}>
                    {deleteLoading && <span>...</span>} Supprimer
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="LES UNITES D'ENSEIGNEMENTS">
        <Input className="w-48" placeholder="Saisir le nom..." value={searchUE}
          onChange={(e) => setSearchUE(e.target.value)} />
        <Button onClick={() => navigate("/admin/ue/create")}>
          <PlusOutlined className="mr-1" /> AJOUTER
        </Button>
      </PageHeader>
      <div className="px-10">
        <DataTable columns={columns} data={filtered} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default UE;
