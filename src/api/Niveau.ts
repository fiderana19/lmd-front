import { CreateNiveauType, EditNiveauType } from "@/types/Niveau";
import { axiosAuthInstance } from "./Config";

const NIVEAU_BASE_URL = `${import.meta.env.VITE_BASE_URL}/niveau`;

export const getAllNiveau = async () => {
  return await axiosAuthInstance.get(`${NIVEAU_BASE_URL}`);
};

export const postNiveau = async (data: CreateNiveauType) => {
  return await axiosAuthInstance.post(`${NIVEAU_BASE_URL}/create`, data);
};

export const patchNiveau = async (data: EditNiveauType) => {
  return await axiosAuthInstance.patch(
    `${NIVEAU_BASE_URL}/edit/${data.id_niveau}`,
    data,
  );
};

export const deleteNiveau = async (id: number) => {
  return await axiosAuthInstance.delete(`${NIVEAU_BASE_URL}/delete/${id}`);
};

export const getNiveauById = async (id: number) => {
  return await axiosAuthInstance.get(`${NIVEAU_BASE_URL}/get/${id}`);
};
