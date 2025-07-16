import React, { useState } from 'react';
import './App.css';
import { useUserData } from './hooks/useUserData';
import { DataTable } from './components/DataTable';
import { NonVirtualizedTable } from './components/NonVirtualizedTable';

function App() {
  const { users, recordCount } = useUserData(500);
  const [useVirtualization, setUseVirtualization] = useState(true);

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Table Implementation</h1>
        <p>A high-performance table with sorting, column reordering, and virtualization</p>
      </header>
      
      <main className="app-main">
        <div className="table-container">
          <div className="table-info">
            <h2>User Data Table</h2>
            <p>Showing {recordCount} user records</p>
            <div style={{ marginTop: '1rem' }}>
              <button 
                onClick={() => setUseVirtualization(!useVirtualization)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: useVirtualization ? '#48bb78' : '#ed8936',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                {useVirtualization ? '✅ Virtualized' : '❌ Non-Virtualized'}
              </button>
              <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#666' }}>
                {useVirtualization 
                  ? 'Only ~7-8 DOM elements rendered (check DevTools!)' 
                  : 'All 500+ DOM elements rendered (may be slow!)'
                }
              </p>
            </div>
          </div>
          {useVirtualization ? (
            <DataTable data={users} />
          ) : (
            <NonVirtualizedTable data={users} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
