const url = 'http://127.0.0.1:3000/api/products';
const descriptionKanap = document.getElementById('description')

var urlParams = new URLSearchParams(location.search);
let kanapIndex = urlParams.get('id');

fetch(url)
    .then(function (response) {

        return response.json();
    })

    .then(function (data) {
        // descriptionKanap.innerText = data[kanapIndex].description
        getKanapByID(data)
        console.log('testda')
    })
    .catch(function () {

    })

var getKanapByID = function (kanapData) {
    let i = -1
    console.log('test')
    do {
        i++
        let currentID = kanapData[i]._id
        console.log("i=" + i)
        console.log(currentID != kanapIndex)

    }
    while (i < kanapData.length)
    console.log('test')
    //console.log(kanapData[i].name)
}



