import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:8080/todos';

const EditTask = () => {
  const { id } = useParams(); 
  const [task, setTask] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const editTask = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };
    editTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${API_URL}/${id}`, task);
      navigate('/'); 
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };


  return (
    <div>
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={task.title}
          onChange={(e)=>setTask({...task, 'title':e.target.value})}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={task.description}
          onChange={(e)=>setTask({...task, 'description':e.target.value})}
        />
        <button className='add-btn' type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;
