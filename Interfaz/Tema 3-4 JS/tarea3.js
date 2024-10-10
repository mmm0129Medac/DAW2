const canciones = [
    {
    titulo: "Bohemian Rhapsody",
    artista: "Queen",
    duracion: 355, // segundos
    genero: "Rock"
    },
    {
    titulo: "Shape of You",
    artista: "Ed Sheeran",
    duracion: 235,
    genero: "Pop"
    },
    {
    titulo: "Hotel California",
    artista: "Eagles",
    duracion: 390,
    genero: "Rock"
    }
    ];
    //Titulos de canciones
    console.log("____________TITULOS DE LAS CANCIONES____________");
    
    canciones.forEach(function(cancion){

        console.log(cancion.titulo);
    });

    //filtro
    console.log("____________FILTRADO POR GENERO____________");

    function filtroCanciones(cancion) {
        if(cancion.genero == "Rock"){
            return cancion.titulo;
        }

    }
    const cancionesFiltradas = canciones.filter(filtroCanciones);
    console.log(cancionesFiltradas);

    //find
    console.log("____________BUSQUEDA POR TITULO____________");

    const value = prompt("Introduce nombre a buscar");
    function isTitle(cancion){
        return cancion.titulo == value;
    }

    console.log(canciones.find(isTitle));

    //sort
    console.log("____________ORDENADO POR DURACION____________");

    canciones.sort((a, b) => a.duracion - b.duracion);

    console.log(canciones);

