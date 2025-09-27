import { CreateNote, EditNote, NoteByNiveau } from "@/types/Note";
import { axiosAuthInstance } from "./Config";

const NOTE_BASE_URL = `${import.meta.env.VITE_BASE_URL}/note`;

export const getAllNote = async () => {
  return await axiosAuthInstance.get(`${NOTE_BASE_URL}`);
};

export const postNote = async (data: CreateNote) => {
  return await axiosAuthInstance.post(`${NOTE_BASE_URL}/create`, data);
};

export const patchNote = async (data: EditNote) => {
  return await axiosAuthInstance.patch(
    `${NOTE_BASE_URL}/edit/${data.id_note}`,
    data,
  );
};

export const deleteNote = async (id: number) => {
  return await axiosAuthInstance.delete(`${NOTE_BASE_URL}/delete/${id}`);
};

export const postNoteByNiveau = async (data: NoteByNiveau) => {
  return await axiosAuthInstance.post(`${NOTE_BASE_URL}/niveau`, data);
};
