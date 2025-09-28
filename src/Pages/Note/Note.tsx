import { useState, FunctionComponent, Suspense, lazy } from "react";
import { Dropdown, Modal, Card } from "antd";
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
import Bg from "../../assets/pic/home-bg.jpg";
import { handleFloatKeyPress } from "@/utils/handleKeyPress";
const Navigation = lazy(() => import("@/components/navigation/Navigation"));
import { useGetAllNote } from "../../hooks/useGetAllNote";
import { EditNote } from "@/types/Note";
import { Controller, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditNoteValidation } from "@/validation/note.validation";
import { Button } from "@/components/ui/button";
import { usePatchNote } from "@/hooks/usePatchNote";
import { useDeleteNote } from "@/hooks/useDeleteNote";

const Note: FunctionComponent = () => {
  const {
    data: note,
    isLoading: noteLoading,
    refetch: refetchNote,
  } = useGetAllNote();
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<EditNote | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<EditNote | null>(null);
  const [editedItem, setEditedItem] = useState<EditNote | null>(null);
  const {
    handleSubmit: editSubmit,
    formState: { errors },
    control,
    setValue: setEditValue,
  } = useForm<EditNote>({
    resolver: yupResolver(EditNoteValidation),
  });
  const { mutateAsync: editNote, isPending: editLoading } = usePatchNote({
    action() {
      refetchNote();
    },
  });
  const { mutateAsync: deleteNote, isPending: deleteLoading } = useDeleteNote({
    action() {
      refetchNote();
    },
  });

  const items = [
    {
      label: (
        <Link to="/admin/note/etudiant">
          <div className="px-4 py-1">
            <UserOutlined /> NOTE D'UN ETUDIANT
          </div>
        </Link>
      ),
      key: "01",
    },
    {
      label: (
        <Link to="/admin/note/result">
          <div className="px-4 py-1">
            <UnorderedListOutlined /> RESULTAT D'UN NIVEAU
          </div>
        </Link>
      ),
      key: "1",
    },
  ];

  const showDeleteConfirmation = (item: EditNote) => {
    setItemToDelete(item);
    setIsDeleteModalVisible(true);
  };

  async function handleDelete(itemId: number) {
    await deleteNote(itemId);
  }

  function EditNote(item: EditNote) {
    setSelectedItem(item);
    showModal1();

    setEditedItem(item);
    setEditValue("id_note", item?.id_note);
  }

  const handleSubmit = async (data: EditNote) => {
    await editNote(data);
  };

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      handleDelete(itemToDelete.id_note);
      setIsDeleteModalVisible(false);
    }
  };

  const showModal1 = () => {
    setIsEditModalOpen(true);
  };

  const okDeleteStyle = {
    background: "red",
  };

  return (
    <div>
      <Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}>
        <Navigation />
      </Suspense>
      <div className="pb-5 pt-24">
        <div className="px-10">
          <div className="flex justify-between">
            <div className="text-xl font-bold font-lato">LES NOTES</div>
            <div className="flex items-center">
              <Dropdown className="mx-1" menu={{ items }} trigger={["click"]}>
                <a
                  className="cursor-pointer"
                  onClick={(e) => e.preventDefault()}
                >
                  <Button>
                    <SearchOutlined />
                  </Button>
                </a>
              </Dropdown>
              <Button onClick={() => setIsAddModalOpen(true)}>
                <div className="sm:hidden block">
                  <PlusOutlined />
                </div>
                <div className="sm:block hidden"> AJOUTER </div>
              </Button>
            </div>
          </div>
          <Modal
            title="AJOUTER UN NOTE"
            open={isAddModalOpen}
            onCancel={() => setIsAddModalOpen(false)}
            footer={null}
          >
            <Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}>
              <AddNote />
            </Suspense>
          </Modal>
          <div className="my-7 grid gap-2 justify-center grid-cols-customized"></div>
          <div className="sm:block hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Etudiant
                  </th>
                  <th className="lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Niveau
                  </th>
                  <th className="lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    EC
                  </th>
                  <th className="lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Annee
                  </th>
                  <th className="lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Note
                  </th>
                  <th className="px-1 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {note &&
                  note.map((notee: any, index: any) => {
                    return (
                      <tr key={index}>
                        <td className="lg:px-6 px-2 py-4 md:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900">
                          {" "}
                          {notee.id_etudiant}{" "}
                        </td>
                        <td className="lg:px-6 px-2 py-4 md:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900">
                          {" "}
                          {notee.id_niveau}{" "}
                        </td>
                        <td className="lg:px-6 px-2 py-4 md:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900">
                          {" "}
                          {notee.id_ec}{" "}
                        </td>
                        <td className="lg:px-6 px-2 py-4 md:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900">
                          {" "}
                          {notee.id_annee}{" "}
                        </td>
                        <td className="lg:px-6 px-2 py-4 whitespace-nowrap text-sm leading-5 text-gray-900 flex justify-evenly">
                          {notee.valeur}
                          {notee.valeur >= 10 ? (
                            <div className="text-green-700 mx-1">
                              <CheckCircleFilled />
                            </div>
                          ) : notee.valeur >= 5 ? (
                            <div className="text-yellow-300 mx-1">
                              <WarningFilled />
                            </div>
                          ) : (
                            <div className="text-red-600 mx-1">
                              <CloseCircleFilled />
                            </div>
                          )}
                        </td>
                        <td className="px-1 py-4 md:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900">
                          <div className="flex justify-center gap-1">
                            <Button
                              size={"icon"}
                              onClick={() => EditNote(notee)}
                            >
                              <EditOutlined />
                            </Button>
                            <Button
                              size={"icon"}
                              variant={"destructive"}
                              onClick={() => showDeleteConfirmation(notee)}
                            >
                              <DeleteOutlined />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
              {noteLoading && (
                <div className="text-center my-10">
                  <LoadingOutlined className="text-3xl" />
                  <div>Chargement...</div>
                </div>
              )}
            </table>
          </div>
          <div className="sm:hidden grid gap-2 justify-center grid-cols-customized">
            {note &&
              note.map((notee: any, index: any) => {
                return (
                  <Card key={index} className="hover:scale-105 duration-300">
                    <div className="text-center">
                      <img src={Bg} />
                      <div className="py-3">
                        <div className="text-base text-primary font-bold">
                          {notee.id_etudiant}
                        </div>
                        <div className="text-base font-bold">
                          {notee.id_niveau}
                        </div>
                        <div className="text-sm">{notee.id_ec}</div>
                        <div className="text-sm">{notee.id_annee}</div>
                        <div className="text-sm flex justify-center">
                          {notee.valeur}
                          {notee.valeur >= 10 ? (
                            <div className="text-green-700 mx-1">
                              <CheckCircleFilled />
                            </div>
                          ) : notee.valeur >= 5 ? (
                            <div className="text-yellow-300 mx-1">
                              <WarningFilled />
                            </div>
                          ) : (
                            <div className="text-red-600 mx-1">
                              <CloseCircleFilled />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-center gap-1">
                        <Button size={"icon"} onClick={() => EditNote(notee)}>
                          <EditOutlined />
                        </Button>
                        <Button
                          size={"icon"}
                          variant={"destructive"}
                          onClick={() => showDeleteConfirmation(notee)}
                        >
                          <DeleteOutlined />
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
          </div>
          <Modal
            title="MODIFIER NOTE"
            open={isEditModalOpen}
            onCancel={() => setIsEditModalOpen(false)}
            footer={null}
          >
            {selectedItem && editedItem && (
              <div>
                <form
                  className="sm:w-2/3 w-full my-7 mx-auto"
                  onSubmit={editSubmit(handleSubmit)}
                >
                  <Label htmlFor="valeur" className="mb-1">
                    Valeur :{" "}
                  </Label>
                  <Controller
                    control={control}
                    name="valeur"
                    defaultValue={editedItem?.valeur}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        onKeyPress={handleFloatKeyPress}
                        value={value}
                        onChange={onChange}
                        className={
                          errors?.valeur ? "border border-red-500" : ""
                        }
                      />
                    )}
                  />
                  {errors?.valeur && (
                    <div className="text-red-500 text-xs">
                      {errors?.valeur?.message}
                    </div>
                  )}
                  <Label htmlFor="id_etudiant" className="mb-1 mt-4">
                    Etudiant :{" "}
                  </Label>
                  <Controller
                    control={control}
                    name="id_etudiant"
                    defaultValue={editedItem?.id_etudiant}
                    render={({ field: { value } }) => (
                      <Input readOnly value={value} />
                    )}
                  />
                  <Label htmlFor="id_niveau" className="mb-1 mt-4">
                    Niveau :{" "}
                  </Label>
                  <Controller
                    control={control}
                    name="id_niveau"
                    defaultValue={editedItem?.id_niveau}
                    render={({ field: { value } }) => (
                      <Input readOnly value={value} />
                    )}
                  />
                  <Label htmlFor="id_ec" className="mb-1 mt-4">
                    Element Constitutif :{" "}
                  </Label>
                  <Controller
                    control={control}
                    name="id_ec"
                    defaultValue={editedItem?.id_ec}
                    render={({ field: { value } }) => (
                      <Input readOnly value={value} />
                    )}
                  />
                  <Label htmlFor="id_annee" className="mb-1 mt-4">
                    Année universitaire :{" "}
                  </Label>
                  <Controller
                    control={control}
                    name="id_annee"
                    defaultValue={editedItem?.id_annee}
                    render={({ field: { value } }) => (
                      <Input readOnly value={value} />
                    )}
                  />
                  <div className="flex justify-center my-3">
                    <Button variant={"primary"} type="submit">
                      {editLoading && <LoadingOutlined />}
                      Modifier
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </Modal>
          <Modal
            title="Suppression"
            open={isDeleteModalVisible}
            onOk={handleDeleteConfirm}
            onCancel={() => setIsDeleteModalVisible(false)}
            okText="Supprimer"
            cancelText="Annuler"
            okButtonProps={{ style: okDeleteStyle }}
          >
            <div className="text-red-900">
              <WarningOutlined className="mr-2" />
              Êtes-vous sûr de vouloir supprimer ce note ? Cela pourrait
              entraînner des incohérences de données
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Note;
