const url = 'http://127.0.0.1:3000/api/products';
const kanapImg = document.querySelector('.item__img')
var urlParams = new URLSearchParams(location.search);
let kanapIndex = urlParams.get('id');

fetch(url)
    .then(function (response) {

        return response.json();
    })

    .then(function (data) {
        // descriptionKanap.innerText = data[kanapIndex].description
        const kanap = getKanapByID(data)
        let descriptionKanap = document.getElementById('description');
        let priceKanap = document.getElementById('price');
        let bigKanapImg = document.createElement('img');
        bigKanapImg.src = kanap.imageUrl;
        kanapImg.appendChild(bigKanapImg)
        descriptionKanap.innerText = kanap.description;
        priceKanap.innerText = kanap.price
        
    })
    .catch(function () {

    })

var getKanapByID = function (kanapData) {
    kanapImg.innerHTML=""
    for (let i = 0; i < kanapData.length; i++) {
        if (kanapData[i]._id == kanapIndex) {
            return kanapData[i]
        }

        
    }


    /*let i = -1
    console.log('test')
    do {
        i++
        let currentID = kanapData[i]._id
        console.log("i=" + i)
        console.log(currentID != kanapIndex)

    }
    while (i < kanapData.length);
    console.log('test')
    //console.log(kanapData[i].name)*/
}



