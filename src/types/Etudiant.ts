export type CreateEtudiant = {
    matricule: string, 
    nom: string, 
    prenom: string, 
    date_naiss: string, 
    lieu_naiss: string
}

export type EditEtudiant = {
    id_etudiant: number, 
    matricule: string, 
    nom: string, 
    prenom: string, 
    date_naiss: string, 
    lieu_naiss: string
}