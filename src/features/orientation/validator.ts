import { z } from "zod";

export const FormSchema = z.object({
  Age_Bac: z.number(),
  Competences_Techniques: z.string(),
  Descriptions: z.string(),
  Etablissement: z.string(),
  Justification_Choix: z.string(),
  Lieu_Habitation_Bac: z.string(),
  Matieres_Preferees: z.string(),
  Note_Anglais_Ecrit: z.number(),
  Note_Anglais_Oral: z.number(),
  Note_EPS: z.number(),
  Note_Espagnol_Ecrit: z.number(),
  Note_Espagnol_Oral: z.number(),
  Note_Facultative_1: z.number(),
  Note_Facultative_2: z.number(),
  Note_Francais_Ecrit: z.number(),
  Note_Francais_Oral: z.number(),
  Note_Histoire_Geo: z.number(),
  Note_Maths: z.number(),
  Note_Philo: z.number(),
  Note_Physique_Chimie: z.number(),
  Note_SVT: z.number(),
  Personnalite: z.string(),
  Points_BAC: z.number(),
  Religion: z.string(),
  Secteur_Activite_Famille: z.string(),
  Secteur_Desire: z.string(),
  Serie_Bac: z.string(),
  Sexe: z.string(),
});
