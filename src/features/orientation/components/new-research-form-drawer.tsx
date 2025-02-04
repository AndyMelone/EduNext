import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { NewOrientation } from "@/features/api/orientation";
import { FormSchema } from "../validator";
import { toast } from "@/hooks/use-toast";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function NewResearchFormDrawer({ open, onClose }: DrawerProps) {
  const [isSecondDrawerOpen, setSecondDrawerOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Age_Bac: 0,
      Competences_Techniques: "",
      Descriptions: "",
      Etablissement: "",
      Justification_Choix: "",
      Lieu_Habitation_Bac: "",
      Matieres_Preferees: "",
      Note_Anglais_Ecrit: 0,
      Note_Anglais_Oral: 0,
      Note_EPS: 0,
      Note_Espagnol_Ecrit: 0,
      Note_Espagnol_Oral: 0,
      Note_Facultative_1: 0,
      Note_Facultative_2: 0,
      Note_Francais_Ecrit: 0,
      Note_Francais_Oral: 0,
      Note_Histoire_Geo: 0,
      Note_Maths: 0,
      Note_Philo: 0,
      Note_Physique_Chimie: 0,
      Note_SVT: 0,
      Personnalite: "",
      Points_BAC: 0,
      Religion: "",
      Secteur_Activite_Famille: "",
      Secteur_Desire: "",
      Serie_Bac: "",
      Sexe: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log("Données du formulaire soumises:", data);
    try {
      const response = await NewOrientation(data);
      console.log(response);
      toast({
        title: "Succès",
        description: "Votre formulaire a été soumis avec succès !",
        variant: "default",
      });
      form.reset();
      onClose();
      setSecondDrawerOpen(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Erreur",
        description:
          "Une erreur s'est produite lors de la soumission du formulaire.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <Drawer open={open} onClose={onClose}>
        <DrawerContent className="flex flex-col h-[90vh]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col h-full"
            >
              <DrawerHeader>
                <DrawerTitle>Nouvelle recherche</DrawerTitle>
                <DrawerDescription>
                  Effectuez une nouvelle recherche en remplissant les champs
                  ci-dessous
                </DrawerDescription>
              </DrawerHeader>

              <div className="flex-1 overflow-y-auto px-6">
                <div className="flex-grow">
                  {/* Contenu du premier Drawer */}
                  <div className="flex items-center justify-between my-2">
                    <div className="py-2 px-4 bg-gray-400 rounded-xl w-fit mb-4">
                      <p className="font-light">
                        Informations personnelles et scolaires
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6 p-5">
                    <div className="flex gap-4">
                      <FormField
                        control={form.control}
                        name="Age_Bac"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Age d&apos;obtention du bac</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={(value) =>
                                  field.onChange(Number(value))
                                }
                                value={String(field.value)}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Sélectionnez votre âge" />
                                </SelectTrigger>
                                <SelectContent>
                                  {[...Array(41).keys()].map((age) => (
                                    <SelectItem
                                      key={age + 10}
                                      value={String(age + 10)}
                                    >
                                      {age + 10}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="Sexe"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Sexe</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Sélectionnez votre sexe" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Masculin">
                                    Masculin
                                  </SelectItem>
                                  <SelectItem value="Féminin">
                                    Féminin
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="Lieu_Habitation_Bac"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>
                              Lieu d&apos;habitation (commune){" "}
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Entrez votre lieu d'habitation"
                                className="w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex gap-4 w-full">
                      <FormField
                        control={form.control}
                        name="Serie_Bac"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Série du Bac</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Sélectionnez votre série du Bac" />
                                </SelectTrigger>
                                <SelectContent>
                                  {["A1", "C2", "C", "D"].map((serie) => (
                                    <SelectItem key={serie} value={serie}>
                                      {serie}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="Points_BAC"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Points obtenus au Bac</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={(value) =>
                                  field.onChange(Number(value))
                                }
                                value={String(field.value)}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Sélectionnez vos points" />
                                </SelectTrigger>
                                <SelectContent>
                                  {[...Array(400).keys()].map((points) => (
                                    <SelectItem
                                      key={points}
                                      value={String(points)}
                                    >
                                      {points}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="border py-2 px-4 bg-gray-400 rounded-xl w-fit my-4">
                    <p className="font-light">
                      Compétences, préférences et orientation
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <FormField
                        control={form.control}
                        name="Competences_Techniques"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Compétences techniques</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Sélectionnez vos compétences techniques" />
                                </SelectTrigger>
                                <SelectContent>
                                  {[
                                    "Informatique",
                                    "Maths",
                                    "Français",
                                    "Anglais",
                                    "Autre",
                                  ].map((tech) => (
                                    <SelectItem key={tech} value={tech}>
                                      {tech}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="Matieres_Preferees"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Matières préférées</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Sélectionnez vos matières préférées" />
                                </SelectTrigger>
                                <SelectContent>
                                  {[
                                    "Mathématiques",
                                    "SVT",
                                    "Physique chimie",
                                    "Espagnol",
                                    "Anglais",
                                    "Histoire - Géographie",
                                    "Français",
                                    "Philosophie",
                                    "EPS",
                                  ].map((matiere) => (
                                    <SelectItem key={matiere} value={matiere}>
                                      {matiere}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="Secteur_Desire"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Secteur désiré</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Sélectionnez votre secteur désiré" />
                                </SelectTrigger>
                                <SelectContent>
                                  {[
                                    "Agroalimentaire",
                                    "Banque / Assurance /Finances",
                                    "Bois / Papier / Carton / Imprimerie",
                                    "BTP / Matériaux de construction",
                                    "Chimie / Parachimie",
                                    "Commerce / Négoce / Distribution",
                                    "Édition / Communication / Multimédia",
                                    "Électronique / Électricité",
                                    "Études et conseils",
                                    "Industrie pharmaceutique",
                                    "Informatique / Télécoms",
                                    "Machines et équipements / Automobile",
                                    "Métallurgie / Travail du métal",
                                    "Plastique / Caoutchouc",
                                    "Administration des entreprises",
                                    "Textile / Habillement / Chaussure",
                                    "Achat / Transports / Logistique",
                                    "Agriculture",
                                    "Elevage",
                                    "Peche",
                                    "Tourisme",
                                    "Hotellerie",
                                    "Droit",
                                    "Marketing",
                                    "Sciences humaines",
                                    "Santé",
                                    "Arts",
                                  ].map((secteur) => (
                                    <SelectItem key={secteur} value={secteur}>
                                      {secteur}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="Secteur_Activite_Famille"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>
                              Secteur d&apos;activité au sein du cercle familial
                            </FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Veuillez sélectionner cinq (05) secteurs d'activités dans lesquels vos parents ou entourage familial exercent! " />
                                </SelectTrigger>
                                <SelectContent>
                                  {[
                                    "Agroalimentaire",
                                    "Banque / Assurance /Finances",
                                    "Bois / Papier / Carton / Imprimerie",
                                    "BTP / Matériaux de construction",
                                    "Chimie / Parachimie",
                                    "Commerce / Négoce / Distribution",
                                    "Édition / Communication / Multimédia",
                                    "Électronique / Électricité",
                                    "Études et conseils",
                                    "Industrie pharmaceutique",
                                    "Informatique / Télécoms",
                                    "Machines et équipements / Automobile",
                                    "Métallurgie / Travail du métal",
                                    "Plastique / Caoutchouc",
                                    "Administration des entreprises",
                                    "Textile / Habillement / Chaussure",
                                    "Achat / Transports / Logistique",
                                    "Agriculture",
                                    "Elevage",
                                    "Peche",
                                    "Tourisme",
                                    "Hotellerie",
                                    "Droit",
                                    "Marketing",
                                    "Sciences humaines",
                                    "Santé",
                                    "Arts",
                                  ].map((secteur) => (
                                    <SelectItem key={secteur} value={secteur}>
                                      {secteur}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex gap-4 w-full">
                      <FormField
                        control={form.control}
                        name="Justification_Choix"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>
                              Justification du choix d&apos;orientation
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Qu'est-ce qui motive votre choix d'orientation"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <DrawerFooter className="flex flex-row justify-end mx-24 my-4">
                  <DrawerClose asChild>
                    <Button type="button" variant="outline">
                      Annuler
                    </Button>
                  </DrawerClose>
                  <Button
                    type="button"
                    onClick={() => setSecondDrawerOpen(true)}
                  >
                    Continuer
                  </Button>
                </DrawerFooter>
              </div>

              {isSecondDrawerOpen && (
                <Drawer
                  open={isSecondDrawerOpen}
                  onClose={() => setSecondDrawerOpen(false)}
                >
                  <DrawerContent className="flex flex-col h-[90vh]">
                    <DrawerHeader>
                      <DrawerTitle>Notes et résultats académiques</DrawerTitle>
                      <DrawerDescription>
                        Veuillez remplir vos notes et résultats académiques.
                      </DrawerDescription>
                    </DrawerHeader>

                    <div className="flex-1 overflow-y-auto px-6">
                      <div className="flex-grow">
                        {/* Contenu du deuxième Drawer */}
                        <div className="mx-6 my-4 flex gap-4">
                          <FormField
                            control={form.control}
                            name="Note_Maths"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Note en Mathématiques</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Note en Mathématiques"
                                    className="w-full"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="Note_Physique_Chimie"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Note en Physique-Chimie</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Note en Physique-Chimie"
                                    className="w-full"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="Note_SVT"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Note en SVT</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Note en SVT"
                                    className="w-full"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="Note_Francais_Ecrit"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Note en Français (Écrit)</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Note en Français (Écrit)"
                                    className="w-full"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="mx-6 my-4 flex gap-4">
                          <FormField
                            control={form.control}
                            name="Note_Francais_Oral"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Note en Français (Oral)</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Note en Français (Oral)"
                                    className="w-full"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="Note_Anglais_Ecrit"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Note en Anglais (Écrit)</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Note en Anglais (Écrit)"
                                    className="w-full"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="Note_Anglais_Oral"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Note en Anglais (Oral)</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Note en Anglais (Oral)"
                                    className="w-full"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="Note_Facultative_1"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Note en Espagnol (Écrit)</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Note en Espagnol (Écrit)"
                                    className="w-full"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="mx-6 my-4 flex gap-4">
                          <FormField
                            control={form.control}
                            name="Personnalite"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Personnalité</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Décrivez votre personnalité"
                                    className="w-full"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="Religion"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Religion</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Entrez votre religion"
                                    className="w-full"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <DrawerFooter className="flex-shrink-0 flex flex-row justify-end px-6 my-4 border-t mx-24">
                      <DrawerClose asChild>
                        <Button type="button" variant="outline">
                          Annuler
                        </Button>
                      </DrawerClose>
                      <Button
                        onClick={() => {
                          onSubmit(form.getValues());
                        }}
                        type="submit"
                      >
                        Soumettre
                      </Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              )}
            </form>
          </Form>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
