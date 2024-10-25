document.addEventListener("DOMContentLoadede", init);
var gastosJSON = [];
function init(){
    fetch('gastos.json')
        .then(response => response.json())
        .then(data => {
            gastosJSON = data;
            showBills(gastosJSON);
        });
}

// Referencia a variales del DOM
const bills = document.getElementById("bills");
const tBills = document.getElementById("tBills");
var nameBill = document.getElementById("nameBill");
var prizeBill = document.getElementById("prizeBill");

// Método para mostrar los gastos y su total. 
function showBills(dataBills){
    var totalBills = 0;
    //bills.innerHTML = ` `;
    dataBills.forEach (element => {
        let li = document.createElement("li");
        li.innerHTML= `
            <p>${element.name} : $${element.prize}<p><br>
        `;
        bills.append(li);
        totalBills = totalBills + element.prize;    
    })
    tBills.innerHTML=`Total acumulado: ${totalBills}$ `
}

// Método para introducir gastos en la base de datos
function addBill(){
    let newBill = gastosJSON.push({"name": nameBill, "prize": prizeBill});
    console.log(newBill);
    nameBill.innerHTML = ``;
    prizeBill.innerHTML = ``;
    showBills(gastosJSON);
}
showBills(gastosJSON);