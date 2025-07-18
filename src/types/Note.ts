export type CreateNote = {
    valeur: number, 
    id_etudiant: string, 
    id_niveau: string, 
    id_ec: string, 
    id_annee: string
}

export type EditNote = {
    id_note: number, 
    valeur: number, 
    id_etudiant: string, 
    id_niveau: string, 
    id_ec: string, 
    id_annee: string
}