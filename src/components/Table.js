import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './table.css';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const Table = () => {
  const [data, setData] = useState([]);
  const [programmingLanguage, setProgrammingLanguage] = useState('');
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 5;
  const [displayPage, setDisplayPage] = useState('github');

  const fetchData = async (view, language = '', page = 1, perPage = 5, date = '') => {
    setIsLoading(true);
    setError(null);

    try {
      let response;
      if (view === 'github') {
        response = await axios.get('https://api.github.com/search/repositories', {
          params: {
            q: `language:${language} created:>${date || '2024-11-01'}`,
            sort: 'stars',
            order: 'desc',
            per_page: perPage,
            page: page,
          },
        });

        const result = response.data;
        console.log(response)
        if (result) {
          setData(result.items);
          setTotalPages(Math.ceil(result.total_count / perPage));
        } else {
          setError('No items found');
        }
      } else if (view === 'todo') {
        response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        const todos = response.data;
        setData(todos.slice((page - 1) * perPage, page * perPage));
        setTotalPages(Math.ceil(todos.length / perPage));
        console.log(response)
      }
    } catch (error) {
      setError('Error fetching data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (displayPage === 'todo') {
      fetchData('todo', '', page, perPage);
    } else {
      fetchData('github', programmingLanguage, page, perPage, date);
    }
  }, [displayPage, programmingLanguage, page, date]);

  const handleChange = (pageType) => {
    setDisplayPage(pageType);
    setPage(1);
  };

  return (
    <>
      <ToggleButtonGroup
        color="primary"
        value={displayPage}
        exclusive
        aria-label="Data View Toggle"
      >
        <ToggleButton onClick={() => handleChange("github")} value="github">GitHub</ToggleButton>
        <ToggleButton onClick={() => handleChange("todo")} value="todo">To-Do List</ToggleButton>
      </ToggleButtonGroup>

      <div className="container">
        <h2 className="title">{displayPage === 'todo' ? 'To-Do List' : 'Repositories in GitHub'}</h2>

        {displayPage === 'github' && (
          <>
            <select
              value={programmingLanguage}
              onChange={(e) => {
                setProgrammingLanguage(e.target.value);
                setPage(1);
              }}
              className="language-select"
            >
              <option value="">All</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>

            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setPage(1); 
              }}
              className="date-input"
            />
          </>
        )}

        {error && <p className="error-message">{error}</p>}

        {isLoading ? (
          <p className="loading-message">Loading...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                {displayPage === 'todo' ? (
                  <>
                    <th>Title</th>
                    <th>Status</th>
                  </>
                ) : (
                  <>
                    <th>Name</th>
                    <th>Language</th>
                    <th>URL</th>
                    <th>Created at</th>
                    <th>Watchers</th>
                    <th>Description</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr className="row-item" key={item.id}>
                  {displayPage === 'todo' ? (
                    <>
                      <td>{item.title}</td>
                      <td>{item.completed ? 'Completed' : 'Pending'}</td>
                    </>
                  ) : (
                    <>
                      <td>{item.name}</td>
                      <td>{item.language}</td>
                      <td>{item.url}</td>
                      <td>{item.created_at}</td>
                      <td>{item.watchers_count}</td>
                      <td>{item.description}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="pagination">
          <button
            onClick={() => setPage(page > 1 ? page - 1 : page)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;
