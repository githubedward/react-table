import React from 'react';
import './App.css';
import { useUserData } from './controllers/hooks/useUserData';
import { DataTable } from './views/components/DataTable';

function App() {
  const { users, recordCount } = useUserData(500);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Table Implementation</h1>
        <p>A high-performance table with sorting, column reordering, and virtualization</p>
      </header>
      
      <main className="App-main">
        <div className="table-container">
          <div className="table-info">
            <h2>User Data Table</h2>
            <p>Showing {recordCount} user records</p>
          </div>
          <DataTable data={users} />
        </div>
      </main>
    </div>
  );
}

export default App;
