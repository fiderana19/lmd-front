import * as yup from "yup";

export const CreateEtudiantValidation = yup.object({
  matricule: yup
    .string()
    .min(2, "Le matricule doit contenir au moins 2 caractères")
    .required("Le matricule de l'étudiant est requis"),
  nom: yup
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .required("Le nom de l'étudiant est requis"),
  prenom: yup
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .required("Le prénom de l'étudiant est requis"),
  date_naiss: yup
    .string()
    .required("La date de naissance de l'étudiant est requise"),
  lieu_naiss: yup
    .string()
    .min(2, "Le lieu de naissance doit contenir au moins 2 caractères")
    .required("Le lieu de naissance de l'étudiant est requis"),
});

export const EditEtudiantValidation = yup.object({
  id_etudiant: yup.string().required("L'identifiant de l'étudiant est requis"),
  matricule: yup
    .string()
    .min(2, "Le matricule doit contenir au moins 2 caractères")
    .required("Le matricule de l'étudiant est requis"),
  nom: yup
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .required("Le nom de l'étudiant est requis"),
  prenom: yup
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .required("Le prénom de l'étudiant est requis"),
  date_naiss: yup
    .string()
    .required("La date de naissance de l'étudiant est requise"),
  lieu_naiss: yup
    .string()
    .min(2, "Le lieu de naissance doit contenir au moins 2 caractères")
    .required("Le lieu de naissance de l'étudiant est requis"),
});
