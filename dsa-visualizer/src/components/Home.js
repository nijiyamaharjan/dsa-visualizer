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
                    ALGORITHMS VISUALIZER
                </h1>
                <div className="flex items-center justify-center">
                    <div>
                        <Helmet>
                            <title>Visualizer</title>
                        </Helmet>
                        <div className="flex justify-center items-center mb-4 text-gray-700">
                            {/* {this.renderCard('DataStructures', 'Stack, Queue, Linked List', '/DataStructures', 'https://static.packt-cdn.com/products/9781785888731/graphics/image_13_007-1.jpg')} */}
                            {this.renderCard('Sorting', 'Bubble/Insertion/Selection', '/Sorting', 'https://visualgo.net/img/gif/sorting.gif')}

                            {this.renderCard('Graph', 'Dijkstra, BFS, DFS', '/GraphAlgorithm', 'https://visualgo.net/img/gif/graphds.gif')}
                            {this.renderCard('Tree', 'Binary Tree Traversal', '/Tree', 'https://visualgo.net/img/gif/heap.gif')}
                        </div>
                    </div>
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
                            <img src={image} style={{ width: '200px', height: 'auto' }} />
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
