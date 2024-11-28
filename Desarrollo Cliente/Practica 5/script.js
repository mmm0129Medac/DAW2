document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskTitle = document.getElementById("task-title");
    const taskDescription = document.getElementById("task-description");
    const taskSearch = document.getElementById("task-search");
    const columns = {
        todo: document.getElementById("todo"),
        inprogress: document.getElementById("inprogress"),
        completed: document.getElementById("completed"),
    };

    // Cargar tareas desde localStorage
    let savedTasks = getTasksFromLocalStorage();
    savedTasks.forEach(task => addTaskToDOM(task));

    // Escuchar el evento de envío del formulario
    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = taskTitle.value.trim();
        const description = taskDescription.value.trim();

        // Validaciones
        const titleRegex = /^.{3,50}$/;
        const descriptionRegex = /^.{10,200}$/;

        if (!titleRegex.test(title)) {
            alert("El título debe tener entre 3 y 50 caracteres.");
            return;
        }

        if (!descriptionRegex.test(description)) {
            alert("La descripción debe tener entre 10 y 200 caracteres.");
            return;
        }

        // Crear nueva tarea
        const newTask = {
            id: Date.now().toString(),
            title,
            description,
            status: "todo",
        };

        addTaskToDOM(newTask);
        saveTaskToLocalStorage(newTask);

        // Limpiar campos del formulario
        taskTitle.value = "";
        taskDescription.value = "";
    });

    // Búsqueda en tiempo real
    taskSearch.addEventListener("keyup", (e) => {
        const query = e.target.value.trim().toLowerCase();
        filterTasks(query);
    });

    // Función para añadir tarea al DOM
    function addTaskToDOM(task) {
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");
        taskCard.setAttribute("data-id", task.id);
        taskCard.setAttribute("data-title", task.title.toLowerCase());
        taskCard.setAttribute("data-description", task.description.toLowerCase());
        taskCard.setAttribute("draggable", "true");
        taskCard.innerHTML = `
            <h6>${task.title}</h6>
            <p>${task.description}</p>
            <button class="delete-task" style="background: none; border: none; color: red; cursor: pointer; font-size: 16px;" title="Eliminar tarea">🗑️</button>
        `;

        // Eventos de arrastre
        taskCard.addEventListener("dragstart", handleDragStart);
        taskCard.addEventListener("dragend", handleDragEnd);

        // Eventos de estilo al pasar el ratón
        taskCard.addEventListener("mouseenter", () => {
            taskCard.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
            taskCard.style.backgroundColor = "#f1f3f5";
        });

        taskCard.addEventListener("mouseleave", () => {
            taskCard.style.boxShadow = "none";
            taskCard.style.backgroundColor = "#fff";
        });

        // Evento para eliminar tarea
        taskCard.querySelector(".delete-task").addEventListener("click", () => {
            if (confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
                deleteTask(task.id);
                taskCard.remove();
            }
        });

        columns[task.status].appendChild(taskCard);
    }

    // Función para guardar tareas en localStorage
    function saveTaskToLocalStorage(task) {
        const tasks = getTasksFromLocalStorage();
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Función para obtener tareas desde localStorage
    function getTasksFromLocalStorage() {
        try {
            const tasks = JSON.parse(localStorage.getItem("tasks"));
            return Array.isArray(tasks) ? tasks : [];
        } catch (error) {
            return [];
        }
    }

    // Función para eliminar tarea del localStorage
    function deleteTask(taskId) {
        const tasks = getTasksFromLocalStorage();
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }

    // Función para filtrar tareas
    function filterTasks(query) {
        const taskCards = document.querySelectorAll(".task-card");
        const regex = new RegExp(query, "i");
        taskCards.forEach(taskCard => {
            const title = taskCard.getAttribute("data-title");
            const description = taskCard.getAttribute("data-description");
            if (regex.test(title) || regex.test(description)) {
                taskCard.style.display = "";
            } else {
                taskCard.style.display = "none";
            }
        });
    }

    // Manejo de arrastre
    let draggedTask = null;

    function handleDragStart(e) {
        draggedTask = e.target;
        e.dataTransfer.setData("text/plain", draggedTask.dataset.id);
        setTimeout(() => draggedTask.classList.add("hidden"), 0);
    }

    function handleDragEnd() {
        draggedTask.classList.remove("hidden");
        draggedTask = null;
    }

    Object.values(columns).forEach(column => {
        column.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        column.addEventListener("drop", (e) => {
            e.preventDefault();
            const taskId = e.dataTransfer.getData("text/plain");
            const newStatus = column.id;

            if (draggedTask) {
                column.appendChild(draggedTask);
                updateTaskInLocalStorage(taskId, newStatus);
            }
        });
    });

    // Función para actualizar tarea en localStorage
    function updateTaskInLocalStorage(taskId, newStatus) {
        const tasks = getTasksFromLocalStorage();
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            tasks[taskIndex].status = newStatus;
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }
});
