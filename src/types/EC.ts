export type CreateEC = {
    nom_ec: string, 
    semestre: string, 
    et: number, 
    ed: number, 
    ep: number, 
    credit_ec: number, 
    poids_ec: number,
    id_ue: string,
}

export type EditEC = {
    id_ec: string, 
    semestre: string, 
    et: number, 
    ed: number, 
    ep: number, 
    credit_ec: number, 
    poids_ec: number,
    id_ue: string,
}