import React, { Component, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './home.css';
import { Helmet } from 'react-helmet';

export class Home extends Component {
    componentDidMount() {
        document.body.style.overflow = 'hidden';
    }

    render() {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gradient-container">
                <h1 className="text-4xl font-bold text-gray-700 mb-20 mt-10">
                    DATA STRUCTURES AND ALGORITHMS VISUALIZER
                </h1>
                <div className="flex items-center justify-center">
                    <div>
                        <Helmet>
                            <title>Visualizer</title>
                        </Helmet>
                        <div className="flex justify-center items-center mb-4 text-gray-700">
                            {/* {this.renderCard('DataStructures', 'Stack, Queue, Linked List', '/DataStructures', 'https://static.packt-cdn.com/products/9781785888731/graphics/image_13_007-1.jpg')} */}
                            {this.renderCard('Sorting', 'Bubble/Insertion/Quick', '/Sorting','https://static.packt-cdn.com/products/9781785888731/graphics/image_13_007-1.jpg')}
                            {this.renderCard('Searching', 'Linear/Binary Search', '/Searching','https://static.packt-cdn.com/products/9781785888731/graphics/image_13_007-1.jpg')}
                            {this.renderCard('Graph', 'Dijkstra, Prim, BFS, DFS', '/GraphAlgorithm','https://static.packt-cdn.com/products/9781785888731/graphics/image_13_007-1.jpg')}
                            {this.renderCard('Tree', 'Binary Tree Traversal', '/Tree','https://static.packt-cdn.com/products/9781785888731/graphics/image_13_007-1.jpg')}
                        </div>
                    </div>
                </div>
                <div className="text-center py-7">
                    <p className="text-gray-700">
                        The application is aimed to help the users better understand various data structures and algorithms.
                    </p>
                </div>
            </div>
        );
    }

    renderCard(title, description, link, image) {
        return (
            <div className="flex card-container">
                <div className="m-10" style={{ width: '300px', height: '400px' }}>
                <div className="m-5">
                    <div className="w-full max-w-md bg-white bg-opacity-50 rounded-md shadow-xl flex flex-col items-center card-wrapper">
                        <h3 className="glassmorphism-title p-5">
                            {title}
                        </h3>
                        <img src={image} style={{ width: '150px', height: '150px' }} />
                        <p style={{ fontFamily: 'Georgia' }} className="glassmorphism-text p-10">
                            {description}
                        </p>
                        <NavLink
                            to={link}
                            className="p-4 text-white bg-gray-700 hover:bg-black focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                            style={{ width: '100px', height: '50px' }}
                        >
                            {title}
                        </NavLink>
                    </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Home;
