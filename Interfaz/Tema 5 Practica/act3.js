document.addEventListener("DOMContentLoaded", init);
let tasksJSON = [];
let taskIdCounter = 3; // Empezamos el ID en 3, para poder mostrar el resultado en la foto.

function init() {
    // Cargar tareas desde el JSON
    fetch('tareas.json')
        .then(response => response.json())
        .then(data => {
            tasksJSON = data;
            showTasks();
        });
}

// Cargamos las tareas en la tabla
function showTasks() {
    const taskTable = document.getElementById("taskTable");
    taskTable.innerHTML = ''; 

    tasksJSON.forEach(task => {
        const row = document.createElement("tr");
        row.id = `task-${task.id}`; // Asigna un ID único a cada fila

        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.dueDate}</td>
            <td><input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleComplete(${task.id})"></td>
            <td><button onclick="deleteTask(${task.id})">Eliminar</button></td>
        `;
        taskTable.appendChild(row);
    });
}

// Agrega una nueva tarea a la lista y la carga
function addTask() {
    const taskName = document.getElementById("taskName").value;
    const taskDate = document.getElementById("taskDate").value;

    if (taskName && taskDate) {
        const newTask = {
            id: taskIdCounter++,
            name: taskName,
            dueDate: taskDate,
            completed: false
        };

        tasksJSON.push(newTask);
        showTasks();

        // Limpiar campos del formulario
        document.getElementById("taskName").value = '';
        document.getElementById("taskDate").value = '';
    }
}

// Comprueba el estado de completado en la tabla
function toggleComplete(id) {
    const task = tasksJSON.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        showTasks();
    }
}

// Elimina una tarea por ID
function deleteTask(id) {
    tasksJSON = tasksJSON.filter(task => task.id !== id);
    showTasks();
}