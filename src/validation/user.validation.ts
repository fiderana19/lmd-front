import * as yup from "yup";

export const LoginValidation = yup.object({
  username: yup.string().required("Utilisateur requis !"),
  password: yup.string().required("Mot de passe requis !"),
});
