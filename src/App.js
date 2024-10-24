import React, { useReducer, useEffect, useCallback, useState, useMemo } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage'
import AddTask from './pages/AddTask'
import EditTask from './pages/EditTask'
import TaskDetails from './pages/TaskDetails'

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/add-task" element={<AddTask/>}></Route>
        <Route path="/edit-task/:id" element={<EditTask/>}></Route>
        <Route path="/task/:id" element={<TaskDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
