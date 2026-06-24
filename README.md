# Task Manager

A simple, clean task manager built with vanilla HTML, CSS, and JavaScript. No frameworks, no dependencies.

## Features

- **Add tasks** — type and press Enter or click the Add button
- **Complete tasks** — click the circle checkbox to toggle done/undone (strikethrough effect)
- **Delete tasks** — click the trash icon to remove a task
- **Clear completed** — bulk-remove all done tasks in one click
- **Live stats** — total, done, and pending counts update in real time

## How to Run

Just open `index.html` in any browser — no build step, no server needed.

```
git clone <your-repo-url>
cd task-manager
open index.html   # macOS
start index.html  # Windows
```

## Project Structure

```
task-manager/
├── index.html   # HTML structure
├── index.css    # All styles
├── index.js     # All JavaScript logic
└── README.md
```

## Tech Used

| Layer      | File        | What it does                                      |
|------------|-------------|---------------------------------------------------|
| HTML       | index.html  | Semantic structure — input, button, ul, li        |
| CSS        | index.css   | Flexbox layout, transitions, strikethrough effect |
| JavaScript | index.js    | DOM manipulation, event handling, task state      |

## Concepts Demonstrated

- **DOM Manipulation** — `createElement`, `innerHTML`, `querySelector`
- **Event Handling** — `click` and `keydown` (Enter key) listeners
- **Array Operations** — `push`, `filter`, `find` for task state management
- **XSS Prevention** — user input escaped via `createTextNode` before rendering

## Author

Abhi — BTech CSE