import React from "react";
import { Link } from "react-router-dom";

const ToDo = (({ task, onDelete, onEdit, onCheckboxChange }) => {
  
  const handleCheckboxChange = () => {
    onCheckboxChange(task.id, task.completed);
  };

  return (
    <li className="todo-item">
      <div>
        <h3><Link to={`/task/${task.id}`}>
            {task.title}
          </Link></h3> <br/>
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