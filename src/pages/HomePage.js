import React, { useReducer, useEffect,  useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ToDoList from '../components/ToDoList';

const API_URL = 'http://localhost:8080/todos';


const initialState = {
  tasks: [],
  loading: false,
  error: null,
};


const actionTypes = {
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE',
  DELETE_TASK: 'DELETE_TASK',
  TOGGLE_TASK: 'TOGGLE_TASK',
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SUCCESS:
      return { ...state, loading: false, tasks: action.payload };
    case actionTypes.FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload };  
    case actionTypes.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
      case actionTypes.TOGGLE_TASK:
        return {
          ...state,
          tasks: state.tasks.map((task) =>
            task.id === action.payload.id ? { ...task, completed: action.payload.completed } : task
          ),
        };
    default:
      throw new Error();
  }
};

const HomePage=()=>{
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { tasks, loading, error } = state;
  const navigate=useNavigate()
  const[searchParams, setSearchParams]=useSearchParams()
  const filter = searchParams.get('filter');



  useEffect(() => {
    const fetchTasks =async () => {
      try {
        const response = await axios.get(API_URL);
        dispatch({ type: actionTypes.FETCH_SUCCESS, payload: response.data });
        console.log('fetching')
      } catch (err) {
        dispatch({ type: actionTypes.FETCH_FAILURE, payload: err.message });
      }
    };

    fetchTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    }
    if (filter === 'uncompleted') {
      return tasks.filter(task => !task.completed);
    }
    return tasks; 
  }, [tasks, filter]);


  const handleAddTask = () => {
    navigate('/add-task'); 
  };

const handleCheckboxChange = async (id, completed) => {
  const newCompletedStatus = !completed;

  try {
    await axios.patch(`${API_URL}/${id}`, { completed: newCompletedStatus });
    dispatch({ type: actionTypes.TOGGLE_TASK, payload: { id, completed: newCompletedStatus } });
  } catch (error) {
    console.error('Error toggling task:', error);
  }
};



  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      dispatch({ type: actionTypes.DELETE_TASK, payload: id });
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };


  const handleEditTask = (id) => {
    navigate(`/edit-task/${id}`);
  };



  const completedCount = useMemo(() => {
    return tasks.filter(task => task.completed).length;
  }, [tasks]);

  const uncompletedCount = useMemo(() => {
    return tasks.filter(task => !task.completed).length;
  }, [tasks]);


  return (
    <div className="app">
      <h1>To-Do List</h1>

      {loading && <p>Loading...</p>}
 
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p><strong>Completed tasks: </strong>{completedCount}</p>
      <p><strong>Uncompleted tasks:</strong> {uncompletedCount}</p>

      <div>
       <button className="add-btn" onClick={handleAddTask}>Add Task</button>
       <select defaultValue=""
          onChange={(e)=>{
            const filter= e.target.value;
            if (filter === "") {
              setSearchParams({}); 
            } else {
              setSearchParams({ filter: filter }); 
            }
          }}
       >
        <option value="">Default</option>
        <option value="completed">Completed Tasks</option>
        <option value="uncompleted">Uncompleted Tasks</option>
       </select>
       </div>
     
      <ToDoList
        tasks={filteredTasks}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
        onCheckboxChange={handleCheckboxChange}  
      />
    </div>
  );
}

export default HomePage;