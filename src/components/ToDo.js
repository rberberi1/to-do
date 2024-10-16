import React from 'react';
import axios from 'axios';

function ToDo({ task, onDelete, onEdit, onCheckboxChange }) {

  const handleCheckboxChange = async(e) =>{
    const isChecked=e.target.checked;

    try{
      await axios.patch(`http://localhost:8080/todos/${task.id}`,{
        completed:isChecked,
    });
    console.log(`Task ${task.id} updated with comleted status ${isChecked}`)
    onCheckboxChange(task.id, isChecked)
  }catch(error){
    console.error('error updating task:', error)
  }
};


  return (
    <li className="todo-item">
      <div>
        <h3>{task.title}</h3> <br/>
        <h5>{task.description}</h5>
        <input type="checkbox" 
        name="checkbox" 
        checked={task.completed}
        onChange={handleCheckboxChange}/>
      </div>
      <div>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </li>
  );
}

export default ToDo;
