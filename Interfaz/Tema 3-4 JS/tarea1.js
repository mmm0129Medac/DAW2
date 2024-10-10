//función para aplicar descuentos

    var totalCompra = parseFloat(prompt("Introduce valor de la compra:"));
    var precio;
    function obtenerDescuento(){
        if (totalCompra>=1000){
            precio = totalCompra*0.85;
        }
        else if(totalCompra>=500){
            precio = totalCompra*0.90;

        }
        else{
            precio = totalCompra*0.95;
        }
        return precio;
    }

    window.alert("El precio de la compra es: " + obtenerDescuento(totalCompra) + "€");