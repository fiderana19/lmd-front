import { LoginType } from "@/types/User";
import { axiosInstance } from "./Config";

const USER_BASE_URL = `${import.meta.env.VITE_BASE_URL}/auth`;

export const userLogin = async (data: LoginType) => {
  return await axiosInstance.post(`${USER_BASE_URL}/login`, data);
};
