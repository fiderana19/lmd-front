import { CreateECType, EditECType } from "@/types/EC";
import { axiosAuthInstance } from "./Config";

const EC_BASE_URL = `${import.meta.env.VITE_BASE_URL}/ec`;

export const getAllEC = async () => {
  return await axiosAuthInstance.get(`${EC_BASE_URL}/`);
};

export const getECById = async (id: number) => {
  return await axiosAuthInstance.get(`${EC_BASE_URL}/get/${id}`);
};

export const postEC = async (data: CreateECType) => {
  return await axiosAuthInstance.post(`${EC_BASE_URL}/create`, data);
};

export const patchEC = async (data: EditECType) => {
  return await axiosAuthInstance.patch(
    `${EC_BASE_URL}/edit/${data.id_ec}`,
    data,
  );
};

export const deleteEC = async (id: number) => {
  return await axiosAuthInstance.delete(`${EC_BASE_URL}/delete/${id}`);
};
