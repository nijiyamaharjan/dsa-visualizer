// App.js
import React from 'react';
import './App.css';
import MainComponent from './MainComponent';
import { Routes, Route, BrowserRouter, HashRouter } from 'react-router-dom';

function App() {
  return (
    <HashRouter base="/">
      <Routes>
        {/* <Route path='/*' element={<MainComponent />} /> */}
        <Route exact path='/*' element={<MainComponent />} />
      </Routes>
    </HashRouter>
  );
}

export default App;