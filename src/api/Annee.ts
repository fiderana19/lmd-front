import { axiosAuthInstance } from "./Config";

const ANNEE_BASE_URL = `${import.meta.env.VITE_BASE_URL}/annee`;

export const getAllAnnee = async () => {
    return await axiosAuthInstance.get(`${ANNEE_BASE_URL}`);
}
