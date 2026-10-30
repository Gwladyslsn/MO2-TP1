    /*
    Agora – TP1 : le catalogue des salles.

    Adresse de l'API Agora. Le backend doit tourner sur votre poste (voir README.md).
    Documentation de l'API (Swagger) : http://localhost:8080/docs

    Routes utiles pour cet écran :
        GET /salles       liste paginée des salles : { contenu, page, taille, total, totalPages }
        GET /quartiers    liste des quartiers
        GET /equipements  liste des équipements (code et libellé)

    Pour tester vos états de chargement, d'erreur et de liste vide, ajoutez temporairement
    l'en-tête X-Simulation (valeurs : lent, erreur, vide) à votre requête, ou le paramètre
    ?simulation=lent à l'adresse appelée. Retirez-le avant de rendre.
    */
import { creerCarteSalle, element } from "./carte-salle.js";
const API_URL = "http://localhost:8080/api/agora";

const reponse = await fetch(`${API_URL}/salles`, {
    method:  "GET",
    headers: {"Content-Type": "application/json"},
});
if (!reponse.ok){
    throw new Error(`Erreur HTTP : ${reponse.status}`);
}
const salles = await reponse.json();

export function afficherSalles(salles){
    let sallesTotal = salles.length;
    console.log(sallesTotal);

    const nbSalles = document.getElementById("nbSalles");
    nbSalles.textContent =  `Vous trouverez ${sallesTotal} salles`;

    for (let salle of salles){
        let nom = document.createElement("h3");
        nom.textContent = salle.nom;
        let capacite = document.createElement("p");
        capacite.className = `${capacite} personnes`
        capacite.textContent = salle.capacite;
        let quartier = document.createElement("p");
        quartier.textContent = salle.quartier;
        const btnReserver = document.createElement("button");
        btnReserver.textContent = "Demander la réservation";
        btnReserver.className = "reserver-btn";

        const card = document.getElementById("card");
        card.append(nom,  quartier, capacite, btnReserver);
    }
}

afficherSalles(salles.contenu)


