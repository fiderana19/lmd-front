import { useState, FunctionComponent } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useGetAllEtudiant } from "@/hooks/useGetAllEtudiant";
import { useDeleteEtudiant } from "@/hooks/useDeleteEtudiant";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
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
import PageHeader from "@/components/shared/PageHeader";
import DataTable, { Column } from "@/components/shared/DataTable";
import EmptyState from "@/components/shared/EmptyState";

interface EtudiantItem {
  id_etudiant: number;
  matricule: string;
  nom: string;
  prenom: string;
  date_naiss: string;
  lieu_naiss: string;
}

const Etudiant: FunctionComponent = () => {
  const { data: etudiants, isLoading, refetch: refetchEtudiant } = useGetAllEtudiant();
  const { mutateAsync: etudiantDelete, isPending: deleteLoading } = useDeleteEtudiant({
    action() { refetchEtudiant(); },
  });
  const [searchEtudiant, setSearchEtudiant] = useState("");
  const navigate = useNavigate();

  function handleDelete(itemId: number) {
    etudiantDelete(itemId);
  }

  const filtered = etudiants?.filter((et: any) =>
    !searchEtudiant || et.matricule.includes(searchEtudiant)
  );

  const columns: Column<EtudiantItem>[] = [
    { key: "matricule", header: "Matricule", className: "font-medium" },
    {
      key: "nom",
      header: "Nom et prénoms",
      render: (et) => `${et.nom} ${et.prenom}`,
    },
    {
      key: "date_naiss",
      header: "Date de naissance",
      className: "text-center",
      render: (et) => dayjs(et.date_naiss).format("DD-MM-YYYY"),
    },
    {
      key: "lieu_naiss",
      header: "Lieu de naissance",
      className: "text-center",
    },
    {
      key: "actions",
      header: "",
      className: "text-right",
      render: (et) => (
        <div className="flex justify-end gap-1.5">
          <Button size="icon" variant="secondary" onClick={() => navigate(`/admin/etudiant/view/${et.id_etudiant}`)}>
            <EyeOutlined />
          </Button>
          <Button size="icon" onClick={() => navigate(`/admin/etudiant/edit/${et.id_etudiant}`)}>
            <EditOutlined />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon"><DeleteOutlined /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Suppression d'un étudiant</AlertDialogTitle>
                <AlertDialogDescription>Voulez-vous vraiment supprimer cet étudiant ?</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction className="m-0 p-0" asChild>
                  <Button onClick={() => handleDelete(et.id_etudiant)} variant="destructive" disabled={deleteLoading}>
                    {deleteLoading && <span className="mr-1">...</span>}Supprimer
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
      <PageHeader title="LES ETUDIANTS">
        <Input
          className="w-48"
          placeholder="Saisir la matricule..."
          value={searchEtudiant}
          onChange={(e) => setSearchEtudiant(e.target.value)}
        />
        <Button onClick={() => navigate("/admin/etudiant/create")}>
          <PlusOutlined className="mr-1" /> AJOUTER
        </Button>
      </PageHeader>
      <DataTable columns={columns} data={filtered} isLoading={isLoading} />
    </div>
  );
};

export default Etudiant;
