import { CreateUEType, EditUEType } from "@/types/UE";
import { axiosInstance } from "./Config"

const UE_BASE_URL = `${import.meta.env.VITE_BASE_URL}/ue`;

export const getAllUE = async () => {
    return await axiosInstance.get(`${UE_BASE_URL}`);
}

export const postUE = async (data: CreateUEType) => {
    return await axiosInstance.post(`${UE_BASE_URL}/create` , data);
}

export const patchUE = async (data: EditUEType) => {
    return await axiosInstance.patch(`${UE_BASE_URL}/edit/${data.id_ue}` , data);
}

export const deleteUE = async (id: number) => {
    return await axiosInstance.delete(`${UE_BASE_URL}/delete/${id}`);
}