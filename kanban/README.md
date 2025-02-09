# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

// import { useState } from "react";
// import { PlusCircle, GripVertical } from "lucide-react";
// import "./App.css";
// import "../shared/types/types";

// const KanbanBoard = () => {
// const [columns, setColumns] = useState([
// { id: "1", title: "ToDo", tasks: [] },
// { id: "2", title: "In progress", tasks: [] },
// { id: "3", title: "Done", tasks: [] },
// ]);

// const [draggedItem, setDraggedItem] = useState(null);
// const [draggedColumn, setDraggedColumn] = useState(null);
// const [dragType, setDragType] = useState(null);
// const [newTaskContent, setNewTaskContent] = useState("");
// const [showNewTaskInput, setShowNewTaskInput] = useState(null);

// const addNewColumn = () => {
// const newColumn = {
// id: String(Date.now()),
// title: "New Column",
// tasks: [],
// };
// setColumns([...columns, newColumn]);
// };

// const addNewTask = (columnId) => {
// if (!newTaskContent.trim()) return;

// const newTask = {
// id: String(Date.now()),
// content: newTaskContent.trim(),
// };

// setColumns(
// columns.map((col) => {
// if (col.id === columnId) {
// return {
// ...col,
// tasks: [...col.tasks, newTask],
// };
// }
// return col;
// })
// );

// setNewTaskContent("");
// setShowNewTaskInput(null);
// };

// const handleDragStart = (e, item, type, columnId = null) => {
// if (type === "task") {
// e.stopPropagation();
// setDraggedItem({ ...item, columnId });
// } else {
// setDraggedColumn(item);
// }
// setDragType(type);
// };

// const handleDragOver = (e) => {
// e.preventDefault();
// };

// const handleDrop = (e, targetColumnId, targetTask = null) => {
// e.preventDefault();
// e.stopPropagation();

// if (dragType === "task") {
// if (!draggedItem) return;

// const newColumns = columns.map((col) => {
// if (col.id === draggedItem.columnId) {
// return {
// ...col,
// tasks: col.tasks.filter((task) => task.id !== draggedItem.id),
// };
// }
// if (col.id === targetColumnId) {
// const newTasks = [...col.tasks];
// if (targetTask) {
// const targetIndex = newTasks.findIndex(
// (task) => task.id === targetTask.id
// );
// newTasks.splice(targetIndex, 0, draggedItem);
// } else {
// newTasks.push(draggedItem);
// }
// return {
// ...col,
// tasks: newTasks,
// };
// }
// return col;
// });

// setColumns(newColumns);
// } else if (dragType === "column" && draggedColumn) {
// const fromIndex = columns.findIndex((col) => col.id === draggedColumn.id);
// const toIndex = columns.findIndex((col) => col.id === targetColumnId);

// const newColumns = [...columns];
// const [removed] = newColumns.splice(fromIndex, 1);
// newColumns.splice(toIndex, 0, removed);

// setColumns(newColumns);
// }

// setDraggedItem(null);
// setDraggedColumn(null);
// setDragType(null);
// };

// return (
// <div className='kanban__container'>
// <div className='kanban__board'>
// {columns.map((column) => (
// <div
// key={column.id}
// className={`kanban__column ${
//               column.tasks.length === 0
//                 ? "kanban__column-empty"
//                 : "kanban__column-filled"
//             }`}
// draggable
// onDragStart={(e) => handleDragStart(e, column, "column")}
// onDragOver={handleDragOver}
// onDrop={(e) => handleDrop(e, column.id)}
// >
// <div className='column__header'>
// <div className='column__title'>
// <GripVertical className='move__icon' />
// <h3>{column.title}</h3>
// </div>
// <button
// onClick={() => setShowNewTaskInput(column.id)}
// className='add\_\_task-button'
// type='button'
// >
// <PlusCircle />
// </button>
// </div>

// {showNewTaskInput === column.id && (
// <div className='task__form'>
// <input
// type='text'
// value={newTaskContent}
// onChange={(e) => setNewTaskContent(e.target.value)}
// placeholder='Task name'
// className='task-input'
// onKeyDown={(e) => {
// if (e.key === "Enter") {
// addNewTask(column.id);
// }
// }}
// />
// <div className='form-buttons'>
// <button
// onClick={() => addNewTask(column.id)}
// className='btn btn-add'
// type='button'
// >
// Add
// </button>
// <button
// onClick={() => {
// setShowNewTaskInput(null);
// setNewTaskContent("");
// }}
// className='btn btn-back'
// type='button'
// >
// Back
// </button>
// </div>
// </div>
// )}

// <div
// className='task-list'
// onDragOver={handleDragOver}
// onDrop={(e) => handleDrop(e, column.id)}
// >
// {column.tasks.map((task) => (
// <div
// key={task.id}
// className='task-item'
// draggable
// onDragStart={(e) =>
// handleDragStart(e, task, "task", column.id)
// }
// onDragOver={handleDragOver}
// onDrop={(e) => handleDrop(e, column.id, task)}
// >
// {task.content}
// </div>
// ))}
// </div>
// </div>
// ))}

// <button
// onClick={addNewColumn}
// className='add**column-button'
// type='button'
// >
// <div className='add**column-box'>
// <PlusCircle size={20} />
// <span>Add Column</span>
// </div>
// </button>
// </div>
// </div>
// );
// };

// export default KanbanBoard;
