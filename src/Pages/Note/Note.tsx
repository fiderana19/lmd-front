import { useState, FunctionComponent, Suspense, lazy } from "react";
import { Dropdown, Modal } from "antd";
import {
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  WarningFilled,
  SearchOutlined,
  UnorderedListOutlined,
  WarningOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const AddNote = lazy(() => import("./AddNote"));
import { handleFloatKeyPress } from "@/utils/handleKeyPress";
import { useGetAllNote } from "../../hooks/useGetAllNote";
import { EditNote } from "@/types/Note";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditNoteValidation } from "@/validation/note.validation";
import { Button } from "@/components/ui/button";
import { usePatchNote } from "@/hooks/usePatchNote";
import { useDeleteNote } from "@/hooks/useDeleteNote";
import PageHeader from "@/components/shared/PageHeader";
import DataTable, { Column } from "@/components/shared/DataTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormField from "@/components/shared/FormField";

const Note: FunctionComponent = () => {
  const { data: note, isLoading: noteLoading, refetch: refetchNote } = useGetAllNote();
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<EditNote | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<EditNote | null>(null);
  const [editedItem, setEditedItem] = useState<EditNote | null>(null);
  const {
    handleSubmit: editSubmit,
    formState: { errors },
    control,
    setValue: setEditValue,
  } = useForm<EditNote>({ resolver: yupResolver(EditNoteValidation) });
  const { mutateAsync: editNote, isPending: editLoading } = usePatchNote({
    action() { refetchNote(); },
  });
  const { mutateAsync: deleteNote, isPending: deleteLoading } = useDeleteNote({
    action() { refetchNote(); },
  });

  const items = [
    {
      label: (
        <Link to="/admin/note/etudiant">
          <div className="px-4 py-1"><UserOutlined /> NOTE D'UN ETUDIANT</div>
        </Link>
      ),
      key: "01",
    },
    {
      label: (
        <Link to="/admin/note/result">
          <div className="px-4 py-1"><UnorderedListOutlined /> RESULTAT D'UN NIVEAU</div>
        </Link>
      ),
      key: "1",
    },
  ];

  const showDeleteConfirmation = (item: EditNote) => {
    setItemToDelete(item);
    setIsDeleteModalVisible(true);
  };

  async function handleDeleteNote(itemId: number) {
    await deleteNote(itemId);
    setIsDeleteModalVisible(false);
  }

  function EditNoteModal(item: EditNote) {
    setSelectedItem(item);
    setEditedItem(item);
    setEditValue("id_note", item?.id_note);
    setEditValue("valeur", item?.valeur);
    setEditValue("id_etudiant", item?.id_etudiant);
    setEditValue("id_niveau", item?.id_niveau);
    setEditValue("id_ec", item?.id_ec);
    setEditValue("id_annee", item?.id_annee);
    setIsEditModalOpen(true);
  }

  const handleSubmitEdit = async (data: EditNote) => {
    await editNote(data);
    setIsEditModalOpen(false);
  };

  const scoreIcon = (valeur: number) => {
    if (valeur >= 10) return <CheckCircleFilled className="text-green-600" />;
    if (valeur >= 5) return <WarningFilled className="text-yellow-400" />;
    return <CloseCircleFilled className="text-red-600" />;
  };

  const columns: Column<any>[] = [
    { key: "id_etudiant", header: "Étudiant" },
    { key: "id_niveau", header: "Niveau" },
    { key: "id_ec", header: "EC" },
    { key: "id_annee", header: "Année" },
    {
      key: "valeur", header: "Note",
      render: (n: any) => (
        <span className="flex items-center gap-2">
          {n.valeur} {scoreIcon(n.valeur)}
        </span>
      ),
    },
    {
      key: "actions", header: "",
      render: (n: any) => (
        <div className="flex justify-end gap-1.5">
          <Button size="icon" onClick={() => EditNoteModal(n)}><EditOutlined /></Button>
          <Button size="icon" variant="destructive" onClick={() => showDeleteConfirmation(n)}><DeleteOutlined /></Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="LES NOTES">
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Button variant="secondary"><SearchOutlined /> Rechercher</Button>
        </Dropdown>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <PlusOutlined className="mr-1" /> AJOUTER
        </Button>
      </PageHeader>
      <DataTable columns={columns} data={note} isLoading={noteLoading} />

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AJOUTER UNE NOTE</DialogTitle>
          </DialogHeader>
          <Suspense fallback={<LoadingOutlined className="text-center text-3xl" />}>
            <AddNote />
          </Suspense>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>MODIFIER NOTE</DialogTitle>
          </DialogHeader>
          {selectedItem && editedItem && (
            <form className="space-y-4" onSubmit={editSubmit(handleSubmitEdit)}>
              <FormField label="Valeur" name="valeur" control={control} error={errors.valeur}>
                <Input onKeyPress={handleFloatKeyPress} />
              </FormField>
              {(["id_etudiant", "id_niveau", "id_ec", "id_annee"] as const).map((field) => (
                <div key={field}>
                  <FormField
                    label={field === "id_etudiant" ? "Étudiant" : field === "id_niveau" ? "Niveau" : field === "id_ec" ? "EC" : "Année"}
                    name={field}
                    control={control}
                  >
                    <Input readOnly />
                  </FormField>
                </div>
              ))}
              <Button type="submit" className="w-full">
                {editLoading && <LoadingOutlined className="mr-1" />} Modifier
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Modal
        title="Suppression"
        open={isDeleteModalVisible}
        onOk={() => handleDeleteNote(itemToDelete!.id_note)}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Supprimer"
        cancelText="Annuler"
        okButtonProps={{ danger: true }}
      >
        <p><WarningOutlined className="mr-2 text-red-500" /> Êtes-vous sûr de vouloir supprimer cette note ?</p>
      </Modal>
    </div>
  );
};

export default Note;
