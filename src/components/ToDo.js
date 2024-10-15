function ToDo ({ task, onDelete, onEdit }) {
  return (
    <li className="todo-item">
      <div>
        <strong>{task.title}</strong> - {task.time} on {task.date}
      </div>
      <div>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </li>
  );
};

export default ToDo;
