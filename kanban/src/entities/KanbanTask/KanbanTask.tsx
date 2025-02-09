import React from "react";
import { Task } from "../../shared/types/types";
import "./KanbanTask.css";
interface KanbanTaskProps {
  task: Task;
  columnId: string;
  onDragStart: (
    e: React.DragEvent,
    task: Task,
    type: string,
    columnId: string
  ) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, columnId: string, task: Task) => void;
}

const KanbanTask: React.FC<KanbanTaskProps> = ({
  task,
  columnId,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  return (
    <div
      className='task'
      draggable
      onDragStart={(e) => onDragStart(e, task, "task", columnId)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, columnId, task)}
    >
      {task.content}
    </div>
  );
};

export default KanbanTask;
