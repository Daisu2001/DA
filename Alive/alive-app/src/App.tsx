import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1>My Responsive React App</h1>
          <nav className="main-nav">
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <div className="grid">
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
