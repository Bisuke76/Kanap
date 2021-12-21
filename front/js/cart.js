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

// Contact Fonction et ecoute change Regex
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

// funtion et change Prenom
function validFirstNameRegex(firstName) {
    let nameRegExp = new RegExp("^[À-ÿA-z]+$|^[À-ÿA-z]+-[À-ÿA-z]+$", "g");

    return validRegex(firstName, "prénom", nameRegExp);
}

firstName.addEventListener("change", (e) => {
    e.preventDefault();
    validFirstNameRegex(firstName);
});

//Fonction et change Nom
function validLastNameRegex(lastName) {
    let nameRegExp = new RegExp("^[À-ÿA-z]+$|^[À-ÿA-z]+-[À-ÿA-z]+$", "g");
    return validRegex(lastName, "nom", nameRegExp);
}

lastName.addEventListener("change", (e) => {
    e.preventDefault();
    validLastNameRegex(lastName);
});
//Fonction et change Adresse
function validAddressRegex(address) {
    let nameRegExp = new RegExp("^[0-9]{1,4} [^- ][a-zA-Z '-àâäéèêëïîôöùûü]*[^- ]$", "g");
    return validRegex(address, "adresse", nameRegExp);
}

address.addEventListener("change", (e) => {
    e.preventDefault();
    validAddressRegex(address);
});
//Fonction et change City
function validCityRegex(city) {
    let nameRegExp = new RegExp("^[a-zA-Z',.\s-]{1,25}$", "g");
    return validRegex(city, "ville", nameRegExp);
}

city.addEventListener("change", (e) => {
    e.preventDefault();
    validCityRegex(city);
});
//Fonction et change Email
function validEmailRegex(email) {
    let nameRegExp = new RegExp("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\w+)*(\\.\\w{2,8})+$", "g");
    return validRegex(email, "email", nameRegExp);
}

email.addEventListener("change", (e) => {
    e.preventDefault();
    validEmailRegex(email);
});

//Fonction ValideRegex stylisation unique.
function validRegex(inputName, nameType, nameRegExp) {
    let testName = nameRegExp.test(inputName.value);
    if (testName) {
        inputName.nextElementSibling.innerHTML = "Validé";
        inputName.nextElementSibling.style.color = "green";
        return true;
    } else {
        inputName.nextElementSibling.innerHTML = "Saisissez votre " + nameType;
        inputName.nextElementSibling.style.color = "red";
        return false;
    }
}

//Fonction de validation en Regex et Envoie du formulaire en méthode POST 
function validAndSubmitForm() {

    const btnOrder = document.getElementById("order");

    btnOrder.addEventListener('click', (e) => {
        e.preventDefault()

        let canOrder = validFirstNameRegex(firstName) && validLastNameRegex(lastName) && validAddressRegex(address) && validCityRegex(city) && validEmailRegex(email);

        if (canOrder) {

            //Construction d'un array depuis le local storage
            let idProducts = [];
            for (let i = 0; i < productOnLocalStorage.length; i++) {
                idProducts.push(productOnLocalStorage[i].id);
            }


            const order = {
                contact: {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    address: address.value,
                    city: city.value,
                    email: email.value,
                },
                products: idProducts,
            }

            const options = {
                method: 'POST',
                body: JSON.stringify(order),
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                },
            };

            fetch("http://localhost:3000/api/products/order", options)
                .then((response) => response.json())
                .then((data) => {

                    localStorage.clear();
                    localStorage.setItem("orderId", data.orderId);

                    document.location.href = `confirmation.html?orderId=${data.orderId}`;
                })
                .catch((err) => {
                    alert("Problème avec fetch : " + err.message);
                });

        } else {

            alert("Veuillez saisir correctement tout les champs !")
        }

    });
}

validAndSubmitForm();