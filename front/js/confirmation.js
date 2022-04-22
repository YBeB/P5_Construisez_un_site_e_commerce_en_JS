
    let orderId = document.getElementById("orderId");
    orderId.innerText=""
    function showIdOrder (){
        orderId.innerText = localStorage.getItem("orderId");
    localStorage.clear();
   }
   showIdOrder()
