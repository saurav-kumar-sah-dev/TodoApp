const API_URL = '/api/tasks';

document.addEventListener('DOMContentLoaded', () => {
  fetchTasks();

  document.getElementById('task-form').addEventListener('submit', async e => {
    e.preventDefault();

    const input = document.getElementById('task-input');
    const dueInput = document.getElementById('due-date');
    const title = input.value.trim();
    const dueDate = dueInput.value || null;

    if (title) {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, dueDate })
      });
      input.value = '';
      dueInput.value = '';
      fetchTasks();
    }
  });
});

async function fetchTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();
  const list = document.getElementById('task-list');
  list.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div style="flex: 1;">
        <span class="${task.completed ? 'completed' : ''}">
          ${task.title}
        </span><br/>
        <small style="color: #666;">
          ${task.dueDate ? 'Due: ' + new Date(task.dueDate).toLocaleDateString() : ''}
        </small>
      </div>
      <div>
        <button class="action-btn check" onclick="toggleComplete('${task._id}', ${task.completed})">✅</button>
        <button class="action-btn delete" onclick="deleteTask('${task._id}')">🗑️</button>
      </div>
    `;
    list.appendChild(li);
  });
}

async function toggleComplete(id, completed) {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: !completed })
  });
  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchTasks();
}
