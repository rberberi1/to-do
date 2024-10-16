import React, { useState, useEffect } from 'react';

const ToDoForm = ({ currentTask, onSubmit, onCancel }) => {
  const [task, setTask] = useState({ title: '', description: '', completed: false });

  useEffect(() => {
    if (currentTask) {
      setTask(currentTask);
    } else {
      setTask({ title: '', description: '', completed: false });
    }
  }, [currentTask]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({
      ...task,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title || !task.description) return; 
    onSubmit(task);
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
      <textarea
        name="description"
        row={4}
        value={task.description}
        onChange={handleInputChange}
        placeholder="Task Description"
      />
      <button type="submit">{currentTask ? 'Update Task' : 'Add Task'}</button>
     { currentTask? <button type="button" onClick={onCancel}>Cancel</button>: null}
    </form>
  );
};

export default ToDoForm;
