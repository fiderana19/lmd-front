import { CreateECType, EditECType } from "@/types/EC";
import { axiosInstance } from "./Config"

const EC_BASE_URL = `${import.meta.env.VITE_BASE_URL}/ec`;

export const getAllEC = async () => {
    return await axiosInstance.get(`${EC_BASE_URL}/`);
}

export const getECById = async (id: number) => {
    return await axiosInstance.get(`${EC_BASE_URL}/get/${id}`);
}

export const postEC = async (data: CreateECType) => {
    return await axiosInstance.post(`${EC_BASE_URL}/create` , data);
}

export const patchEC = async (data: EditECType) => {
    return await axiosInstance.patch(`${EC_BASE_URL}/edit/${data.id_ec}` , data);
}

export const deleteEC = async (id: number) => {
    return await axiosInstance.delete(`${EC_BASE_URL}/delete/${id}`);
}