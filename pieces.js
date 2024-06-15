// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();

for (let i = 0; i < pieces.length; i++) {

    const article = pieces[i];
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".fiches");
    // Création d’une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article");
    // Création des balises 
    const imageElement = document.createElement("img");
    imageElement.src = article.image;
    const nomElement = document.createElement("h2");
    nomElement.innerText = article.nom;
    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
    const categorieElement = document.createElement("p");
    categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
    const stockElement = document.createElement("p");
    stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
    
    // On rattache la balise article a la section Fiches
    sectionFiches.appendChild(pieceElement);
    // On rattache l’image à pieceElement (la balise article)
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    //Ajout des éléments au DOM pour l'exercice
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(stockElement);

 }
 
 //gestion des boutons 
const piecesOrdonnees = Array.from(pieces); //Cré une copie de la liste pour que sort() ne modifie pas l'originale (action in-place)

const boutonTrierCroissant = document.querySelector(".btn-trier-croissant");
boutonTrierCroissant.addEventListener("click", function () {
    piecesOrdonnees.sort(function (a, b) { //Ou piecesOrdonnees.sort((a,b) => a.prix - b.prix)
        return a.prix - b.prix; //Tri dans l'ordre croissant
     });
     console.log(piecesOrdonnees);
});

const boutonTrierDecroissant = document.querySelector(".btn-trier-decroissant");
boutonTrierDecroissant.addEventListener("click", function () {
    piecesOrdonnees.sort(function (a, b) {
        return b.prix - a.prix; //Tri dans décroissant
     });
     console.log(piecesOrdonnees);
});

const boutonFiltrerPrix = document.querySelector(".btn-filtrer-prix");
boutonFiltrerPrix.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) { //On déclare directement la nouvelle liste qui contientra les retours de filter()
        return piece.prix <= 35;
    });
   console.log(piecesFiltrees)
});

const boutonFiltrerDescription = document.querySelector(".btn-filtrer-description");
boutonFiltrerDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.description !== undefined;
    });
   console.log(piecesFiltrees)
});