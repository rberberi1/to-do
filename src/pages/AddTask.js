import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:8080/todos';

const AddTask = () => {
  const [task, setTask] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, task);
      navigate('/'); 
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

 
  return (
    <div className='add-task'>
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={task.title}
          onChange={(e)=> setTask({...task, 'title':e.target.value})}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={task.description}
          onChange={(e)=> setTask({...task, 'description':e.target.value})}
          
        />
        <button className="add-btn"type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
