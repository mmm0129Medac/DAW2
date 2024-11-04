document.addEventListener("DOMContentLoaded", init);
var gastosJSON = [];

function init() {
    // Cargar gastos desde el JSON
    fetch('gastos.json')
        .then(response => response.json())
        .then(data => {
            gastosJSON = data;
            showBills(gastosJSON);
        });
}

// Referencia a variables del DOM
const bills = document.getElementById("bills");
const tBills = document.getElementById("tBills");
var nameBill = document.getElementById("nameBill");
var prizeBill = document.getElementById("prizeBill");

// Método para mostrar los gastos y su total.
function showBills(dataBills) {
    let totalBills = 0;
    bills.innerHTML = '';
    dataBills.forEach(element => {
        let li = document.createElement("li");
        li.innerHTML = `<p>${element.name} : $${element.prize}</p>`;
        bills.append(li);
        totalBills += parseFloat(element.prize);    
    });
    tBills.innerHTML = `Total acumulado: ${totalBills}€`;
}

// Método para introducir gastos en la base de datos
function addBill() {
    let newBill = {
        "name": nameBill.value,
        "prize": parseFloat(prizeBill.value)
    };
    gastosJSON.push(newBill);
    console.log(newBill);
    // Limpiamos los valores
    nameBill.value = '';
    prizeBill.value = '';
    showBills(gastosJSON);
}
