import React, { useState } from 'react';
import ToDoList from './components/ToDoList';
import ToDoForm from './components/ToDoForm';

function App  ()  {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  const handleEditTask = (index) => {
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleUpdateTask = (updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[currentTaskIndex] = updatedTask;
    setTasks(updatedTasks);
    setIsEditing(false);
    setCurrentTaskIndex(null);
  };


  return (
    <div className="app">
      <h1>To-Do List</h1>
      <ToDoForm
        currentTask={isEditing ? tasks[currentTaskIndex] : null}
        onSubmit={isEditing ? handleUpdateTask : handleAddTask}
      />

      <ToDoList
        tasks={tasks}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />
    </div>
  );
};

export default App;
