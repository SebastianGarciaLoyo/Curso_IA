document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // --- 1. Lógica de Persistencia (Local Storage) ---

    function getTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : []; 
    }

    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // --- 2. Funcionalidad de Renderizado ---

    function renderTasks() {
        const tasks = getTasks();
        taskList.innerHTML = ''; 

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.setAttribute('data-id', task.id);
            
            if (task.completed) {
                li.classList.add('completed');
            }

            li.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div class="task-actions">
                    <button class="complete-btn" title="Marcar como completada">
                        ${task.completed ? '✅' : '⚪'} 
                    </button>
                    <button class="delete-btn" title="Eliminar tarea">
                        🗑️
                    </button>
                </div>
            `;
            
            li.querySelector('.complete-btn').addEventListener('click', () => toggleTaskComplete(task.id));
            li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.id));

            taskList.appendChild(li);
        });
    }

    // --- 3. Operaciones CRUD ---

    // Crear Tarea (C - Create)
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const newTask = {
            id: Date.now(), 
            text: taskText,
            completed: false
        };

        const tasks = getTasks();
        tasks.push(newTask);
        saveTasks(tasks);
        
        taskInput.value = ''; 
        renderTasks(); 
    });

    // Actualizar Estado (U - Update)
    function toggleTaskComplete(id) {
        const tasks = getTasks();
        const updatedTasks = tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        saveTasks(updatedTasks);
        renderTasks();
    }

    // Eliminar Tarea (D - Delete)
    function deleteTask(id) {
        let tasks = getTasks();
        tasks = tasks.filter(task => task.id !== id); 
        saveTasks(tasks);
        renderTasks();
    }

    // Cargar tareas al inicio 
    renderTasks();
});