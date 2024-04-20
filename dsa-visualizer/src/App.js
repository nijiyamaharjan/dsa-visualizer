import React from 'react';
import './App.css';
import MainComponent from './MainComponent';
import { Routes, Route, HashRouter } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="*" element={<MainComponent />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
