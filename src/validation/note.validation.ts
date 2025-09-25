import * as yup from 'yup';

export const CreateNoteValidation = yup.object({
    valeur: yup.number().max(20, "Le note ne doit pas depasser 20 !").required("Note requis !"), 
    id_etudiant: yup.string().required("Etudiant requis !"), 
    id_niveau: yup.string().required("Niveau requis !"), 
    id_ec: yup.string().required("EC requis !"), 
    id_annee: yup.string().required("Année requis !"), 
})
