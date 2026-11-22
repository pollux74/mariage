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

  // Formulaire de confirmation (Framaforms), intégré en iframe
  function renderRsvp() {
    const rsvp = SITE.rsvp || {};
    if (!connu(rsvp.urlFormulaire)) return; // section et bouton restent cachés

    let url;
    try {
      url = new URL(rsvp.urlFormulaire);
    } catch (e) {
      console.error("rsvp.urlFormulaire n'est pas un lien valide :", rsvp.urlFormulaire);
      return;
    }
    if (url.protocol !== "https:") {
      console.error("rsvp.urlFormulaire doit commencer par https://");
      return;
    }

    document.getElementById("rsvp").hidden = false;
    document.getElementById("bouton-rsvp").hidden = false;
    document.getElementById("rsvp-lien").href = url.href;

    if (connu(rsvp.dateLimite)) {
      const date = formaterDate(rsvp.dateLimite);
      // « Samedi 1 mai 2027 » -> « samedi 1 mai 2027 » au milieu de la phrase
      if (date) afficher("date-limite", "Merci de répondre avant le " + date.charAt(0).toLowerCase() + date.slice(1));
    }

    // Le message de remerciement s'affiche dans l'iframe (réglé dans Framaforms)
    const iframe = document.createElement("iframe");
    iframe.src = url.href;
    iframe.title = "Formulaire de confirmation de venue";
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer";
    document.getElementById("rsvp-cadre").append(iframe);
  }

  // Boutons : au survol (ou au focus clavier), le bord du remplissage ondule.
  // Adapté de l'exemple fourni : l'amplitude du filtre monte jusqu'à
  // AMPLITUDE_MAX, la fréquence du bruit oscille, puis tout redescend
  // à la sortie. L'animation s'arrête complètement au repos.
  function animerBoutons() {
    const bruit = document.getElementById("ondulation-bruit");
    const deplacement = document.getElementById("ondulation-deplacement");
    if (!bruit || !deplacement) return;
    const mouvementReduit = window.matchMedia("(prefers-reduced-motion: reduce)");
    const AMPLITUDE_MAX = 16;
    let actif = false;
    let amplitude = 0;
    let image = 0;
    let enCours = false;

    function etape() {
      image += 4;
      const angle = image * Math.PI / 180;
      const fx = 0.005 + 0.001 * Math.cos(angle);
      const fy = 0.01 + 0.005 * Math.sin(angle);
      bruit.setAttribute("baseFrequency", fx + " " + fy);

      if (actif && amplitude < AMPLITUDE_MAX) amplitude += 1;
      if (!actif && amplitude > 0) amplitude -= 1;
      deplacement.setAttribute("scale", String(amplitude));

      if (actif || amplitude > 0) {
        requestAnimationFrame(etape);
      } else {
        enCours = false;
      }
    }

    function demarrer() {
      if (mouvementReduit.matches) return; // remplissage simple, sans ondulation
      actif = true;
      if (!enCours) {
        enCours = true;
        requestAnimationFrame(etape);
      }
    }
    function arreter() { actif = false; }

    document.querySelectorAll(".bouton").forEach(function (bouton) {
      bouton.addEventListener("mouseenter", demarrer);
      bouton.addEventListener("focus", demarrer);
      bouton.addEventListener("mouseleave", arreter);
      bouton.addEventListener("blur", arreter);
    });
  }

  if (typeof SITE === "undefined") {
    console.error("js/data.js n'a pas pu être lu : vérifiez sa syntaxe (virgules, guillemets).");
    return;
  }
  renderAccueil();
  renderRsvp();
  animerBoutons();
})();
