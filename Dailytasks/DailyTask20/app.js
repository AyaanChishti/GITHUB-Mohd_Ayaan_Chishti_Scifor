// Task List App Logic
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

function createTaskElement(taskText) {
  const li = document.createElement('li');
  li.className = 'flex items-center justify-between bg-gray-50 px-4 py-2 rounded shadow';

  const span = document.createElement('span');
  span.textContent = taskText;
  span.className = 'flex-1 cursor-pointer';

  // Mark as complete toggle
  span.addEventListener('click', () => {
    span.classList.toggle('line-through');
    span.classList.toggle('text-gray-400');
  });

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600';
  deleteBtn.addEventListener('click', () => {
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  return li;
}

addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const taskEl = createTaskElement(taskText);
    taskList.appendChild(taskEl);
    taskInput.value = '';
    taskInput.focus();
  }
});

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTaskBtn.click();
  }
}); 