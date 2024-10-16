import React from 'react';
import ToDo from './ToDo';

function ToDoList({ tasks, onDelete, onEdit, onCheckboxChange }) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <ToDo
          key={task.id}
          task={task}
          onDelete={() => onDelete(task.id)}
          onEdit={() => onEdit(task.id)}
          onCheckboxChange={onCheckboxChange}
        />
      ))}
    </ul>
  );
}

export default ToDoList;
