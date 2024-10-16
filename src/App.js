import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ToDoList from './components/ToDoList';
import ToDoForm from './components/ToDoForm';

const API_URL = 'http://localhost:8080/todos'; 

function App() {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(API_URL);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (task) => {
    try {
      const response = await axios.post(API_URL, task);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditTask = (index) => {
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };

  const handleDeleteTask = async (index) => {
    const taskId = tasks[index].id;
    try {
      await axios.delete(`${API_URL}/${taskId}`);
      setTasks(tasks.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    const taskId = tasks[currentTaskIndex].id; 
    try {
      const response = await axios.patch(`${API_URL}/${taskId}`, updatedTask);
      const updatedTasks = [...tasks];
      updatedTasks[currentTaskIndex] = response.data;
      setTasks(updatedTasks);
      setIsEditing(false);
      setCurrentTaskIndex(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentTaskIndex(null);
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <ToDoForm
        currentTask={isEditing ? tasks[currentTaskIndex] : null}
        onSubmit={isEditing ? handleUpdateTask : handleAddTask}
        onCancel={handleCancelEdit}
      />

      <ToDoList
        tasks={tasks}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />
    </div>
  );
}

export default App;
