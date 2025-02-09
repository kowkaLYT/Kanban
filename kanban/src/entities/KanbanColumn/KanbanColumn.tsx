import React from "react";
import { GripVertical, PlusCircle } from "lucide-react";
import { Column, Task } from "../../shared/types/types";
import KanbanTask from "../KanbanTask/KanbanTask";
import AddKanbanTask from "../../features/AddKanbanTask/AddKanbanTask";
import "./KanbanColumn.css";

interface KanbanColumnProps {
  column: Column;
  showNewTaskInput: string | null;
  newTaskContent: string;
  setNewTaskContent: (content: string) => void;
  setShowNewTaskInput: (columnId: string | null) => void;
  addNewTask: (columnId: string) => void;
  onDragStart: (
    e: React.DragEvent,
    item: any,
    type: string,
    columnId?: string
  ) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, columnId: string, task?: Task) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  showNewTaskInput,
  newTaskContent,
  setNewTaskContent,
  setShowNewTaskInput,
  addNewTask,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  return (
    <div
      className={`kanban__column ${
        column.tasks.length === 0
          ? "kanban__column-empty"
          : "kanban__column-filled"
      }`}
      draggable
      onDragStart={(e) => onDragStart(e, column, "column")}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column.id)}
    >
      <div className='column__header'>
        <div className='column__title'>
          <GripVertical className='move__icon' />
          <h3>{column.title}</h3>
        </div>
        <button
          onClick={() => setShowNewTaskInput(column.id)}
          className='add__task-button'
          type='button'
        >
          <PlusCircle />
        </button>
      </div>

      {showNewTaskInput === column.id && (
        <AddKanbanTask
          columnId={column.id}
          newTaskContent={newTaskContent}
          setNewTaskContent={setNewTaskContent}
          addNewTask={addNewTask}
          onClose={() => {
            setShowNewTaskInput(null);
            setNewTaskContent("");
          }}
        />
      )}

      <div
        className='task__list'
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, column.id)}
      >
        {column.tasks.map((task) => (
          <KanbanTask
            key={task.id}
            task={task}
            columnId={column.id}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
