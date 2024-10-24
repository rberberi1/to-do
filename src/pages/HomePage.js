import React, { useReducer, useEffect, useCallback, useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AddTask from './AddTask'
import EditTask from './EditTask'
import axios from 'axios';
import ToDoList from '../components/ToDoList';
import ToDoForm from '../components/ToDoForm';

const API_URL = 'http://localhost:8080/todos';


const initialState = {
  tasks: [],
  loading: false,
  error: null,
};


const actionTypes = {
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE',
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  TOGGLE_TASK: 'TOGGLE_TASK',
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SUCCESS:
      return { ...state, loading: false, tasks: action.payload };
    case actionTypes.FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case actionTypes.ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
      case actionTypes.UPDATE_TASK:
        return {
          ...state,
          tasks: state.tasks.map((task) =>
            task.id === action.payload.id 
              ? { ...task, ...action.payload } 
              : task
          ),
        };
      
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

 
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

 
  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get(API_URL);
      dispatch({ type: actionTypes.FETCH_SUCCESS, payload: response.data });
      console.log('fetching')
    } catch (err) {
      dispatch({ type: actionTypes.FETCH_FAILURE, payload: err.message });
    }
  }, []);

  
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = useMemo(() => {
    if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    }
    if (filter === 'uncompleted') {
      return tasks.filter(task => !task.completed);
    }
    return tasks; // Return all tasks if no filter is set
  }, [tasks, filter]);


  // const handleAddTask = async (task) => {
  //   try {
  //     const response = await axios.post(API_URL, {
  //       title: task.title,
  //       description: task.description,
  //     });
  //     dispatch({ type: actionTypes.ADD_TASK, payload: response.data });
  //   } catch (error) {
  //     console.error('Error adding task:', error);
  //   }
  // };

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


// const handleUpdateTask = async (updatedTask) => {
//   try {
//     const response = await axios.patch(`${API_URL}/${updatedTask.id}`, {
//       title: updatedTask.title,
//       description: updatedTask.description,
//     });

//     dispatch({ type: actionTypes.UPDATE_TASK, payload: response.data });
//   } catch (error) {
//     console.error('Error updating task:', error);
//   }
// };


  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      dispatch({ type: actionTypes.DELETE_TASK, payload: id });
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // const handleEditTask = (id) => {
  //   setIsEditing(true);
  //   setCurrentTaskId(id);
  // };

  const handleEditTask = (id) => {
    navigate(`/edit-task/${id}`);
  };

  // const handleCancelEdit = () => {
  //   setIsEditing(false);
  //   setCurrentTaskId(null);
  // };


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
      


      {/* <ToDoForm
        tasks={tasks}             
        currentTaskId={currentTaskId} 
        onSubmit={isEditing ? handleUpdateTask : handleAddTask} 
        onCancel={handleCancelEdit}   
      /> */}
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