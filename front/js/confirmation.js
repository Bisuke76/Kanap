//Fonction affichage du numéro de commande et numéro de commande mis dans l'url de la page .
//Aucun stockage n'est éffectuer comme demander.
function printId() {

    //récupération du span orderId
    let idOrder = document.querySelector("#orderId");

    //utilisation de URLSearchParams pour récupérer dans l'url l'orderId -> "?orderId="
    const urlConfirmation = window.location.search;
    const urlSearchParams = new URLSearchParams(urlConfirmation);
    idOrder.innerHTML = urlSearchParams.get('orderId'); //récupère la clé orderId et l'insère dans le span
    localStorage.clear();
    //localStorage.clear(); // vide le localStorage
}

printId();