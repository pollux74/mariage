/*
 * Affiche le contenu du site à partir de l'objet SITE (js/data.js).
 * Aucune donnée ici : tout se modifie dans data.js.
 */
(function () {
  "use strict";

  const A_COMPLETER = "À COMPLÉTER";

  // Vrai si la valeur est renseignée (ni vide, ni « À COMPLÉTER »)
  function connu(valeur) {
    return typeof valeur === "string"
      ? valeur.trim() !== "" && valeur.trim() !== A_COMPLETER
      : valeur != null;
  }

  // Remplit un élément avec du texte et l'affiche, ou le laisse caché
  function afficher(id, texte) {
    const el = document.getElementById(id);
    if (!el || !connu(texte)) return;
    el.textContent = texte;
    el.hidden = false;
  }

  // "2027-06-12" -> "Samedi 12 juin 2027" (sans décalage de fuseau)
  function formaterDate(iso) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
    if (!m) return "";
    const jour = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], 12));
    const texte = new Intl.DateTimeFormat("fr-FR", {
      weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
    }).format(jour);
    return texte.charAt(0).toUpperCase() + texte.slice(1);
  }

  function renderAccueil() {
    const h1 = document.getElementById("prenoms");
    const [p1, p2] = SITE.couple || [];
    h1.append(p1 || "", " ");
    const esp = document.createElement("span");
    esp.className = "esperluette";
    esp.textContent = "&";
    h1.append(esp, " ", p2 || "");

    afficher("date-mariage", formaterDate(SITE.date));
    // « Mas Nouveau · Génolhac » (seulement les parties renseignées)
    afficher("ville", [SITE.lieuAccueil, SITE.ville].filter(connu).join(" · "));
    afficher("message", SITE.messageAccueil);

    if (connu(SITE.date)) {
      document.title = SITE.couple.join(" & ") + " · " + formaterDate(SITE.date);
    }
  }

  if (typeof SITE === "undefined") {
    console.error("js/data.js n'a pas pu être lu : vérifiez sa syntaxe (virgules, guillemets).");
    return;
  }
  renderAccueil();
})();
