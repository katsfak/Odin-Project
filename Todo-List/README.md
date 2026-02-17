# Todo List (Single-File JavaScript)

This version is intentionally simple and matches your requested structure:

- one HTML file: `index.html`
- one CSS file: `style.css`
- one JavaScript file: `script.js`
- one README: `README.md`

## Odin Requirements Covered

- Todos are dynamic objects created by factory functions
- Todo properties include title, description, dueDate, priority, and notes
- Projects are supported, including a default project on first load
- Users can create projects and add todos to the selected project
- UI supports:
  - viewing all projects
  - viewing todos in each project
  - expanding one todo to edit details
  - deleting a todo
- Data persists with `localStorage` and safely handles empty/missing/corrupt data

## Notes

- `script.js` is heavily commented from top to bottom for learning.
- No build tools are required; open `index.html` directly in a browser.
