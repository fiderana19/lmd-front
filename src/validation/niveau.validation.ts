import * as yup from 'yup'

export const CreateNiveauValidation = yup.object({
    titre_niveau: yup.string().required("Titre du niveau requis !"), 
    descri_niveau: yup.string().required("Description du niveau requise !"), 
    domaine: yup.string().required("Domaine requis !"), 
    mention: yup.string().required("Mention requis !"), 
    parcours: yup.string().required("Parcours requis !")
})

export const EditNiveauValidation = yup.object({
    id_niveau: yup.string().required("Id niveau requis !"), 
    titre_niveau: yup.string().required("Titre du niveau requis !"), 
    descri_niveau: yup.string().required("Description du niveau requise !"), 
    domaine: yup.string().required("Domaine requis !"), 
    mention: yup.string().required("Mention requis !"), 
    parcours: yup.string().required("Parcours requis !")
})