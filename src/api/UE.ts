import { CreateUEType, EditUEType } from "@/types/UE";
import { axiosAuthInstance } from "./Config";

const UE_BASE_URL = `${import.meta.env.VITE_BASE_URL}/ue`;

export const getAllUE = async () => {
  return await axiosAuthInstance.get(`${UE_BASE_URL}`);
};

export const postUE = async (data: CreateUEType) => {
  return await axiosAuthInstance.post(`${UE_BASE_URL}/create`, data);
};

export const patchUE = async (data: EditUEType) => {
  return await axiosAuthInstance.patch(
    `${UE_BASE_URL}/edit/${data.id_ue}`,
    data,
  );
};

export const deleteUE = async (id: number) => {
  return await axiosAuthInstance.delete(`${UE_BASE_URL}/delete/${id}`);
};

export const getUEById = async (id: number) => {
  return await axiosAuthInstance.get(`${UE_BASE_URL}/get/${id}`);
};
