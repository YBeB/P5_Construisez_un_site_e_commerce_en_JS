//On récupére le localstorage et on le parse
let addProduct = JSON.parse(localStorage.getItem("productCart"));
const itemCart = document.getElementById("cart__items")

const url = 'http://127.0.0.1:3000/api/products';
// Le role du fetch est de créer une promesse au niveau de l'API afin de recuperer les informations
fetch(url)
    // Configurer une fonction pour gérer la reponse renvoyer par la promesse 
    .then(function (response) {
        return response.json();
    })
    //Configurer une fonction qui vas traiter la reponse en format JSON de l'API
    .then(function (data) {

    })
  
    .catch (function (error) {
        console.log(error)
    
    })

    if (!addProduct) {
      itemCart.innerHTML = "<h3>Le Panier est vide<h3>"
  
  }
  else {

      let tabProductCart = [];
      for (f = 0; f < addProduct.length; f++) {
          tabProductCart = tabProductCart + `<section id="cart__items">
          <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                 <div class="cart__item__img">
                   <img src=""../images/product01.jpg" alt="Photographie d'un canapé">
                 </div>
                 <div class="cart__item__content">
                   <div class="cart__item__content__description">
                     <h2>Nom du produit</h2>
                     <p>${addProduct[f].color}</p>
                     <p>42,00 €</p>
                   </div>
                   <div class="cart__item__content__settings">
                     <div class="cart__item__content__settings__quantity">
                       <p>Qté : </p>
                       <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${addProduct[f].quantity}">
                     </div>
                     <div class="cart__item__content__settings__delete">
                       <p class="deleteItem">Supprimer</p>
                     </div>
                   </div>
                 </div>
               </article> 
             </section>`
      }
      if (f == addProduct.length) {
          itemCart.innerHTML = tabProductCart;
      }
  
  }












