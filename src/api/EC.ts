import { CreateEC, EditEC } from "@/types/EC";
import { axiosInstance } from "./Config"

const EC_BASE_URL = `${import.meta.env.VITE_BASE_URL}/ec`;

export const getAllEC = async () => {
    return await axiosInstance.get(`${EC_BASE_URL}/all`);
}

export const postEC = async (data: CreateEC) => {
    return await axiosInstance.post(`${EC_BASE_URL}/create` , data);
}

export const patchEC = async (data: EditEC) => {
    return await axiosInstance.patch(`${EC_BASE_URL}/edit/${data.id_ec}` , data);
}

export const deleteEC = async (id: number) => {
    return await axiosInstance.delete(`${EC_BASE_URL}/delete/${id}`);
}