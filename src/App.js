import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ToDoList from './components/ToDoList';
import ToDoForm from './components/ToDoForm';

const API_URL = 'http://localhost:8080/todos'; 

function App() {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  
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
  }, [tasks]);


  const handleAddTask = async (task) => {
    try {
      const response = await axios.post(API_URL, {
        title:task.title,
        description:task.description
      });

      setTasks([...tasks, response.data]);

    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  ///////LOOKKKK THESE !!!!/////////////////////////7

  const handleEditTask = (id) => {
    setIsEditing(true);
    setCurrentTaskId(id);
    console.log(`button with id ${id} clicked`)
  };

  const handleDeleteTask = async (id) => {
    
    try {
      await axios.delete(`${API_URL}/${id}`);
     
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdateTask = async (id) => { 
    const updatedTask = tasks.find((task) => task.id === id);
    try {
      await axios.patch(`${API_URL}/${id}`,{
        title: updatedTask.title,
        description: updatedTask.description,
      });
      setIsEditing(false);
      setCurrentTaskId(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentTaskId(null);
    
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <ToDoForm
      tasks={tasks}
        currentTaskId={currentTaskId}
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
