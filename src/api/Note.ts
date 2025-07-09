import { CreateNote, EditNote } from "@/types/Note";
import { axiosInstance } from "./Config"

const NOTE_BASE_URL = `${import.meta.env.VITE_BASE_URL}/note`;

export const getAllNote = async () => {
    return await axiosInstance.get(`${NOTE_BASE_URL}`);
}

export const postNote = async (data: CreateNote) => {
    return await axiosInstance.post(`${NOTE_BASE_URL}/create` , data);
}

export const patchNote = async (data: EditNote) => {
    return await axiosInstance.patch(`${NOTE_BASE_URL}/edit/${data.id_note}` , data);
}

export const deleteNote = async (id: number) => {
    return await axiosInstance.delete(`${NOTE_BASE_URL}/delete/${id}`);
}