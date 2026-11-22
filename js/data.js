/*
 * ===================================================================
 *  INFORMATIONS DU MARIAGE — c'est le SEUL fichier à modifier
 *  pour changer une date, une adresse, un texte ou un lien.
 * ===================================================================
 *
 *  Règles pour ne rien casser :
 *  - Le texte va toujours entre guillemets droits : "comme ceci".
 *  - Pour mettre une apostrophe dans un texte, rien de spécial :
 *    "l'église" fonctionne très bien entre guillemets doubles.
 *  - Pour mettre des guillemets DANS un texte, utilisez « » .
 *  - Chaque ligne d'une liste ou d'un bloc se termine par une virgule.
 *  - Une information inconnue reste "À COMPLÉTER" : elle n'est alors
 *    pas affichée sur le site.
 *
 *  Après modification : enregistrer, recharger la page dans le
 *  navigateur et vérifier le résultat.
 */

const SITE = {
  // Prénoms, dans l'ordre d'affichage
  couple: ["Elsa", "Arthur"],

  // Jour du mariage, au format AAAA-MM-JJ
  date: "2027-06-12",

  // Heure de la cérémonie, au format HH:MM (heure de Paris)
  heureCeremonie: "À COMPLÉTER",

  // Lieu affiché sur l'accueil, avant la ville. Mettre "" pour le retirer.
  lieuAccueil: "Mas Nouveau",

  // Ville affichée sur l'accueil
  ville: "Génolhac",
  codePostal: "30450",

  // Message affiché sur l'accueil tant que le site est en préparation.
  // Mettre "" pour le retirer.
  messageAccueil: "Les infos arrivent bientôt",

  // --- Sections à venir (pas encore affichées) ----------------------

  // Liste de { heure: "14:30", titre: "", description: "", lieuId: "" }
  programme: [],

  // Liste de { id: "", nom: "", type: "cérémonie" | "réception" |
  //   "hébergement" | "parking", adresse: "", lat: 0, lng: 0, infos: "" }
  lieux: [],

  acces: "À COMPLÉTER",

  // Liste de { nom: "", type: "", distance: "", prix: "", lien: "", telephone: "" }
  hebergements: [],

  dressCode: "À COMPLÉTER",

  // Formulaire de confirmation de venue (Framaforms).
  // Tant que le lien est "À COMPLÉTER", la section et le bouton
  // « Répondre à l'invitation » restent cachés.
  rsvp: {
    // Lien public du formulaire Framaforms (https://framaforms.org/…)
    urlFormulaire: "https://framaforms.org/confirmer-votre-venue-elsa-et-arthur-1795362740",
    // Date limite de réponse, au format AAAA-MM-JJ
    dateLimite: "À COMPLÉTER",
  },

  cadeaux: {
    texte: "À COMPLÉTER",
    lien: "À COMPLÉTER",
  },

  // Liste de { question: "", reponse: "" }
  faq: [],

  // Liste de { nom: "", role: "", contact: "" } — seulement ce que vous acceptez de publier
  contacts: [],
};
