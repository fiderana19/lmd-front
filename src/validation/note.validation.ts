import * as yup from "yup";

export const CreateNoteValidation = yup.object({
  valeur: yup
    .number()
    .typeError("La note doit être un nombre")
    .min(0, "La note ne doit pas être inférieure à 0")
    .max(20, "La note ne doit pas dépasser 20")
    .required("La note est requise"),
  id_etudiant: yup.string().required("L'étudiant est requis"),
  id_niveau: yup.string().required("Le niveau est requis"),
  id_ec: yup.string().required("L'élément constitutif est requis"),
  id_annee: yup.string().required("L'année universitaire est requise"),
});

export const EditNoteValidation = yup.object({
  id_note: yup
    .number()
    .typeError("L'identifiant de la note est requis")
    .required("L'identifiant de la note est requis"),
  valeur: yup
    .number()
    .typeError("La note doit être un nombre")
    .min(0, "La note ne doit pas être inférieure à 0")
    .max(20, "La note ne doit pas dépasser 20")
    .required("La note est requise"),
  id_etudiant: yup.string().required("L'étudiant est requis"),
  id_niveau: yup.string().required("Le niveau est requis"),
  id_ec: yup.string().required("L'élément constitutif est requis"),
  id_annee: yup.string().required("L'année universitaire est requise"),
});

export const CreateGlobalNoteValidation = yup.object({
  niveau: yup.string().required("Le niveau est requis"),
  ec: yup.string().required("L'élément constitutif est requis"),
  annee: yup.string().required("L'année universitaire est requise"),
});

export const NoteEtudiantSearchValidation = yup.object({
  id_niveau: yup
    .number()
    .typeError("Le niveau est requis")
    .required("Le niveau est requis"),
  id_etudiant: yup
    .number()
    .typeError("L'étudiant est requis")
    .required("L'étudiant est requis"),
  id_annee: yup.string().required("L'année universitaire est requise"),
});

export const ResultNiveauSearchValidation = yup.object({
  id_niveau: yup
    .number()
    .typeError("Le niveau est requis")
    .required("Le niveau est requis"),
  id_annee: yup.string().required("L'année universitaire est requise"),
  obs: yup.string().required("Le critère est requis"),
});
