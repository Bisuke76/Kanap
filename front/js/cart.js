//Initialisation du local storage
let productOnLocalStorage = JSON.parse(localStorage.getItem("products"));

const textEmptyCart = document.querySelector("#cart__items");

// Si le panier est vide
function getCart() {
    if (localStorage.getItem("products")) {
        if (productOnLocalStorage.length > 0) {


            productOnLocalStorage.forEach((product) => {
                document.getElementById(
                        "cart__items"
                    ).innerHTML += `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                                        <div class="cart__item__img">
                                            <img src="${product.productImg}" alt=${product.productAltImg}>
                                        </div>
                                        <div class="cart__item__content">
                                            <div class="cart__item__content__description">
                                                <h2>${product.productName}</h2>
                                                <p>${product.color}</p>
                                                <p>${product.productPrice} €</p>
                                            </div>
                                            <div class="cart__item__content__settings">
                                                <div class="cart__item__content__settings__quantity">
                                                    <p>Qté : </p>
                                                    <input  type="number" class="itemQuantity" id="${product.id}" name="itemQuantity" min="1" max="100"  value=${product.quantityProduct}>
                                                </div>
                                                <div class="cart__item__content__settings__delete">
                                                    <p class="deleteItem">Supprimer</p>
                                                </div>
                                            </div>
                                        </div>
                                    </article> `;
            });
        } else {
            const emptyCart = `<p>Votre panier est vide</p>`;
            textEmptyCart.innerHTML = emptyCart;
        }
    }
}


getCart();

// Changement de la quantité des produits

function changeQuantity() {

    let itemQuantity = document.querySelectorAll(".itemQuantity");
    
    itemQuantity.forEach(item => {
        const itemCloset = item.closest("article");
        let newQuantity = "";
        const id = itemCloset.dataset.id;
        const colorItem = itemCloset.dataset.color;

        console.log(id);
        console.log(colorItem);

        item.addEventListener('change', e => {
            e.preventDefault();
            newQuantity = Number(item.value);
            console.log("new" + newQuantity);

            productOnLocalStorage.forEach(product => {
                if (product.id === id && product.color === colorItem) {

                    console.log("ok if");

                    product.quantityProduct = newQuantity

                }
            })

            localStorage.setItem("products", JSON.stringify(productOnLocalStorage));
        })
    })
}

changeQuantity();

// Suppression des produits
function deleteProduct() {
    let btnDelete = document.querySelectorAll(".deleteItem");

    for (let n = 0; n < btnDelete.length; n++) {
        btnDelete[n].addEventListener("click", (event) => {
            event.preventDefault();

            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            let idDelete = productOnLocalStorage[n].id;
            let colorDelete = productOnLocalStorage[n].color;

            productOnLocalStorage = productOnLocalStorage.filter(
                (el) => el.id !== idDelete || el.color !== colorDelete
            );

            localStorage.setItem("products", JSON.stringify(productOnLocalStorage));

            //Alerte produit supprimé et refresh
            alert("Ce produit est supprimé de votre panier");

            location.reload();
        });
    }
}
deleteProduct();

// Fonction du total du panier 
function cartPriceTotal() {

    let total = 0;
    productOnLocalStorage.forEach(product => {
        total = total + (Number(product.productPrice) * Number(product.quantityProduct))
    })


    const printTotal = document.getElementById("totalPrice");
    const printHTMLTotal = `${total}`;
    printTotal.innerHTML = printHTMLTotal;

    //return total;
}

cartPriceTotal();

// Fonction Ajout de quantité 

function cartQuantityTotal() {

    let quantityTotal = 0;

    productOnLocalStorage.forEach(product => {
        quantityTotal = quantityTotal + (Number(product.quantityProduct++))
    })

    const printQuantityTotal = document.getElementById("totalQuantity");
    const printQuantityHTMLTotal = `${quantityTotal}`;
    printQuantityTotal.innerHTML = printQuantityHTMLTotal;

}

cartQuantityTotal();