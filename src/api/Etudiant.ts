import { CreateEtudiantType, EditEtudiantType } from "@/types/Etudiant";
import { axiosAuthInstance } from "./Config"

const ETUDIANT_BASE_URL = `${import.meta.env.VITE_BASE_URL}/etudiant`;

export const getAllEtudiant = async () => {
    return await axiosAuthInstance.get(`${ETUDIANT_BASE_URL}`);
}

export const postEtudiant = async (data: CreateEtudiantType) => {
    return await axiosAuthInstance.post(`${ETUDIANT_BASE_URL}/create` , data);
}

export const patchEtudiant = async (data: EditEtudiantType) => {
    return await axiosAuthInstance.patch(`${ETUDIANT_BASE_URL}/edit/${data.id_etudiant}` , data);
}

export const deleteEtudiant = async (id: number) => {
    return await axiosAuthInstance.delete(`${ETUDIANT_BASE_URL}/delete/${id}`);
}

export const getEtudiantById = async (id: number) => {
    return await axiosAuthInstance.get(`${ETUDIANT_BASE_URL}/get/${id}`);
}