export type CreateNote = {
  valeur: number;
  id_etudiant: string;
  id_niveau: string;
  id_ec: string;
  id_annee: string;
};

export type EditNote = {
  id_note: number;
  valeur: number;
  id_etudiant: string;
  id_niveau: string;
  id_ec: string;
  id_annee: string;
};

export type CreateGlobalNote = {
  niveau: string;
  ec: string;
  annee: string;
};

export type NoteByNiveau = {
  id_niveau: number;
  id_ec: number;
  id_annee: string;
};

export type NoteEtudiantSearch = {
  id_niveau: number;
  id_etudiant: number;
  id_annee: string;
};

export type ResultNiveauSearch = {
  id_niveau: number;
  id_annee: string;
  obs: string;
};

export type UnityResult = {
  id_ue: number;
  nom_ue: string;
  moyenne: number;
  credit_ue: number;
  credit_ue_total: number;
  notes: { nom_ec: string; valeur: number }[];
};

export type MarkResult = {
  moyenne_generale: number;
  total_credits: number;
  total_credits_possible: number;
  mention: string;
};
