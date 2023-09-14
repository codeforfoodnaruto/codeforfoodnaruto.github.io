document.getElementById('addTaskBtn').addEventListener('click', addTask);
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    
    if(taskInput.value !== '') {
        // Create a new list item
        const li = document.createElement('li');
        li.classList.add('taskItem');
        
        // Create text node with input value and append it to list item
        const taskText = document.createTextNode(taskInput.value);
        li.appendChild(taskText);

        // Create delete button and append it to list item
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(li);
            deleteTaskFromLocalStorage(taskInput.value); // delete task from local storage
        });
        li.appendChild(deleteButton);

        // Append the list item to task list
        taskList.appendChild(li);

        // Store the task in local storage
        storeTaskInLocalStorage(taskInput.value);
        
        // Clear the input field
        taskInput.value = '';
    } else {
        alert('Please enter a task.');
    }
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTaskFromLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    const taskIndex = tasks.indexOf(task);
    if(taskIndex > -1) {
        tasks.splice(taskIndex, 1);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', getTasks);

function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {
        const taskList = document.getElementById('taskList');
        
        // Create a new list item
        const li = document.createElement('li');
        li.classList.add('taskItem');
        
        // Create text node with task value and append it to list item
        const taskText = document.createTextNode(task);
        li.appendChild(taskText);

        // Create delete button and append it to list item
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(li);
            deleteTaskFromLocalStorage(task); // delete task from local storage
        });
        li.appendChild(deleteButton);

        // Append the list item to task list
        taskList.appendChild(li);
    });
}
