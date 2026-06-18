import * as yup from "yup";

export const CreateNiveauValidation = yup.object({
  titre_niveau: yup
    .string()
    .min(2, "Le titre du niveau doit contenir au moins 2 caractères")
    .required("Le titre du niveau est requis"),
  descri_niveau: yup
    .string()
    .min(2, "La description doit contenir au moins 2 caractères")
    .required("La description du niveau est requise"),
  domaine: yup
    .string()
    .min(2, "Le domaine doit contenir au moins 2 caractères")
    .required("Le domaine est requis"),
  mention: yup
    .string()
    .min(2, "La mention doit contenir au moins 2 caractères")
    .required("La mention est requise"),
  parcours: yup
    .string()
    .min(2, "Le parcours doit contenir au moins 2 caractères")
    .required("Le parcours est requis"),
});

export const EditNiveauValidation = yup.object({
  id_niveau: yup.string().required("L'identifiant du niveau est requis"),
  titre_niveau: yup
    .string()
    .min(2, "Le titre du niveau doit contenir au moins 2 caractères")
    .required("Le titre du niveau est requis"),
  descri_niveau: yup
    .string()
    .min(2, "La description doit contenir au moins 2 caractères")
    .required("La description du niveau est requise"),
  domaine: yup
    .string()
    .min(2, "Le domaine doit contenir au moins 2 caractères")
    .required("Le domaine est requis"),
  mention: yup
    .string()
    .min(2, "La mention doit contenir au moins 2 caractères")
    .required("La mention est requise"),
  parcours: yup
    .string()
    .min(2, "Le parcours doit contenir au moins 2 caractères")
    .required("Le parcours est requis"),
});
