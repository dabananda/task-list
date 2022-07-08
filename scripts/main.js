const form = document.getElementById('input-form');
const input = document.getElementById('input');
const inputBtn = document.getElementById('input-btn');
const taskFilter = document.getElementById('task-filter');
const tasksList = document.getElementById('tasks-list');
const tasksClear = document.getElementById('tasks-clear');

form.addEventListener('submit', addTask);
tasksList.addEventListener('click', removeTask);
tasksClear.addEventListener('click', clearAllTask);
taskFilter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks);

function addTask(e) {
  e.preventDefault();
  if (input.value === '') {
    alert('Empty Task');
  } else {
    const li = document.createElement('li');
    li.setAttribute('class', 'task');
    li.innerHTML = `<div class="task-box">
              <p>${input.value}</p>
              <button del>X</button>
            </div>`;
    tasksList.appendChild(li);
    setTaskToLocalStorage(input.value);
    input.value = '';
  }
}

function removeTask(e) {
  if (e.target.hasAttribute('del')) {
    const p1 = e.target.parentElement;
    p1.parentElement.remove();
    removeFromLS(p1.firstElementChild.textContent);
  }
}

function clearAllTask() {
  while (tasksList.firstChild) {
    tasksList.removeChild(tasksList.firstChild);
  }
  localStorage.setItem('tasks', JSON.stringify([]));
}

function filterTask(e) {
  let text = e.target.value.toLowerCase();
  document.querySelectorAll('.task-box').forEach(task => {
    let item = task.firstElementChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'flex';
      task.parentElement.style.display = 'block';
    } else {
      task.parentElement.style.display = 'none';
    }
  });
}

function setTaskToLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.setAttribute('class', 'task');
    li.innerHTML = `<div class="task-box">
              <p>${task}</p>
              <button del>X</button>
            </div>`;
    tasksList.appendChild(li);
  });
}

function removeFromLS(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach((task, index) => {
    if (task === taskItem) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}



/*
Author: Dabananda Mitra
Project title: Task List
Project type: Demo Porject
Technologies: HTML, CSS, JavaScript
Contact: dmitraofficial@gmail.com
*/