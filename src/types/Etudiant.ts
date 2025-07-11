export type CreateEtudiantType = {
    matricule: string, 
    nom: string, 
    prenom: string, 
    date_naiss: string, 
    lieu_naiss: string
}

export type EditEtudiantType = {
    id_etudiant: number, 
    matricule: string, 
    nom: string, 
    prenom: string, 
    date_naiss: string, 
    lieu_naiss: string
}