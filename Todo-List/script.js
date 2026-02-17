/*
  Todo List - Single File JavaScript Version
  -----------------------------------------
  This file includes EVERYTHING for the app:
  - Data factories (todo/project objects)
  - App state and logic
  - localStorage persistence
  - DOM rendering
  - Event handling

  The goal is to stay simple and match Odin requirements while keeping code readable.
*/

// ---------- Constants ----------

// Allowed priority values for all todos.
const PRIORITIES = ["low", "medium", "high"];

// Key used in localStorage.
const STORAGE_KEY = "odin-simple-todos";

// ---------- Small Utility Functions ----------

// Create a lightweight unique id.
// We avoid external libraries to keep the project beginner-friendly.
function createId(prefix) {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
}

// Protect template HTML from user input that might break markup.
function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// Format a yyyy-mm-dd date for display in the card list.
function formatDate(value) {
  if (!value) return "No due date";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "No due date";

  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

// ---------- Factories (Odin requirement: object creation with factory/constructor/class) ----------

// Factory for creating todo objects with a stable shape.
function createTodo(data = {}) {
  return {
    id: data.id || createId("todo"),
    title: (data.title || "").toString().trim() || "Untitled task",
    description: (data.description || "").toString(),
    dueDate: (data.dueDate || "").toString(),
    priority: PRIORITIES.includes(data.priority) ? data.priority : "medium",
    notes: (data.notes || "").toString(),
    completed: Boolean(data.completed),
  };
}

// Factory for creating project objects.
function createProject(data = {}) {
  return {
    id: data.id || createId("project"),
    name: (data.name || "").toString().trim() || "Untitled project",
    // Ensure every todo inside a loaded project also has the correct shape.
    todos: Array.isArray(data.todos)
      ? data.todos.map((todo) => createTodo(todo))
      : [],
  };
}

// ---------- Persistence (localStorage) ----------

// Save all projects and todos every time state changes.
function saveToStorage(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

// Load data from localStorage and rebuild it as project/todo objects.
// If data is missing or invalid, return null so the app can fall back safely.
function loadFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed.map((project) => createProject(project));
  } catch (error) {
    console.warn(
      "Storage data is invalid. Starting with default project.",
      error,
    );
    return null;
  }
}

// ---------- App State ----------

/*
  The full app state lives here.
  - projects: all project lists
  - currentProjectId: selected project shown in UI
  - expandedTodoId: which todo is expanded for editing
*/
const state = {
  projects: [],
  currentProjectId: null,
  expandedTodoId: null,
};

// ---------- State Selectors ----------

function getCurrentProject() {
  return (
    state.projects.find((project) => project.id === state.currentProjectId) ||
    state.projects[0] ||
    null
  );
}

// ---------- State Mutations ----------

function selectProject(projectId) {
  const exists = state.projects.some((project) => project.id === projectId);
  if (!exists) return;

  state.currentProjectId = projectId;
  state.expandedTodoId = null;
}

function addProject(name) {
  const project = createProject({ name });
  state.projects.push(project);
  state.currentProjectId = project.id;
  state.expandedTodoId = null;
}

function addTodo(data) {
  const project = getCurrentProject();
  if (!project) return;

  project.todos.push(createTodo(data));
}

function updateTodo(todoId, changes) {
  const project = getCurrentProject();
  if (!project) return;

  const index = project.todos.findIndex((todo) => todo.id === todoId);
  if (index === -1) return;

  project.todos[index] = createTodo({
    ...project.todos[index],
    ...changes,
    id: project.todos[index].id,
  });
}

function toggleTodoComplete(todoId) {
  const project = getCurrentProject();
  if (!project) return;

  const todo = project.todos.find((item) => item.id === todoId);
  if (!todo) return;

  todo.completed = !todo.completed;
}

function deleteTodo(todoId) {
  const project = getCurrentProject();
  if (!project) return;

  project.todos = project.todos.filter((todo) => todo.id !== todoId);
  if (state.expandedTodoId === todoId) state.expandedTodoId = null;
}

// ---------- Rendering ----------

function render() {
  const app = document.querySelector("#app");
  if (!app) return;

  const currentProject = getCurrentProject();

  app.innerHTML = `
    <div class="layout">
      <aside class="sidebar">
        <h2>Projects</h2>

        <ul class="project-list">
          ${state.projects
            .map(
              (project) => `
                <li>
                  <button
                    class="project-btn ${project.id === currentProject?.id ? "active" : ""}"
                    data-project-id="${project.id}"
                  >
                    <span>${escapeHtml(project.name)}</span>
                    <small>${project.todos.length}</small>
                  </button>
                </li>
              `,
            )
            .join("")}
        </ul>

        <form id="new-project-form" class="stack">
          <label for="project-name">New project</label>
          <input id="project-name" name="projectName" type="text" minlength="2" required placeholder="Project name" />
          <button type="submit">Add project</button>
        </form>
      </aside>

      <main class="main">
        <header class="main-header">
          <h1>${escapeHtml(currentProject?.name || "Project")}</h1>
        </header>

        <form id="new-todo-form" class="todo-form grid">
          <input name="title" type="text" required placeholder="Todo title" />
          <input name="dueDate" type="date" />

          <select name="priority">
            ${PRIORITIES.map((priority) => `<option value="${priority}">${priority}</option>`).join("")}
          </select>

          <textarea name="description" rows="2" placeholder="Description"></textarea>
          <textarea name="notes" rows="2" placeholder="Notes"></textarea>

          <button type="submit">Add todo</button>
        </form>

        <section class="todo-list">
          ${(currentProject?.todos || [])
            .map((todo) => {
              const expanded = todo.id === state.expandedTodoId;

              return `
                <article class="todo-card priority-${todo.priority} ${todo.completed ? "completed" : ""}" data-todo-id="${todo.id}">
                  <div class="todo-summary">
                    <div>
                      <h3>${escapeHtml(todo.title)}</h3>
                      <p>${formatDate(todo.dueDate)}</p>
                    </div>

                    <div class="row-actions">
                      <button data-action="toggle-complete">${todo.completed ? "Undo" : "Complete"}</button>
                      <button data-action="toggle-details">${expanded ? "Hide" : "Details"}</button>
                      <button data-action="delete" class="danger">Delete</button>
                    </div>
                  </div>

                  ${
                    expanded
                      ? `
                    <form class="todo-details stack" data-form="edit-todo">
                      <input name="title" value="${escapeHtml(todo.title)}" required />
                      <input name="dueDate" type="date" value="${todo.dueDate || ""}" />

                      <select name="priority">
                        ${PRIORITIES.map(
                          (priority) =>
                            `<option value="${priority}" ${priority === todo.priority ? "selected" : ""}>${priority}</option>`,
                        ).join("")}
                      </select>

                      <textarea name="description" rows="2">${escapeHtml(todo.description)}</textarea>
                      <textarea name="notes" rows="2">${escapeHtml(todo.notes)}</textarea>

                      <button type="submit">Save changes</button>
                    </form>
                  `
                      : ""
                  }
                </article>
              `;
            })
            .join("")}
        </section>
      </main>
    </div>
  `;

  bindEvents();
}

// ---------- Event Binding ----------

/*
  Because the DOM is fully re-rendered after each state change,
  we re-attach listeners every render.
*/
function bindEvents() {
  // Switch active project.
  document.querySelectorAll(".project-btn").forEach((button) => {
    button.addEventListener("click", () => {
      selectProject(button.dataset.projectId);
      saveToStorage(state.projects);
      render();
    });
  });

  // Create new project.
  document
    .querySelector("#new-project-form")
    ?.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const projectName = formData.get("projectName")?.toString().trim();
      if (!projectName) return;

      addProject(projectName);
      saveToStorage(state.projects);
      event.currentTarget.reset();
      render();
    });

  // Create new todo in selected project.
  document
    .querySelector("#new-todo-form")
    ?.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const title = formData.get("title")?.toString().trim();
      if (!title) return;

      addTodo({
        title,
        description: formData.get("description")?.toString() || "",
        dueDate: formData.get("dueDate")?.toString() || "",
        priority: formData.get("priority")?.toString() || "medium",
        notes: formData.get("notes")?.toString() || "",
      });

      saveToStorage(state.projects);
      event.currentTarget.reset();
      render();
    });

  // Card actions (complete, details, delete) and edit form submit.
  document.querySelectorAll(".todo-card").forEach((card) => {
    const todoId = card.dataset.todoId;

    card.addEventListener("click", (event) => {
      const actionButton = event.target.closest("button[data-action]");
      if (!actionButton) return;

      const action = actionButton.dataset.action;

      if (action === "toggle-complete") {
        toggleTodoComplete(todoId);
        saveToStorage(state.projects);
        render();
        return;
      }

      if (action === "toggle-details") {
        state.expandedTodoId = state.expandedTodoId === todoId ? null : todoId;
        render();
        return;
      }

      if (action === "delete") {
        deleteTodo(todoId);
        saveToStorage(state.projects);
        render();
      }
    });

    card
      .querySelector('form[data-form="edit-todo"]')
      ?.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        updateTodo(todoId, {
          title: formData.get("title")?.toString() || "",
          description: formData.get("description")?.toString() || "",
          dueDate: formData.get("dueDate")?.toString() || "",
          priority: formData.get("priority")?.toString() || "medium",
          notes: formData.get("notes")?.toString() || "",
        });

        saveToStorage(state.projects);
        render();
      });
  });
}

// ---------- App Bootstrap ----------

function init() {
  // Try loading saved data first.
  const savedProjects = loadFromStorage();

  // Fallback to default project when no storage exists.
  state.projects =
    savedProjects && savedProjects.length
      ? savedProjects
      : [createProject({ name: "Default" })];

  // Always start with a valid selected project.
  state.currentProjectId = state.projects[0].id;
  state.expandedTodoId = null;

  // Persist once so storage is initialized, then render.
  saveToStorage(state.projects);
  render();
}

init();
