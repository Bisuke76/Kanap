// Initialisation variable url contenant l'API
let url = "http://localhost:3000/api/products";

// Fonction affichage produits 
function getAllProducts() {
  // Récupération produits depuis API
  fetch(url).then((data) => data.json()
    .then((data) => {
      // Boucle pour afficher les produits
      for (let i = 0; i < data.length; i++) {
        let name = data[i].name;
        let description = data[i].description;
        let price = data[i].price;
        let image = data[i].imageUrl;
        let altTxt = data[i].altTxt;
        let id = data[i]._id;
        let items = `<a href="./product.html?id=${id}">
            <article>
              <img src="${image}" alt=${altTxt}">
              <h3 id="productName">${name}</h3>
              <p class="productDescription">${description}/p>
              <p>Prix : ${price} € </p>
            </article>
          </a> `
        document.querySelector('.items').innerHTML += items;
      }
    })
  )
};
getAllProducts();