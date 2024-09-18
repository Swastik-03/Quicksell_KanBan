import React, { useEffect, useState } from 'react';
import KanbanBoard from './components/KanbanBoard';
import './App.css';

const App = () => {
  // Initialize state with function to check localStorage
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(() => {
    const savedGroupBy = localStorage.getItem('groupBy');
    return savedGroupBy ? savedGroupBy : 'status'; // Default to 'status'
  });
  const [sortBy, setSortBy] = useState(() => {
    const savedSortBy = localStorage.getItem('sortBy');
    return savedSortBy ? savedSortBy : 'priority'; // Default to 'priority'
  });
  const [loading, setLoading] = useState(true);
  const [isBoxOpen, setIsBoxOpen] = useState(false);

  // Fetching data from the API
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Save view state (groupBy and sortBy) in localStorage
  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
  }, [groupBy]);

  useEffect(() => {
    localStorage.setItem('sortBy', sortBy);
  }, [sortBy]);

  const handleGroupChange = (event) => {
    setGroupBy(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleClick = () => {
    setIsBoxOpen(!isBoxOpen);
  };

  return (
    <div className="app">
      <header>
        <div className="controls">
          <div onClick={handleClick} className="Display">
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <img src="/icons/icons_FEtask/Display.svg" width="20" height="20" alt="Display icon" />
              <span style={{ lineHeight: '13px', marginBottom: '3px' }}>Display</span>
              <img src="/icons/icons_FEtask/down.svg" width="20" height="20" alt="Down icon" style={{ marginTop: '2px' }} />
            </div>
          </div>
          {isBoxOpen && (
            <div>
              <div className="smallcard" style={{ position: 'absolute', top: '60px', left: '48px', zIndex: 1000 }}>
                <div style={{display:'flex', alignItems:'center',justifyContent:'space-between', paddingLeft:'15px', paddingRight:'15px', paddingTop:'15px'}}>
                  <div>Grouping  </div>
                  <select value={groupBy} onChange={handleGroupChange}>
                    <option value="status">Status</option>
                    <option value="userId">User</option>
                    <option value="priority">Priority</option>
                  </select>
                </div>
                <div style={{display:'flex', alignItems:'center',justifyContent:'space-between', paddingLeft:'15px', paddingRight:'15px', paddingBottom:'15px' ,marginTop:'15px'}}>
                  <div>Ordering </div>
                  <select value={sortBy} onChange={handleSortChange}>
                    <option value="priority">Priority</option>
                    <option value="title">Title</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {loading ? (
        <p>Loading tickets...</p>
      ) : (
        <KanbanBoard tickets={tickets} users={users} groupBy={groupBy} sortBy={sortBy} />
      )}
    </div>
  );
};

export default App;
