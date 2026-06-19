import { useState, FunctionComponent } from "react";
import { EditOutlined, DeleteOutlined,   EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { useGetAllEC } from "@/hooks/useGetAllEC";
import { useDeleteEC } from "@/hooks/useDeleteEC";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/shared/PageHeader";
import DataTable, { Column } from "@/components/shared/DataTable";

interface ECItem {
  id_ec: number;
  nom_ec: string;
  semestre: string;
  credit_ec: number;
  poids_ec: number;
  id_ue: number;
  nom_ue: string;
}

const EC: FunctionComponent = () => {
  const { data: ecs, isLoading: ECSLoading, refetch: refectchEC } = useGetAllEC();
  const { mutateAsync: deleteEC, isPending: deleteLoading } = useDeleteEC({
    action() { refectchEC(); },
  });
  const [searchEC, setSearchEC] = useState("");
  const navigate = useNavigate();

  function handleDelete(id: number) { deleteEC(id); }

  const filtered = ecs?.filter((element: any) =>
    !searchEC || element.nom_ec.includes(searchEC)
  );

  const columns: Column<ECItem>[] = [
    { key: "nom_ec", header: "Élément", className: "font-medium" },
    { key: "semestre", header: "Semestre" },
    { key: "credit_ec", header: "Crédit", className: "text-center" },
    { key: "poids_ec", header: "Poids", className: "text-center" },
    { key: "nom_ue", header: "Unité" },
    {
      key: "actions", header: "",
      render: (element) => (
        <div className="flex justify-end gap-1.5">
          <Button size="icon" variant="secondary" onClick={() => navigate(`/admin/ec/view/${element.id_ec}`)}>
            <EyeOutlined />
          </Button>
          <Button size="icon" onClick={() => navigate(`/admin/ec/edit/${element.id_ec}`)}>
            <EditOutlined />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon"><DeleteOutlined /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Suppression d'un élément constitutif</AlertDialogTitle>
                <AlertDialogDescription>Voulez-vous vraiment supprimer cet élément ?</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction className="m-0 p-0" asChild>
                  <Button onClick={() => handleDelete(element.id_ec)} variant="destructive" disabled={deleteLoading}>
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
      <PageHeader title="LES ELEMENTS CONSTITUTIFS">
        <Input className="w-48" placeholder="Saisir le nom..." value={searchEC}
          onChange={(e) => setSearchEC(e.target.value)} />
        <Button onClick={() => navigate("/admin/ec/create")}>
          <PlusOutlined className="mr-1" /> AJOUTER
        </Button>
      </PageHeader>
      <DataTable columns={columns} data={filtered} isLoading={ECSLoading} />
    </div>
  );
};

export default EC;
