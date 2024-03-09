// MainComponent.js
import React from 'react';
import BfsDfs from './components/bfs_dfs';
import ShortestPath from './components/ShortestPath';

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Sorting from './components/Sorting/Sorting';

import GraphAlgorithm from './components/GraphAlgorithm';
import Home from './components/Home';
import LandingPage from './components/LandingPage';

import Tree from './components/Tree/Tree';


function MainComponent() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/home' element={<Home />} />
      <Route path='/bfsdfs' element={<BfsDfs />} />
      <Route path='/dijkstra' element={<ShortestPath />} />
      <Route path='/Sorting' element={<Sorting />} />
      <Route path='/Tree' element={<Tree />} />
      <Route path='/GraphAlgorithm' element={<GraphAlgorithm />} />
    </Routes>
  );
}

export default MainComponent;
