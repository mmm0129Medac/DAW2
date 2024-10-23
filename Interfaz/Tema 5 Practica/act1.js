document.addEventListener("DOMContentLoadede", init);
var datapj = [];
function init(){
    fetch('personajes.json')
        .then(response => response.json())
        .then(data => {
            datapj = data;
            filtrerData(datapj);
        });
}

const listapj = document.getElementById("pjsList");
var filterR = [];

function showData(data) {
    listapj.innerHTML = " ";
    data.forEach (element => {
        let li = document.createElement("li");
        li.innerHTML= `
            <h3>--${element.nombre}--</h3>
            <p>Edad: ${element.edad}</p>
            <p>Raza: ${element.raza}</p></br>
        `;
        listapj.append(li);         
    })
}

function filtrerData (data) {
    var filterR = document.getElementById("razaselector").value;
    if (filterR != "todos"){
        pjFiltred = data.filter(pj => pj.raza === filterR);
        showData(pjFiltred);
    }
    else {
        showData(data);
    }
}
init();