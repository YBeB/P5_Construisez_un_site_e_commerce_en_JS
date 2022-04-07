const kanapImg = document.querySelector('.item__img')
var urlParams = new URLSearchParams(location.search);
let kanapIndex = urlParams.get('id');
const url = `http://127.0.1:3000/api/products/${kanapIndex}`;
var items = []
//Appel de l'api 
fetch(url)
    .then(function (response) {

        return response.json();
    })
    .then(function (data) {
        kanapImg.innerHTML = ""
        let descriptionKanap = document.getElementById('description');
        let priceKanap = document.getElementById('price');
        let bigKanapImg = document.createElement('img');
        let titleKanap = document.querySelector('title');
        let titleH1Kanap = document.querySelector('h1');
        titleKanap.innerText = data.name;
        titleH1Kanap.innerText = data.name;
        bigKanapImg.src = data.imageUrl;
        kanapImg.appendChild(bigKanapImg);
        descriptionKanap.innerText = data.description;
        priceKanap.innerText = data.price;
        let kanapColor = '<option value="">--SVP, choisissez une couleur --</option>';
        for (color of data.colors) {
            kanapColor += `<option value="${color}">${color}</option>`;
        }
        document.getElementById('colors').innerHTML = kanapColor;


        document.getElementById('addToCart').addEventListener('click', ajoutPanier);


        //Création d'une fonction qui permet d'ajouter les produits au panier
        function ajoutPanier() {
           //Création de deux variable qui stock les valeur de la couleur et de la quantité
            let colorValue = document.getElementById("colors").value;
            let itemQuantity = document.getElementById("quantity").value;
            //Création d'une variable avec l'id , la couleur et la quantié des produits 
            var productCart = { id: data._id, color: colorValue, quantity: itemQuantity};
            //Si la quantité est inférieur ou égal à zero affiché le message suivant 
            if (itemQuantity <= 0) {
                alert('La quantité dois être strictement supérieur a zéro');
            }
            //Sinon vérifié la couleur
            else {
                //Si la couleur est vide alors affiché le message suivant
                if (colorValue == "") {
                    alert('La couleur doit être choisis');

                }
                //Sinon créer 2 variable 
                else {
                    //une qui récupere le string JSON
                    var jsonString = localStorage.getItem("productCart");
                    //cette variable re-parse le JSON en Objet JS
                    var retrievedObject = JSON.parse(jsonString);
                    // Si le retrievedObject est égale a zero ou est indéfini , crée un tableau
                    if (!retrievedObject || retrievedObject === 0) {
                        retrievedObject = [];

                    }
                    // créer un tableau vide pour stocker le localStorage
                    let producToSave = [];
                    // Variablé créé pour stocker la longueur 
                    let retrievedObjectNumbers = retrievedObject.length;
                    // Si retrievedObjectNumbers est inferieur a zero
                    if (retrievedObjectNumbers > 0) {
                        var updateCart = false;
                        //créé  une boucle 
                        for (let i = 0; i < retrievedObjectNumbers; i++) {
                            //Stockage de retrieve oBject 
                            let produit = retrievedObject[i]
                            if ((produit.id == productCart.id) && (produit.color == productCart.color)) {
                                productCart.quantity = parseInt(productCart.quantity) + parseInt(produit.quantity);
                                producToSave.push(productCart);
                                updateCart = true;
                            }
                            else {

                                producToSave.push(produit);

                            }


                        }
                        if (updateCart == false) { producToSave.push(productCart) }

                    } else { producToSave.push(productCart) };
                    if (confirm("Votre produit a été ajouté au panier, voulez vous continuer dans votre panier ?") == true) {
                        window.location.href = "cart.html";
                    } else {
                        window.location.href = "index.html";
                    }


                    localStorage.setItem("productCart", JSON.stringify(producToSave));


                }
            }
        }


    })




    .catch(function (error) {
        console.log(error);
        console.log('error API');
        alert('Le serveur est indisponible pour le moment');
    })


