export type CreateECType = {
    nom_ec: string, 
    semestre: string, 
    et: number, 
    ed: number, 
    ep: number, 
    credit_ec: number, 
    poids_ec: number,
    id_ue: string,
}

export type EditECType = {
    id_ec: string, 
    nom_ec: string, 
    semestre: string, 
    et: number, 
    ed: number, 
    ep: number, 
    credit_ec: number, 
    poids_ec: number,
    id_ue: string,
}