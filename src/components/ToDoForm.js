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

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title || !task.description) 
      return; 
    const updatedTask = {
      ...task,
      id: currentTaskId, 
    };
    onSubmit(updatedTask);
    setTask({title:'', description:''});
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={(e)=>setTask({...task, 'title':e.target.value})}
        placeholder="Task Title"
      />
      <textarea
        name="description"
        row={4}
        value={task.description}
        onChange={(e)=>setTask({...task, 'description':e.target.value})}
        placeholder="Task Description"
      />
      <button type="submit">{currentTaskId ? 'Update Task' : 'Add Task'}</button>
     { currentTaskId? <button type="button" onClick={onCancel}>Cancel</button>: null}
    </form>
  );
};

export default ToDoForm;
