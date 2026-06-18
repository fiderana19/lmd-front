import { useState, FunctionComponent } from "react";
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined } from "@ant-design/icons";
import { useGetAllNiveau } from "@/hooks/useGetAllNiveau";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useDeleteNiveau } from "@/hooks/useDeleteNiveau";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import PageHeader from "@/components/shared/PageHeader";
import DataTable, { Column } from "@/components/shared/DataTable";

interface NiveauItem {
  id_niveau: number;
  titre_niveau: string;
  descri_niveau: string;
  domaine: string;
  mention: string;
  parcours: string;
}

const Niveau: FunctionComponent = () => {
  const { data: niveau, isLoading, refetch: refecthNiveau } = useGetAllNiveau();
  const { mutateAsync: niveauDelete, isPending: deleteLoading } = useDeleteNiveau({
    action() { refecthNiveau(); },
  });
  const [searchNiveau, setSearchNiveau] = useState("");
  const navigate = useNavigate();

  const handleDelete = (id: number) => niveauDelete(id);

  const filtered = niveau?.filter((niv: any) =>
    !searchNiveau || niv.titre_niveau.includes(searchNiveau)
  );

  const columns: Column<NiveauItem>[] = [
    { key: "titre_niveau", header: "Titre", className: "font-medium" },
    { key: "descri_niveau", header: "Description" },
    { key: "domaine", header: "Domaine" },
    { key: "mention", header: "Mention" },
    { key: "parcours", header: "Parcours" },
    {
      key: "actions", header: "",
      render: (niv) => (
        <div className="flex justify-end gap-1.5">
          <Button size="icon" variant="secondary" onClick={() => navigate(`/admin/niveau/view/${niv.id_niveau}`)}>
            <EyeOutlined />
          </Button>
          <Button size="icon" onClick={() => navigate(`/admin/niveau/edit/${niv.id_niveau}`)}>
            <EditOutlined />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon"><DeleteOutlined /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Suppression d'un niveau</AlertDialogTitle>
                <AlertDialogDescription>Voulez-vous vraiment supprimer ce niveau ?</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction className="m-0 p-0" asChild>
                  <Button onClick={() => handleDelete(niv.id_niveau)} variant="destructive" disabled={deleteLoading}>
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
      <PageHeader title="LES NIVEAUX">
        <Input className="w-48" placeholder="Saisir le titre..." value={searchNiveau}
          onChange={(e) => setSearchNiveau(e.target.value)} />
        <Button onClick={() => navigate("/admin/niveau/create")}>
          <PlusOutlined className="mr-1" /> AJOUTER
        </Button>
      </PageHeader>
      <DataTable columns={columns} data={filtered} isLoading={isLoading} />
    </div>
  );
};

export default Niveau;
