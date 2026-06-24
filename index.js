// ── State ──────────────────────────────────────────────────────────────────
let tasks = [];
let nextId = 1;

// ── DOM References ─────────────────────────────────────────────────────────
const taskInput    = document.getElementById('taskInput');
const addBtn       = document.getElementById('addBtn');
const taskList     = document.getElementById('taskList');
const totalCount   = document.getElementById('totalCount');
const doneCount    = document.getElementById('doneCount');
const pendingCount = document.getElementById('pendingCount');
const footerText   = document.getElementById('footerText');
const clearBtn     = document.getElementById('clearBtn');

// ── Add Task ───────────────────────────────────────────────────────────────
function addTask() {
  const name = taskInput.value.trim();

  if (!name) {
    taskInput.focus();
    taskInput.style.borderColor = '#fc8181';
    setTimeout(() => { taskInput.style.borderColor = ''; }, 800);
    return;
  }

  tasks.push({ id: nextId++, name, completed: false });
  taskInput.value = '';
  taskInput.focus();
  render();
}

// ── Complete Task ──────────────────────────────────────────────────────────
function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (task) task.completed = !task.completed;
  render();
}

// ── Delete Task ────────────────────────────────────────────────────────────
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  render();
}

// ── Clear Completed ────────────────────────────────────────────────────────
function clearCompleted() {
  tasks = tasks.filter(t => !t.completed);
  render();
}

// ── Helper: Escape HTML ────────────────────────────────────────────────────
function escapeHtml(text) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

// ── Render ─────────────────────────────────────────────────────────────────
function render() {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    taskList.innerHTML = `
      <li class="empty-state">
        <span class="icon">📋</span>
        <p>No tasks yet. Add one above!</p>
      </li>`;
  } else {
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = 'task-item' + (task.completed ? ' completed' : '');
      li.dataset.id = task.id;

      li.innerHTML = `
        <button class="complete-btn" title="${task.completed ? 'Mark as incomplete' : 'Mark as complete'}">
          <svg viewBox="0 0 12 10">
            <polyline points="1,5 4,9 11,1" />
          </svg>
        </button>

        <span class="task-name">${escapeHtml(task.name)}</span>

        <button class="delete-btn" title="Delete task">
          <svg viewBox="0 0 16 16">
            <polyline points="3,4 4,14 12,14 13,4" />
            <line x1="2" y1="4" x2="14" y2="4" />
            <polyline points="6,4 6,2 10,2 10,4" />
          </svg>
        </button>
      `;

      li.querySelector('.complete-btn').addEventListener('click', () => toggleComplete(task.id));
      li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.id));

      taskList.appendChild(li);
    });
  }

  // Update stats
  const total   = tasks.length;
  const done    = tasks.filter(t => t.completed).length;
  const pending = total - done;

  totalCount.textContent   = total;
  doneCount.textContent    = done;
  pendingCount.textContent = pending;

  // Update footer
  if (total === 0) {
    footerText.textContent = 'No tasks yet';
  } else if (done === total) {
    footerText.textContent = '🎉 All tasks complete!';
  } else {
    footerText.textContent = `${pending} task${pending !== 1 ? 's' : ''} remaining`;
  }

  clearBtn.style.display = done > 0 ? 'inline-block' : 'none';
}

// ── Event Listeners ────────────────────────────────────────────────────────
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

clearBtn.addEventListener('click', clearCompleted);

// ── Init ───────────────────────────────────────────────────────────────────
render();