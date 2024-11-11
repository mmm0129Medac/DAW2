document.addEventListener("DOMContentLoaded", function() {
    const API_URL = "http://localhost:3000/habitaciones";
    const roomTableBody = document.querySelector("#room-table tbody");
    const addRoomForm = document.querySelector("#add-room-form");
    const reportResult = document.querySelector("#report-result");
    const reportButtons = document.querySelectorAll(".report-buttons button");
    const sortCriteriaSelect = document.getElementById("sort-criteria");

    // Obtener los datos de las habitaciones
    async function fetchRooms() {
        const response = await fetch(API_URL);
        const rooms = await response.json();
        return rooms;
    }

    // Mostrar los datos en la tabla
    async function displayRooms(rooms) {
        roomTableBody.innerHTML = "";

        rooms.forEach(room => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${room.numero}</td>
                <td>${room.nombre}</td>
                <td>${room.tipo}</td>
                <td>${room.precio}</td>
                <td>${room.fechaDisponibilidad}</td>
                <td>${room.reservada ? "Reservada" : "Disponible"}</td>
                <td>
                    <button class="toggle-reservation" data-id="${room.id}" data-reserved="${room.reservada}">
                        ${room.reservada ? "Liberar" : "Reservar"}
                    </button>
                    <button class="delete-room" data-id="${room.id}">Eliminar</button>
                </td>
            `;
            roomTableBody.appendChild(row);
        });

        document.querySelectorAll(".toggle-reservation").forEach(button => {
            button.addEventListener("click", function() {
                toggleReservation(button.getAttribute("data-id"), button.getAttribute("data-reserved") === 'true');
            });
        });

        document.querySelectorAll(".delete-room").forEach(button => {
            button.addEventListener("click", function() {
                deleteRoom(button.getAttribute("data-id"));
            });
        });
    }

    // Ordenar las habitaciones
    function sortRooms(rooms, criteria) {
        return rooms.sort((a, b) => {
            switch (criteria) {
                case 'numero':
                    return a.numero - b.numero;
                case 'nombre':
                    return a.nombre.localeCompare(b.nombre);
                case 'tipo':
                    return a.tipo.localeCompare(b.tipo);
                case 'precio':
                    return a.precio - b.precio;
                case 'fechaDisponibilidad':
                    return new Date(a.fechaDisponibilidad) - new Date(b.fechaDisponibilidad);
                case 'disponibilidad':
                    return (a.reservada === b.reservada) ? 0 : a.reservada ? 1 : -1;
                default:
                    return 0;
            }
        });
    }

    // Función para actualizar la tabla cuando se seleccione un criterio de ordenación
    sortCriteriaSelect.addEventListener("change", async () => {
        const rooms = await fetchRooms();
        const sortedRooms = sortRooms(rooms, sortCriteriaSelect.value);
        displayRooms(sortedRooms);
    });

    // Inicializar la visualización de las habitaciones
    fetchRooms().then(rooms => displayRooms(sortRooms(rooms, sortCriteriaSelect.value)));

    // Añadir eventos a los botones de informes
    reportButtons.forEach(button => {
        button.addEventListener("click", generateReport);
    });

    // Función para generar informes
    async function generateReport(event) {
        const reportType = event.target.value;
        const rooms = await fetchRooms();
        
        switch (reportType) {
            case 'room-count':
                const reservadas = rooms.filter(room => room.reservada).length;
                const disponibles = rooms.length - reservadas;
                reportResult.innerHTML = `Habitaciones: </br>- Reservadas: ${reservadas} </br>- Disponibles: ${disponibles}`;
                break;
            case 'average-prize':
                const totalPrecio = rooms.reduce((acc, room) => acc + room.precio, 0);
                const promedio = (totalPrecio / rooms.length).toFixed(2);
                reportResult.innerHTML = `Precio promedio: ${promedio} €`;
                break;
            case 'max-min-prize':
                const masCara = rooms.reduce((prev, current) => (prev.precio > current.precio) ? prev : current);
                const masBarata = rooms.reduce((prev, current) => (prev.precio < current.precio) ? prev : current);
                reportResult.innerHTML = `- Habitación más cara: ${masCara.nombre} (${masCara.precio} €)</br> - Habitación más barata: ${masBarata.nombre} (${masBarata.precio} €)`;
                break;
            case 'sort-by-type':
                const disponiblesPorTipo = rooms.filter(room => !room.reservada).reduce((acc, room) => {
                    acc[room.tipo] = (acc[room.tipo] || 0) + 1;
                    return acc;
                }, {});
                reportResult.innerHTML = `Disponibles por tipo:</br> ${JSON.stringify(disponiblesPorTipo)}`;
                break;
            case 'avaiable-on-week':
                const hoy = new Date();
                const en7Dias = new Date(hoy);
                en7Dias.setDate(en7Dias.getDate() + 7);
                const proximasDisponibles = rooms.filter(room => {
                    const disponibilidad = new Date(room.fechaDisponibilidad);
                    return disponibilidad > hoy && disponibilidad <= en7Dias;
                });
                reportResult.innerHTML = `Habitaciones disponibles en los próximos 7 días:</br> ${proximasDisponibles.map(room => `${room.nombre} (Disponible desde: ${room.fechaDisponibilidad})`).join('</br>')}`;
                break;
            default:
                reportResult.innerHTML = 'Tipo de informe no reconocido.';
                break;
        }
    }
});
