//On récupére le localstorage et on le parse
const itemCart = document.getElementById("cart__items");
var addProduct = JSON.parse(localStorage.getItem("productCart"));

// Le role du fetch est de créer une promesse au niveau de l'API afin de recuperer les informations
function insideCart() {
  if (!addProduct) {
    itemCart.innerHTML = "<h3>Le Panier est vide<h3>"
  }
  else {
    itemCart.innerHTML = "";
    addProduct.forEach(productI => {
      let productId = productI.id;
      fetch(`http://localhost:3000/api/products/${productId}`)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          let product = {
            'color': productI.color,
            'quantity': parseInt(productI.quantity),
            'name': data.name,
            'price': data.price,
            'imgUrl': data.imageUrl,
            'id': productId,
          };
          itemCart.innerHTML += ` <article class="cart__item" data-id="${product._id}" data-color="${product.color}">
  <div class="cart__item__img">
    <img src="${product.imgUrl}" alt="Photographie d'un canapé">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${product.name}</h2>
      <p>${product.color}</p>
      <p>${product.price * product.quantity}€</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
      </div>
      <div class="cart__item__content__settings__delete" data-id="${product._id}" data-color="${product.color}">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
</article> `
        })
    });


  }

}

insideCart();

function saveCart(productCart){
localStorage.setItem('productCart',JSON.stringify(productCart))
};

