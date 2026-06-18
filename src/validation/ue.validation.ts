import * as yup from "yup";

export const CreateUEValidation = yup.object({
  nom_ue: yup
    .string()
    .min(2, "Le nom de l'unité d'enseignement doit contenir au moins 2 caractères")
    .required("Le nom de l'unité d'enseignement est requis"),
  credit_ue: yup
    .number()
    .typeError("Le crédit doit être un nombre")
    .positive("Le crédit doit être un nombre positif")
    .max(60, "Le crédit ne doit pas dépasser 60")
    .required("Le crédit de l'unité d'enseignement est requis"),
});

export const EditUEValidation = yup.object({
  id_ue: yup.string().required("L'identifiant de l'unité est requis"),
  nom_ue: yup
    .string()
    .min(2, "Le nom de l'unité d'enseignement doit contenir au moins 2 caractères")
    .required("Le nom de l'unité d'enseignement est requis"),
  credit_ue: yup
    .number()
    .typeError("Le crédit doit être un nombre")
    .positive("Le crédit doit être un nombre positif")
    .max(60, "Le crédit ne doit pas dépasser 60")
    .required("Le crédit de l'unité d'enseignement est requis"),
});
