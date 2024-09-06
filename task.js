document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = [];

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });

    function addTask(taskText) {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(task);
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button class="edit" onclick="editTask(${task.id})">Edit</button>
                    <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    window.editTask = function(id) {
        const task = tasks.find(task => task.id === id);
        if (task) {
            const newText = prompt('Edit Task:', task.text);
            if (newText) {
                task.text = newText;
                renderTasks();
            }
        }
    };

    window.deleteTask = function(id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    };
});
