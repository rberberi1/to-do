import ToDo from './ToDo';

function ToDoList({ tasks, onDelete, onEdit }) {
  return (
    <ul className="todo-list">
      {tasks.map((task, index) => (
        <ToDo
          key={index}
          task={task}
          onDelete={() => onDelete(index)}
          onEdit={() => onEdit(index)}
        />
      ))}
    </ul>
  );
}

export default ToDoList;
