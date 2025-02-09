import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import "./AddKanbanColumn.css";
interface AddKanbanColumnProps {
  onAddColumn: (title: string) => void;
}

const AddKanbanColumn: React.FC<AddKanbanColumnProps> = ({ onAddColumn }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");

  const handleSubmit = () => {
    if (columnTitle.trim()) {
      onAddColumn(columnTitle.trim());
      setColumnTitle("");
      setIsAdding(false);
    }
  };

  if (isAdding) {
    return (
      <div className='add__column-form'>
        <input
          type='text'
          value={columnTitle}
          onChange={(e) => setColumnTitle(e.target.value)}
          placeholder='Enter column name'
          className='column__name-input'
          autoFocus
        />
        <div className='form-buttons'>
          <button onClick={handleSubmit} className='btn btn-add' type='button'>
            Add
          </button>
          <button
            onClick={() => {
              setIsAdding(false);
              setColumnTitle("");
            }}
            className='btn btn-back'
            type='button'
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsAdding(true)}
      className='add__column-button'
      type='button'
    >
      <div className='add__column-box'>
        <PlusCircle />
        <span>Add Column</span>
      </div>
    </button>
  );
};

export default AddKanbanColumn;
