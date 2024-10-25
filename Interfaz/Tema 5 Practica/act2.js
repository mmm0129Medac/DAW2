document.addEventListener("DOMContentLoadede", init);
var gastosJSON = [];
function init(){
    fetch('gastos.json')
        .then(response => response.json())
        .then(data => {
            datapj = data;
            filtrerData(gastosJSON);
        });
}

