import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './table.css';

const Table = () => {
  const [data, setData] = useState([]);
  const [programmingLanguage, setProgrammingLanguage] = useState('');
  const [date, setDate] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 5;

  const fetchData = async (language, page, perPage, date) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get('https://api.github.com/search/repositories', {
        params: {
          q: `language:${language} created:>${date || '2024-11-04'}`, 
          sort: 'stars',
          order: 'desc',
          per_page: perPage,
          page: page,
        },
      });
      console.log(response)

      const result = response.data;
      if (result) {
        setData(result.items);
        setTotalPages(Math.ceil(result.total_count / perPage));
      } else {
       
        setError('No items found');
      }
    } catch (error) {
      setError('Error fetching data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(programmingLanguage, page, perPage, date);
  }, [programmingLanguage, page, date]);

  return (
    <div className="container">
      <h2 className="title">Repositories in GitHub</h2>

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

      {error && <p className="error-message">{error}</p>}

      {isLoading ? (
        <p className="loading-message">Loading...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Language</th>
              <th>URL</th>
              <th>Created at</th>
              <th>Watchers</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr className="row-item" key={item.id}>
                <td>{item.name}</td>
                <td>{item.language}</td>
                <td>{item.url}</td>
                <td>{item.created_at}</td>
                <td>{item.watchers_count}</td>
                <td>{item.description}</td>
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
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
