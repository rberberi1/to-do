import React from 'react';

function ToDo({ task, onDelete, onEdit }) {
  return (
    <li className="todo-item">
      <div>
        <h3>{task.title}</h3> <br/>
        <h5>{task.description}</h5>
        <input type="checkbox" name="checkbox" value=""/>
      </div>
      <div>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </li>
  );
}

export default ToDo;
