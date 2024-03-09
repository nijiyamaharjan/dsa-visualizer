import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

function LandingPage() {
  return (
    <>
      <Helmet>
        <title>Visualizer</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center gradient-container">
        <div className="flex m-20 w-1/2 h-fu bg-white bg-opacity-20 rounded-md shadow-lg items-center">
          <div className="w-1/2 pr-4 p-8">
            <h1 className="text-4xl font-bold text-gray-700 mb-4 justify-center items-center">ALGO-VISUALIZER</h1>
            <p className="text-sm text-justify py-2">
            This app aims to provide a simple yet effective way for users to visualize algorithms, specifically focusing on graph sorting and tree traversal. Through interactive animations and step-by-step demonstrations, users can gain a deeper understanding of fundamental computer science concepts. Whether you're a beginner learning the basics or an experienced developer looking to refine your skills, this visualizer offers a valuable tool for exploring and mastering these essential algorithms.
            </p>
            <div className='flex py-4'>
              <Link to="/home">
                <button type="button" className="text-white bg-gray-700 hover:bg-black focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">GET STARTED</button>
              </Link>
            </div>
          </div>
          <div className="w-1/2 p-10">
            <img src="https://static.vecteezy.com/system/resources/previews/001/311/712/large_2x/programming-and-coding-concept-vector.jpg" alt="image" className="w-full h-auto rounded-md" />
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingPage;
