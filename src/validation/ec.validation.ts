import * as yup from "yup";

export const CreateECValidation = yup.object({
  nom_ec: yup
    .string()
    .min(2, "Le nom de l'élément doit contenir au moins 2 caractères")
    .required("Le nom de l'élément est requis"),
  semestre: yup
    .string()
    .required("Le semestre est requis"),
  et: yup
    .number()
    .typeError("ET doit être un nombre")
    .min(0, "ET ne doit pas être négatif")
    .required("ET est requis"),
  ed: yup
    .number()
    .typeError("ED doit être un nombre")
    .min(0, "ED ne doit pas être négatif")
    .required("ED est requis"),
  ep: yup
    .number()
    .typeError("EP doit être un nombre")
    .min(0, "EP ne doit pas être négatif")
    .required("EP est requis"),
  credit_ec: yup
    .number()
    .typeError("Le crédit doit être un nombre")
    .positive("Le crédit doit être un nombre positif")
    .max(60, "Le crédit ne doit pas dépasser 60")
    .required("Le crédit de l'élément est requis"),
  poids_ec: yup
    .number()
    .typeError("Le poids doit être un nombre")
    .min(0, "Le poids ne doit pas être inférieur à 0")
    .max(1, "Le poids ne doit pas dépasser 1")
    .required("Le poids de l'élément est requis"),
  id_ue: yup
    .string()
    .required("L'unité d'enseignement est requise"),
});

export const EditECValidation = yup.object({
  id_ec: yup.string().required("L'identifiant de l'élément est requis"),
  nom_ec: yup
    .string()
    .min(2, "Le nom de l'élément doit contenir au moins 2 caractères")
    .required("Le nom de l'élément est requis"),
  semestre: yup
    .string()
    .required("Le semestre est requis"),
  et: yup
    .number()
    .typeError("ET doit être un nombre")
    .min(0, "ET ne doit pas être négatif")
    .required("ET est requis"),
  ed: yup
    .number()
    .typeError("ED doit être un nombre")
    .min(0, "ED ne doit pas être négatif")
    .required("ED est requis"),
  ep: yup
    .number()
    .typeError("EP doit être un nombre")
    .min(0, "EP ne doit pas être négatif")
    .required("EP est requis"),
  credit_ec: yup
    .number()
    .typeError("Le crédit doit être un nombre")
    .positive("Le crédit doit être un nombre positif")
    .max(60, "Le crédit ne doit pas dépasser 60")
    .required("Le crédit de l'élément est requis"),
  poids_ec: yup
    .number()
    .typeError("Le poids doit être un nombre")
    .min(0, "Le poids ne doit pas être inférieur à 0")
    .max(1, "Le poids ne doit pas dépasser 1")
    .required("Le poids de l'élément est requis"),
  id_ue: yup
    .string()
    .required("L'unité d'enseignement est requise"),
});
