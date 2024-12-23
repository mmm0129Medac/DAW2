document.addEventListener("DOMContentLoaded", init);
var datapj = [];
function init(){
    // Cargar personajes desde el JSON
    fetch('personajes.json')
        .then(response => response.json())
        .then(data => {
            datapj = data;
            filtrerData(datapj);
        });
}

const listapj = document.getElementById("pjsList");
var filterR = [];

//Mostrar datos del JSON

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

//Función para filtrar base de datos

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