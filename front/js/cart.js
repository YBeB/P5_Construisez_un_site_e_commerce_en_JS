const cartItems = document.getElementById("cart__items");
var productSaved = JSON.parse(localStorage.getItem('productCart'));

function panierDisplay() {
    if (productSaved == null || productSaved == [] || productSaved.length < 1) {
        cartItems.innerHTML = 'Votre panier est vide.';
        calculPrixTotal();
        document.getElementById('order').addEventListener('click', function(e) {
            e.preventDefault();
            alert('Votre panier est vide.');
        })
    } else {
        cartItems.innerHTML = "";
        let counter = 0;
        productSaved.forEach(oneProduct => {
            let productId = oneProduct.id;
            fetch(`http://localhost:3000/api/products/${productId}`)
                .then(function(response) {
                    return response.json();
                }).then(function(resolve) {
                    let product = {
                        'color': oneProduct.color,
                        'quantity': parseInt(oneProduct.quantity),
                        'name': resolve.name,
                        'price': resolve.price,
                        'imgUrl': resolve.imageUrl,
                        '_id': productId,
                    };
                    cartItems.innerHTML += `
                    <article class="cart__item" data-id="${product._id}" data-color="${product.color}">
                    <div class="cart__item__img">
                    <img src="${product.imgUrl}" alt="Photographie du canapé ${product.name}">
                    </div>
                    <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${product.name}</h2>
                        <p>${product.color}</p>
                        <p id='productPrice_${product._id}_${product.color}'>${product.price * parseInt(product.quantity) } €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                        <p>Qté :</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete" data-id="${product._id}" data-color="${product.color}">
                        <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                    </div>
                </article>`;
                    counter++;
                    return counter;
                }).then(function(counter) {
                    if (counter == productSaved.length) {
                        calculPrixTotal();
                        changeQuantite();
                        removeProduct();
                    }
                })
        })
    }
}

const calculPrixTotal = () => {
  //On attribut une valeur numérique de départ(donc 0) a total et qteTotal
    let total = 0;
    let qteTotal = 0;
    //On tranform le JSON en valeur Javascript
    productSaved = JSON.parse(localStorage.getItem('productCart'));
    productSaved.forEach(oneProduct => {
        let productId = oneProduct.id;
        //On fait un appel a l'api avec une promesse , comme précédemment fait (avec l'ID en fin)
        fetch(`http://localhost:3000/api/products/${productId}`)
            .then(item => item.json())
            .then(data => {
              //On multiplie le prix et la quantité et on addtionne avec le total
                total += data.price * parseInt(oneProduct.quantity);
                try {
                    document.getElementById('productPrice_' + productId + "_" + oneProduct.color).innerHTML = (data.price * parseInt(oneProduct.quantity)) + " €";
                } catch (error) { console.log(error) }
                qteTotal += parseInt(oneProduct.quantity);
                document.getElementById('totalPrice').innerHTML = total;
                document.getElementById('totalQuantity').innerHTML = qteTotal;
            })
    });
    if (productSaved.length < 1) {
        document.getElementById('totalPrice').innerHTML = 0;
        document.getElementById('totalQuantity').innerHTML = 0;
    }
}
//Création d'une constante pour le changement de la quantité
const changeQuantite = () => {
  //On selectionne la classe itemQuantity
    const quantityInputs = document.querySelectorAll('.itemQuantity');
    //On execute la fonction qu'on vas crée pour chaque element du tableau avec forEach
    quantityInputs.forEach(input => {
          //On luit attribut un event Listener avec l'attribut change en tant qu'event pour actionner le callback si un changement au niveau de l'input est fait
        input.addEventListener('change', () => {
          //On crée une constante avec closest a l'interieur , ca permet de selectionner l'element le plus proche
            const articleToRemove = input.closest('article');
            //On récuperer l'atribut data-id et data-color, avec getAttribute
            const idProductToChange = articleToRemove.getAttribute('data-id');
            const colorProductToChange = articleToRemove.getAttribute('data-color');
            // On crée un tableau vide;
            let finalProductSave = [];
            productSaved.forEach(product => {
                //Si le l'id du produit est strictement égale a l'attribut data-id et si la couleur du produit et strictement egale a l'atribut data-color
                if (product.id === idProductToChange && product.color === colorProductToChange) {
                  //Si l'input Value est inferieur a zero
                    if (input.value < 0) {
                      //Alors on pousse le produit dans le tableau  mais on ne met pas a jour la quantité
                        finalProductSave.push(product);
                        //On alerte l'utilisateur qu'il faut absolument mettre une quantité superieur a zero
                        alert("la quantite doit etre supérieure ou égale à zéro");
                        //Si l'utilisateur indique une quantité de zero alors le produit est tout simplement supprimé 
                    } else if (input.value == 0) {
                      //On selectione l'article le plus proche avec articleToRemove et on le supprime avec le .remove dans le DOM
                        articleToRemove.remove();
                    } else {
                     //Autrement si le produit et baisser ou augmente , alors on met a jour la quantité et on le pousse dans le tableau 
                        product.quantity = input.value;
                        finalProductSave.push(product);
                    }
                } else {
                  //Si l'id ne corresponds pas a l'id de Data-ID ni la couleur de data-color alors on pousse sans rien changé , donc identique
                    finalProductSave.push(product);
                }
                //On met a jour les valeurs  localStorage dans le tableau crée
                localStorage.setItem(('productCart'), JSON.stringify(finalProductSave));
                //On appel la fonction calculprixTotal , pour recalculer si il y a eu un changement dans la quantité ou non
                calculPrixTotal();
            });
        })
    })
}

function removeProduct() {
    const deleteBtns = document.querySelectorAll('.deleteItem');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const articleToRemove = btn.closest('article');
            const idProductToDelete = articleToRemove.getAttribute('data-id');
            const colorProductToDelete = articleToRemove.getAttribute('data-color');
            productSaved = JSON.parse(localStorage.getItem('productCart'));
            let finalProductSave = [];
            productSaved.forEach(product => {
                if (product.id === idProductToDelete && product.color === colorProductToDelete) {
                    articleToRemove.remove();
                } else {
                    finalProductSave.push(product);
                }
            });
            console.log(finalProductSave);
            localStorage.setItem(('productCart'), JSON.stringify(finalProductSave));
            productSaved = JSON.parse(localStorage.getItem('productCart'));
            calculPrixTotal();
        });
    })
}

panierDisplay();



