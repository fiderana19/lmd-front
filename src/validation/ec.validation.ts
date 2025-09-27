import * as yup from "yup";

export const CreateECValidation = yup.object({
  nom_ec: yup.string().required("Nom de l'element requis !"),
  semestre: yup.string().required("Semestre de l'element requis !"),
  et: yup.number().required("ET requis !"),
  ed: yup.number().required("ED requis !"),
  ep: yup.number().required("EP requis !"),
  credit_ec: yup
    .number()
    .max(60, "Le credit doit être inférieur à 60 !")
    .required("Credit de l'element requis !"),
  poids_ec: yup
    .number()
    .max(1, "Le poids ne doit pas depasser 1!")
    .min(0, "Le poids ne doit pas être inferieur à 0")
    .required("Poids de l'element requis !"),
  id_ue: yup.string().required("Unite de l'element requis !"),
});

export const EditECValidation = yup.object({
  id_ec: yup.string().required("Id de l'element requis !"),
  nom_ec: yup.string().required("Nom de l'element requis !"),
  semestre: yup.string().required("Semestre de l'element requis !"),
  et: yup.number().required("ET requis !"),
  ed: yup.number().required("ED requis !"),
  ep: yup.number().required("EP requis !"),
  credit_ec: yup
    .number()
    .max(60, "Le credit doit être inférieur à 60 !")
    .required("Credit de l'element requis !"),
  poids_ec: yup
    .number()
    .max(1, "Le poids ne doit pas depasser 1!")
    .min(0, "Le poids ne doit pas être inferieur à 0")
    .required("Poids de l'element requis !"),
  id_ue: yup.string().required("Unite de l'element requis !"),
});
