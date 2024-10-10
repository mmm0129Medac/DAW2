var limit = parseInt(prompt("Introduce valor limite: "));
var number = 1;
var suma = 0;
function sumarNumerosPares(){

    for(let i=0;i<limit;i++){
        if(((number+i)%2)===0){
            suma = suma+number+i;
        }
        else{}
    }
    return suma;
}
window.alert("La suma de los numeros pares es "+ sumarNumerosPares(suma));