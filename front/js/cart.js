//On récupére le localstorage et on le parse
const itemCart = document.getElementById("cart__items");
const quantityinput =document.querySelectorAll('itemQuantity');
var addProduct = JSON.parse(localStorage.getItem("productCart"));
// Le role du fetch est de créer une promesse au niveau de l'API afin de recuperer les informations
function insideCart() {
  if (!addProduct) {
    itemCart.innerHTML = "<h3>Le Panier est vide<h3>"
  }
  else {
    //On vide la section cart__items
    itemCart.innerHTML = "";
    addProduct.forEach(productInCart => {
      // créée une variable productId pour stocker l'ID de productInCart.id(c'est a dire l'id du produit)
      let productId = productInCart.id;
      //On appel l'API avec la correspondance a l'id
      fetch(`http://localhost:3000/api/products/${productId}`)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          //On crée une variable pour stocker tout les élément situé dans le localstorage et les élements manquant qu'on récupere depuis l'API
          let product = {
            'color': productInCart.color,
            'quantity': parseInt(productInCart.quantity),'name': data.name,'price': data.price,'imgUrl': data.imageUrl,'id': productId,
          };
          //On multiplie au préalable pour faire le prix total d'un canapé
          product.price=product.price*product.quantity;
          let idQuantite=product.color+"_"+product._id;
      
          //On remplis cart__items avec la variable crée avant pour completer l'affichage du tableau récapitulatif
          itemCart.innerHTML += ` <article class="cart__item" data-id="${product._id}" data-color="${product.color}">
  <div class="cart__item__img">
    <img src="${product.imgUrl}" alt="Photographie d'un canapé">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${product.name}</h2>
      <p>${product.color}</p>
      <p>${product.price}€</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input id="${idQuantite}" type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
      </div>
      <div class="cart__item__content__settings__delete" data-id="${product._id}" data-color="${product.color}">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
</article> `;
document.getElementById(idQuantite).addEventListener('change',changeValue(idQuantite));

        })
    });


  }

}

//On Appel la fonction pour que tout ca fonctionne
insideCart();
//On crée une fonction qui permet de pouvoir changer la quantitée
function changeValue(id){
let input=document.getElementById(id);
console.log("Nouvelle quantité "+input.Value)


}



