import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './home.css';

export class GraphAlgorithm extends Component {
    render() {
        return (
            <div className="min-h-screen flex flex-col items-center gradient-container">
                <Helmet>
                    <title>Graph Algorithms</title>
                </Helmet>
                <br />
                <h1 className="text-4xl font-bold text-gray-700 mb-10 mt-10 heading">
                    GRAPH ALGORITHMS VISUALIZER
                </h1>
                <br />
                <div className="container mt-20">
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full md:w-1/4 mb-6 mr-6 p-4">
                            <div className="w-full max-w-md bg-white bg-opacity-50 rounded-md shadow-xl flex flex-col items-center card-wrapper">
                                <div className="card-body p-6">
                                    <h3 className="card-title mb-4 text-lg text-white">
                                        Breadth First and Depth First Search
                                    </h3>
                                    <img src="https://visualgo.net/img/gif/dfsbfs.gif"></img><br></br>
                                    <NavLink to='/bfsdfs' style={{
                                        display: 'block',
                                        margin: 'auto',
                                        width: 'fit-content'
                                    }} className="p-2 text-white bg-gray-700 hover:bg-black focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">BFS and DFS</NavLink>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/4 mb-4 p-4">
                            <div className=" w-full max-w-md bg-white bg-opacity-50 rounded-md shadow-xl flex flex-col items-center card-wrapper">
                                <div className="card-body p-6">
                                    <h3 className="card-title mb-4 text-lg text-white">
                                        Dijkstra's Shortest Path Algorithm
                                    </h3>

                                    <img src="https://visualgo.net/img/gif/sssp.gif"></img><br></br>
                                    <NavLink to='/dijkstra' style={{
                                        display: 'block',
                                        margin: 'auto',
                                        width: 'fit-content'
                                    }} className="p-2 text-white bg-gray-700 hover:bg-black focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Dijkstra's Algorithm</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GraphAlgorithm;