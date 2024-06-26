export function ajoutListenersAvis() {

    const piecesElements = document.querySelectorAll(".fiches article button");
 
    for (let i = 0; i < piecesElements.length; i++) {

      piecesElements[i].addEventListener("click", async function (event) { 
         const id = event.target.dataset.id;
         let pieceClass = document.querySelector(`.class${id}`)

         if (pieceClass === null) {
            const reponse = await fetch("http://localhost:8081/pieces/" + id + "/avis");
            const avis = await reponse.json();
            const pieceElement = event.target.parentElement;
            const avisElement = document.createElement("p");
            avisElement.classList.toggle(`class${id}`)
            
            for (let i = 0; i < avis.length; i++) {
               avisElement.innerHTML += `<b>${avis[i].utilisateur}:</b> ${avis[i].commentaire} (${avis[i].nbEtoiles}/5 étoiles)<br>`;
            }
            pieceElement.appendChild(avisElement);
            event.target.textContent = "Cacher les avis"

         } else {
            pieceClass.innerHTML = ""
            pieceClass.classList.toggle(`class${id}`)
            event.target.textContent = "Afficher les avis"
         }
     });
    }
 }
 
 export function ajoutListenerEnvoyerAvis() {
    const formulaireAvis = document.querySelector(".formulaire-avis");
    formulaireAvis.addEventListener("submit", function (event) {
      event.preventDefault();
      // Création de l’objet du nouvel avis.
      const avis = {
         pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
         utilisateur: event.target.querySelector("[name=utilisateur").value,
         commentaire: event.target.querySelector("[name=commentaire]").value,
         nbEtoiles: event.target.querySelector("[name=nbEtoiles]").value,
      };
      // Création de la charge utile au format JSON
      const chargeUtile = JSON.stringify(avis);
      // Appel de la fonction fetch avec toutes les informations nécessaires
      fetch("http://localhost:8081/avis", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: chargeUtile
      });
    });
    
 }