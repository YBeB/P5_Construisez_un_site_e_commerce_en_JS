
    let orderId = document.getElementById("orderId");
    orderId.innerText=""
    function showIdOrder (){
    var urlParams = new URLSearchParams(location.search);
    let order = urlParams.get('orderId');
    orderId.innerText = order;
   }
   showIdOrder()
