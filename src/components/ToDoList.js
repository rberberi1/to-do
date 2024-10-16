import React from 'react';
import ToDo from './ToDo';

function ToDoList({ tasks, onDelete, onEdit }) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <ToDo
          key={task.id}
          task={task}
          onDelete={() => onDelete(task.id)}
          onEdit={() => onEdit(task.id)}
        />
      ))}
    </ul>
  );
}

export default ToDoList;
