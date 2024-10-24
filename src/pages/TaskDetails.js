
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:8080/todos';

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [id]);

  if (!task) {
    return <p>Loading...</p>;
  }

  return (
    <div className='task-detail'>
      <h2>Task Detail</h2>
      <h3>Title: {task.title}</h3>
      <p>Description: {task.description}</p>
      <p>Status: {task.completed ? 'Completed' : 'Uncompleted'}</p>
      <button id="back-btn" onClick={() => navigate('/')}>Back to Task List</button>
    </div>
  );
};

export default TaskDetail;
