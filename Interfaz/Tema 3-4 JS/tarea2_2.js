var busqueda = prompt("Introduce un animal a buscar: ").toLowerCase();
const arr = ["gato","perro","vaca","tortuga"];
function buscarElemento(){
    let i = 0;
    while(arr[i]){
        if(arr[i]===busqueda){
            return true;
        }
        i++;
    }
    return false;
}
if(buscarElemento(busqueda)=== true){
    window.alert("ENCONTRADO");
}
else{
    window.alert("NO ENCONTRADO");
}