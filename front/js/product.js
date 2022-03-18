const kanapImg = document.querySelector('.item__img')
var urlParams = new URLSearchParams(location.search);
let kanapIndex = urlParams.get('id');
const url = `http://127.0.1:3000/api/products/${kanapIndex}`;
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

    })
    .catch(function (error) {
        console.log(error);
        console.log('error API');
        alert('Le serveur est indisponible pour le moment');
    })

