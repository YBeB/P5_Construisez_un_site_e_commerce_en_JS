const url = 'http://127.0.0.1:3000/api/products';
const items = document.getElementById('items')

// Le role du fetch est de créer une promesse au niveau de l'API afin de recuperer les informations
fetch(url)
    // Configurer une fonction pour gérer la reponse renvoyer par la promesse 
    .then(function (response) {
        return response.json();
    })
    //Configurer une fonction qui vas traiter la reponse en format JSON de l'API
    .then(function (data) {
        // console.log(data);
        kanapShowAll(data)
    })
    .catch(function (error) {
console.log(error)

    })

var kanapShowAll = function (tableauKanap) {
    //Vider l'element items
    items.innerHTML = ""
    // Parcourir les elements du tableau recu en argument de la fonction et créer un bloc html pour chaque elements
    for (let i = 0; i < tableauKanap.length; i++) {
        let kanapHomeLink = document.createElement('a');
        let kanapHomeArticle = document.createElement('article');
        let kanapImg = document.createElement('img');
        let kanapH3 = document.createElement('h3');
        let kanapP = document.createElement('p')
        kanapImg.src = tableauKanap[i].imageUrl;
        kanapImg.alt = tableauKanap[i].altTxt;
        items.appendChild(kanapHomeLink);
        kanapHomeLink.href = `/front/html/product.html?id=${tableauKanap[i]._id}`
        kanapHomeLink.appendChild(kanapHomeArticle);
        kanapHomeArticle.appendChild(kanapImg);
        kanapHomeArticle.appendChild(kanapH3);
        kanapH3.classList.add("productName");
        kanapHomeArticle.appendChild(kanapP)
        kanapH3.innerText = tableauKanap[i].name;
        kanapP.innerText = tableauKanap[i].description;
    }
}


