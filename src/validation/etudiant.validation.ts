import * as yup from "yup";

export const CreateEtudiantValidation = yup.object({
  matricule: yup.string().required("Matricule de l'etudiant requis !"),
  nom: yup.string().required("Nom de l'etudiant requis !"),
  prenom: yup.string().required(),
  date_naiss: yup.string().required("Date de naissance de l'etudiant requis !"),
  lieu_naiss: yup.string().required("Lieu de naissance de l'etudiant requis !"),
});

export const EditEtudiantValidation = yup.object({
  id_etudiant: yup.string().required("Id de l'etudiant requis !"),
  matricule: yup.string().required("Matricule de l'etudiant requis !"),
  nom: yup.string().required("Nom de l'etudiant requis !"),
  prenom: yup.string().required(),
  date_naiss: yup.string().required("Date de naissance de l'etudiant requis !"),
  lieu_naiss: yup.string().required("Lieu de naissance de l'etudiant requis !"),
});
