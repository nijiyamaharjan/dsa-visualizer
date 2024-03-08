// App.js
import React from 'react';
import './App.css';
import MainComponent from './MainComponent';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {/* <Route path='/*' element={<MainComponent />} /> */}
        <Route path='/*' element={<MainComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;