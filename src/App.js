import React, { useState, useEffect, useMemo } from 'react';
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
  }, []);


  const handleAddTask = async (task) => {
    try {
      const response = await axios.post(API_URL, {
        title:task.title,
        description:task.description
      });

      setTasks((prevTasks) => [...prevTasks, response.data]);

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
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
     
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdateTask = async (task) => { 
    try {
      await axios.patch(`${API_URL}/${currentTaskId}`, {
        title: task.title,
        description: task.description,
      });
      
      setTasks((prevTasks) => prevTasks.map((t) =>
        t.id === currentTaskId ? { ...t, title: task.title, description: task.description } : t
      ));
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

  const handleCheckboxChange = (id, isChecked) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: isChecked } : task
      )
    );
  };

  const completedTasksCount = useMemo(() => {
    return tasks.filter((task) => task.completed).length;
  }, [tasks]);

  const incompleteTasksCount = useMemo(() => {
    return tasks.filter((task) => !task.completed).length;
  }, [tasks]);


  return (
    <div className="app">
      <h1>To-Do List</h1>
      <p>Completed Tasks: {completedTasksCount}</p>
      <p>Incomplete Tasks: {incompleteTasksCount}</p>
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
        onCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
}

export default App;
