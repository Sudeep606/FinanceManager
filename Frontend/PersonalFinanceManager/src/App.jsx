import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login'; // Assuming Login.jsx is renamed or in the same directory
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;