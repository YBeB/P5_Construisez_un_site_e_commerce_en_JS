const kanapImg = document.querySelector('.item__img')
var urlParams = new URLSearchParams(location.search);
let kanapIndex = urlParams.get('id');
const url = `http://127.0.1:3000/api/products/${kanapIndex}`;
var items = []
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


        const colorValue = () => {
            const inputValueColor = document.getElementById("colors").value;
            
          }
        const itemQuantity = () =>{ const inputValueQuantity=document.getElementById("quantity").value;
       
    }
        document.getElementById('addToCart').addEventListener('click', ajoutPanier);


        function ajoutPanier() {
            var productCart = { id: data._id, color: colorValue, quantity: itemQuantity };
            //Si la quantité est inférieur a zéro
            if (quantity <= 0) {
                alert('La quantité dois être strictement supérieur a zéro');
            }
            else {
                //Si la couleur est vide 
                if (colorValue == "") {
                    alert('La couleur doit être choisis')
                }
                //Dans le cas contraire si tout fonctionne , récupérer du localStorage le produit dont on a besoin
                else {
                    var jsonString = localStorage.getItem("productCart");
                    var retrievedObject = JSON.parse(jsonString);
                    // Si le tableau n'est pas vide , le vidé;
                    if (!retrievedObject || retrievedObject == 0) {
                        retrievedObject = [];
                    }
                    // On créer un tableau vide
                    let producToSave = [];
                    for (let produit in retrievedObject) {
                        //si le produit
                        if ((produit.id == productCart.id) && (produit.color == productCart.color)) {
                            productCart.quantity += product.quantity;
                            producToSave.push(productCart);
                        }
                        else {
                            producToSave.push(producToSave);
                            producToSave.push(produit);

                        }
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





