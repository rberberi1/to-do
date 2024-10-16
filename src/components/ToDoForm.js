import React, { useState, useEffect } from 'react';

const ToDoForm = ({tasks, currentTaskId, onSubmit, onCancel }) => {
  const [task, setTask] = useState({ title: '', description: '' });

  useEffect(() => {
    if (currentTaskId) {
   
      const currentTask = tasks.find((t) => t.id === currentTaskId);
      if (currentTask) {
        console.log('Editing task:', currentTask);
        setTask({ title: currentTask.title, description: currentTask.description });
      }else{
        setTask({title:'', description:''});
      }
    }
  }, [currentTaskId, tasks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({...task,[name] : value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title || !task.description) 
      return; 
    onSubmit(task);
    setTask({title:'', description:''});
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
      <button type="submit">{currentTaskId ? 'Update Task' : 'Add Task'}</button>
     { currentTaskId? <button type="button" onClick={onCancel}>Cancel</button>: null}
    </form>
  );
};

export default ToDoForm;
