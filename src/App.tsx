import React from 'react';
import './App.css';
import { useUserData } from './controllers/hooks/useUserData';

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
          <div className="placeholder">
            <h2>Table Component Coming Soon</h2>
            <p>Generated {recordCount} user records</p>
            <p>This is where the data table will be rendered</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
