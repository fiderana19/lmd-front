import * as yup from 'yup';

export const CreateNoteValidation = yup.object({
    valeur: yup.number().max(20, "Le note ne doit pas depasser 20 !").required("Note requis !"), 
    id_etudiant: yup.string().required("Etudiant requis !"), 
    id_niveau: yup.string().required("Niveau requis !"), 
    id_ec: yup.string().required("EC requis !"), 
    id_annee: yup.string().required("Année requis !"), 
})

export const EditNoteValidation = yup.object({
    id_note: yup.number().required("Id du note requis !"), 
    valeur: yup.number().max(20, "Le note ne doit pas depasser 20 !").required("Note requis !"), 
    id_etudiant: yup.string().required("Etudiant requis !"), 
    id_niveau: yup.string().required("Niveau requis !"), 
    id_ec: yup.string().required("EC requis !"), 
    id_annee: yup.string().required("Année requis !"), 
})

export const CreateGlobalNoteValidation = yup.object({
    niveau: yup.string().required("Niveau requis !"), 
    ec: yup.string().required("Element requis !"), 
    annee: yup.string().required("Année requis !"), 
})

export const NoteEtudiantSearchValidation = yup.object({
    id_niveau: yup.number().required("Niveau requis !"), 
    id_etudiant: yup.number().required("Etudiant requis !"), 
    id_annee: yup.string().required("Année requis !"), 
})

export const ResultNiveauSearchValidation = yup.object({
    id_niveau: yup.number().required("Niveau requis !"), 
    id_annee: yup.string().required("Année requis !"), 
    obs: yup.string().required("Critere requis !"), 
})