export function ajoutListenersAvis() {
    const piecesElements = document.querySelectorAll(".fiches articles button")
    for (let i = 0; i < piecesElements.lenght; i++) {
        piecesElements[i].addEventListener("click", async (event) => {
            const id = event.target.dataset.id;
            fetch(`http://localhost:8081/pieces/${id}/avis`);
        })
    }
}