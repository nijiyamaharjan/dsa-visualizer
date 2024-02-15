import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export class DataStructures extends Component {
    componentDidMount() {
        document.body.style.overflow = 'hidden';
    }

    render() {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gradient-container">
                <h1 className="text-4xl font-bold text-gray-700 mb-40 mt-10">
                    Data Structures
                </h1>
                <div className="flex  w-full h-full items-center justify-center">
                    <div>
                        <Helmet>
                            <title>Data Structures</title>
                        </Helmet>
                        <div className="flex mb-4">
                            {this.renderCard('Stack', '/Stack')}
                            {this.renderCard('Queue', '/Queue')}
                            {this.renderCard('Linked List', '/LinkedList')}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderCard(title, link) {
        return (
            <div className="flex h-screen card-container text-gray-700">
                <div className="m-10">
                    <div className="w-full max-w-md bg-white bg-opacity-50 rounded-md shadow-xl flex flex-col items-center card-wrapper">
                        <h3 className="glassmorphism-title p-10">
                            {title}
                        </h3>
                        <NavLink
                            to={link}
                            className="p-4 text-white bg-gray-700 hover:bg-black focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                        >
                            {title}
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }

}

export default DataStructures;

