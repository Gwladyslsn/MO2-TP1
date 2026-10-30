/*
Documentation de l'API (Swagger) : http://localhost:8080/docs

*/
const API_URL = "http://localhost:8080/api/agora";

const reponse = await fetch(`${API_URL}/salles`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
});
if (!reponse.ok) {
    throw new Error(`Erreur HTTP : ${reponse.status}`);
}
const data = await reponse.json();
const toutesSalles = data.contenu;

// Crée un élément, lui ajoute ses classes avec classList et, si besoin, son texte
function creer(balise, classes, texte) {
    const element = document.createElement(balise);
    element.classList.add(...classes);
    if (texte !== undefined) {
        element.textContent = texte;
    }
    return element;
}

export function afficherSalles(salles) {
    const liste = document.getElementById("card");
    liste.classList.add("catalogue__liste"); // la grille de cartes
    liste.innerHTML = "";

    const nbSalles = document.getElementById("nbSalles");
    nbSalles.classList.add("catalogue__compte");
    nbSalles.textContent = `${salles.length} ${salles.length > 1 ? "salles" : "salle"}`;

    for (const salle of salles) {
        const carte = creer("article", ["carte"]);

        // Visuel provisoire (aplat de couleur + pictogramme fournis par le CSS)
        const visuel = creer("div", ["carte__visuel"]);
        visuel.setAttribute("aria-hidden", "true");

        const corps = creer("div", ["carte__corps"]);

        const nom = creer("h3", ["carte__titre"], salle.nom);
        const quartier = creer("p", ["carte__info", "carte__info--lieu"], salle.quartier);
        const capacite = creer("p", ["carte__info", "carte__info--capacite"], `${salle.capacite} personnes`);

        // Équipements : accepte une liste de textes ou une liste d'objets { code, libelle }
        const etiquettes = creer("ul", ["carte__etiquettes"]);
        for (const equipement of salle.equipements ?? []) {
            const libelle = equipement.libelle ?? equipement.code ?? equipement;
            etiquettes.append(creer("li", ["etiquette"], libelle));
        }

        const lien = creer("a", ["bouton", "bouton--secondaire", "carte__action"], "Voir la salle");
        lien.href = `salle.html?id=${salle.id}`;

        corps.append(nom, quartier, capacite, etiquettes);

        // Tarif : affiché seulement si l'API le fournit (\n = retour à la ligne)
        if (salle.tarif) {
            corps.append(creer("p", ["carte__tarif"], salle.tarif));
        }

        corps.append(lien);
        carte.append(visuel, corps);
        liste.append(carte);
    }
}

export function afficherResultatRecherche() {
    const recherche = document.getElementById("recherche").value.trim().toLowerCase();

    const resultat = toutesSalles.filter((salle) =>
        salle.nom.toLowerCase().includes(recherche)
    );

    const resultMessage = document.getElementById("message");
    resultMessage.classList.add("message");
    resultMessage.textContent = resultat.length === 0 ? "Aucune salle trouvée" : "";

    afficherSalles(resultat);
}

const inputRecherche = document.getElementById("recherche");
inputRecherche.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault(); // empêche l'envoi du formulaire
        afficherResultatRecherche();
    }
});

afficherSalles(toutesSalles);


