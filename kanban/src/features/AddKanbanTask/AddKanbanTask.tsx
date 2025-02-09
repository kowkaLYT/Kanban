import React from "react";
import "./AddKanbanTask.css";
interface AddKanbanTaskProps {
  columnId: string;
  newTaskContent: string;
  setNewTaskContent: (content: string) => void;
  addNewTask: (columnId: string) => void;
  onClose: () => void;
}

const AddKanbanTask: React.FC<AddKanbanTaskProps> = ({
  columnId,
  newTaskContent,
  setNewTaskContent,
  addNewTask,
  onClose,
}) => {
  return (
    <div className='task__form'>
      <input
        type='text'
        value={newTaskContent}
        onChange={(e) => setNewTaskContent(e.target.value)}
        placeholder='Task name'
        className='task-input'
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addNewTask(columnId);
          }
        }}
      />
      <div className='form-buttons'>
        <button
          onClick={() => addNewTask(columnId)}
          className='btn btn-add'
          type='button'
        >
          Add
        </button>
        <button onClick={onClose} className='btn btn-back' type='button'>
          Back
        </button>
      </div>
    </div>
  );
};

export default AddKanbanTask;
