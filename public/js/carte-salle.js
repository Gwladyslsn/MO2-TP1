export function element(balise, classe, texte = "") {
  const noeud = document.createElement(balise);
  noeud.className = classe;
  noeud.textContent = texte;
  return noeud;
}

export function creerCarteSalle(salle) {
  const disponible = salle.disponibles > 0;
  const badge = disponible
    ? element("p", "badge badge--disponible", "Disponible")
    : element("p", "badge", "deja reservé");
  const bouton = element("button", "bouton", "Réserver");
  bouton.type = "button";
  bouton.disabled = !disponible;

  const quartier = genres[salle.quartier] ?? salle.quartier;
  const corps = element("div", "carte-salle__corps");
  corps.append(
    element("h2", "carte-salle__nom", salle.nom),
    element("p", "carte-salle__capacite", salle.capacite),
    badge,
    bouton,
  );

  const carte = element("article", "carte-salle");
  carte.append(couverture, corps);
  return carte;

}
