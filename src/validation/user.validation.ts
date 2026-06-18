import * as yup from "yup";

export const LoginValidation = yup.object({
  username: yup
    .string()
    .min(2, "Le nom d'utilisateur doit contenir au moins 2 caractères")
    .required("Le nom d'utilisateur est requis"),
  password: yup
    .string()
    .min(4, "Le mot de passe doit contenir au moins 4 caractères")
    .required("Le mot de passe est requis"),
});
