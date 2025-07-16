import { CreateEtudiantType, EditEtudiantType } from "@/types/Etudiant";
import { axiosInstance } from "./Config"

const ETUDIANT_BASE_URL = `${import.meta.env.VITE_BASE_URL}/etudiant`;

export const getAllEtudiant = async () => {
    return await axiosInstance.get(`${ETUDIANT_BASE_URL}`);
}

export const postEtudiant = async (data: CreateEtudiantType) => {
    return await axiosInstance.post(`${ETUDIANT_BASE_URL}/create` , data);
}

export const patchEtudiant = async (data: EditEtudiantType) => {
    return await axiosInstance.patch(`${ETUDIANT_BASE_URL}/edit/${data.id_etudiant}` , data);
}

export const deleteEtudiant = async (id: number) => {
    return await axiosInstance.delete(`${ETUDIANT_BASE_URL}/delete/${id}`);
}

export const getEtudiantById = async (id: number) => {
    return await axiosInstance.get(`${ETUDIANT_BASE_URL}/get/${id}`);
}