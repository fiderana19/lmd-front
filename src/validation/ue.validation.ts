import * as yup from "yup";

export const CreateUEValidation = yup.object({
  nom_ue: yup.string().required("Nom de l'unité d'enseignement requis !"),
  credit_ue: yup
    .number()
    .max(60, "Le credit ne doit pas depasser 60 !")
    .required("Credit de l'unité d'enseignement requis !"),
});

export const EditUEValidation = yup.object({
  id_ue: yup.string().required("Id de l'unité requis !"),
  nom_ue: yup.string().required("Nom de l'unité d'enseignement requis !"),
  credit_ue: yup
    .number()
    .max(60, "Le credit ne doit pas depasser 60 !")
    .required("Credit de l'unité d'enseignement requis !"),
});
