import React, { useState, useEffect } from 'react';

function ToDoForm  ({ currentTask, onSubmit })  {
  const [task, setTask] = useState({ title: '', time: '', date: '' });

  useEffect(() => {
    if (currentTask) {
      setTask(currentTask);
    }
  }, [currentTask]);

  const handleInputChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title || !task.time || !task.date) return;
    onSubmit(task);
    setTask({ title: '', time: '', date: '' }); 
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleInputChange}
        placeholder="Task Title"
      />
      <input
        type="time"
        name="time"
        value={task.time}
        onChange={handleInputChange}
        placeholder="Task Time"
      />
      <input
        type="date"
        name="date"
        value={task.date}
        onChange={handleInputChange}
        placeholder="Task Date"
      />
      <button type="submit">{currentTask ? 'Update Task' : 'Add Task'}</button>
      
    </form>
  );
};

export default ToDoForm;
