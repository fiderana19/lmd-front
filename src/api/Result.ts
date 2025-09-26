import { NoteEtudiantSearch } from "@/types/Note";
import { axiosAuthInstance } from "./Config"

const RESULT_BASE_URL = `${import.meta.env.VITE_BASE_URL}/result`;

export const postEtudiantForResult = async (data: NoteEtudiantSearch) => {
    return await axiosAuthInstance.post(`${RESULT_BASE_URL}/etudiant`, data);
}

export const postEtudiantUnityForResult = async (data: NoteEtudiantSearch) => {
    return await axiosAuthInstance.post(`${RESULT_BASE_URL}/etudiant/unity`, data);
}

export const postEtudiantMarkForResult = async (data: NoteEtudiantSearch) => {
    return await axiosAuthInstance.post(`${RESULT_BASE_URL}/etudiant/result`, data);
}

export const postEtudiantFinalForResult = async (data: NoteEtudiantSearch) => {
    return await axiosAuthInstance.post(`${RESULT_BASE_URL}/etudiant/final`, data);
}