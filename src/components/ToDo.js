import React from "react";

const ToDo = (({ task, onDelete, onEdit, onCheckboxChange }) => {
  console.log('im rerendering')
  
  const handleCheckboxChange = () => {
    onCheckboxChange(task.id, task.completed);
  };

  return (
    <li className="todo-item">
      <div>
        <h3>{task.title}</h3> <br/>
        <h5>{task.description}</h5>
        <input 
          type="checkbox" 
          name="checkbox" 
          checked={task.completed}
          onChange={handleCheckboxChange}
        />
      </div>
      <div>
        <button onClick={() => onEdit(task.id)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </li>
  );
});

export default ToDo;