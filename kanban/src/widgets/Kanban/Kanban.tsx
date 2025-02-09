import React, { useState } from "react";
import { Column, Task, DraggedItem } from "../../shared/types/types";
import KanbanColumn from "../../entities/KanbanColumn/KanbanColumn";
import AddKanbanColumn from "../../features/AddKanbanColumn/AddKanbanColumn";

const Kanban: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([
    { id: "1", title: "ToDo", tasks: [] },
    { id: "2", title: "In progress", tasks: [] },
    { id: "3", title: "Done", tasks: [] },
  ]);

  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);
  const [draggedColumn, setDraggedColumn] = useState<Column | null>(null);
  const [dragType, setDragType] = useState<string | null>(null);
  const [newTaskContent, setNewTaskContent] = useState("");
  const [showNewTaskInput, setShowNewTaskInput] = useState<string | null>(null);

  const addNewColumn = (title: string) => {
    const newColumn: Column = {
      id: String(Date.now()),
      title: title,
      tasks: [],
    };
    setColumns([...columns, newColumn]);
  };

  const addNewTask = (columnId: string) => {
    if (!newTaskContent.trim()) return;

    const newTask: Task = {
      id: String(Date.now()),
      content: newTaskContent.trim(),
    };

    setColumns(
      columns.map((col) => {
        if (col.id === columnId) {
          return {
            ...col,
            tasks: [...col.tasks, newTask],
          };
        }
        return col;
      })
    );

    setNewTaskContent("");
    setShowNewTaskInput(null);
  };

  const handleDragStart = (
    e: React.DragEvent,
    item: any,
    type: string,
    columnId?: string
  ) => {
    if (type === "task") {
      e.stopPropagation();
      setDraggedItem({ ...item, columnId });
    } else {
      setDraggedColumn(item);
    }
    setDragType(type);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent,
    targetColumnId: string,
    targetTask?: Task
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (dragType === "task") {
      if (!draggedItem) return;

      const newColumns = columns.map((col) => {
        if (col.id === draggedItem.columnId) {
          return {
            ...col,
            tasks: col.tasks.filter((task) => task.id !== draggedItem.id),
          };
        }
        if (col.id === targetColumnId) {
          const newTasks = [...col.tasks];
          if (targetTask) {
            const targetIndex = newTasks.findIndex(
              (task) => task.id === targetTask.id
            );
            newTasks.splice(targetIndex, 0, draggedItem);
          } else {
            newTasks.push(draggedItem);
          }
          return {
            ...col,
            tasks: newTasks,
          };
        }
        return col;
      });

      setColumns(newColumns);
    } else if (dragType === "column" && draggedColumn) {
      const fromIndex = columns.findIndex((col) => col.id === draggedColumn.id);
      const toIndex = columns.findIndex((col) => col.id === targetColumnId);

      const newColumns = [...columns];
      const [removed] = newColumns.splice(fromIndex, 1);
      newColumns.splice(toIndex, 0, removed);

      setColumns(newColumns);
    }

    setDraggedItem(null);
    setDraggedColumn(null);
    setDragType(null);
  };

  return (
    <div className='kanban__container'>
      <div className='kanban__board'>
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            showNewTaskInput={showNewTaskInput}
            newTaskContent={newTaskContent}
            setNewTaskContent={setNewTaskContent}
            setShowNewTaskInput={setShowNewTaskInput}
            addNewTask={addNewTask}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        ))}
        <AddKanbanColumn onAddColumn={addNewColumn} />
      </div>
    </div>
  );
};

export default Kanban;
