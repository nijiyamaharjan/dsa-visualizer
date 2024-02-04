import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import { Helmet } from 'react-helmet';
import './home.css'

export class Home extends Component {
    render() {
        return (
            <center>
            <div>
            <Helmet>
        <title>Visualizer</title>
      </Helmet>
            <br/>
                <h1 className="heading">
                    DATA STRUCTURES AND ALGORITHMS VISUALIZER
                </h1>
                <br/>
                <div className="container">
                    <div className="row">
                    
                    <div className="col-sm-12 col-md-3">
                    <center>
                    <div className="card box">
                    
                    <div className="card-body">
                        <h3 className="card-title" style={{fontFamily:'Georgia'}}><br/>Data Structures</h3>
                        <p style={{fontFamily: 'Georgia'}} className="card-text">Stack, Queue, Linked List</p>
                        <center>
                        <NavLink to='/DataStructures' style={{width:'70%',color:'white',fontFamily:'Georgia'}} className="button button4">Data Structures</NavLink>
                        </center>
                    </div>
                    </div>
                    </center>
                    </div>
    
                    <div className="col-sm-12 col-md-3">
                    <center>
                    <div className="card box">
                    
                    <div className="card-body">
                        <h3 className="card-title" style={{fontFamily:'Georgia'}}><br/>Sorting</h3>
                        <p style={{fontFamily: 'Georgia'}} className="card-text">Bubble Sort, Insertion Sort, Quick Sort</p>
                        <center>
                        <NavLink to='/Sorting' style={{width:'70%',color:'white',fontFamily:'Georgia'}} className="button button4">Sorting</NavLink>
                        </center>
                    </div>
                    </div>
                    </center>
                    </div>

                    <div className="col-sm-12 col-md-3">
                    <center>
                    <div className="card box">
                    
                    <div className="card-body">
                        <h3 className="card-title" style={{fontFamily:'Georgia'}}><br/>Searching</h3>
                        <p style={{fontFamily: 'Georgia'}} className="card-text">Linear Search, Binary Search</p>
                        <center>
                        <NavLink to='/Searching' style={{width:'70%',color:'white',fontFamily:'Georgia'}} className="button button4">Searching</NavLink>
                        </center>
                    </div>
                    </div>
                    </center>
                    </div>

                    <div className="col-sm-12 col-md-3">
                    <center>
                    <div className="card box">
                    
                    <div className="card-body">
                        <h3 className="card-title" style={{fontFamily:'Georgia'}}><br/>Graph</h3>
                        <p style={{fontFamily: 'Georgia'}} className="card-text">Dijkstra, Prim, BFS, DFS</p>
                        <center>
                        <NavLink to='/GraphAlgorithm' style={{width:'70%',color:'white',fontFamily:'Georgia'}} className="button button4">Graph</NavLink>
                        </center>
                    </div>
                    </div>
                    </center>
                    </div>


                    <div className="col-sm-12 col-md-3">
                    <center>
                    <div className="card box">
                    
                    <div className="card-body">
                        <h3 className="card-title" style={{fontFamily:'Georgia'}}><br/>Tree</h3>
                        <p style={{fontFamily: 'Georgia'}} className="card-text">Binary Tree Traversal</p>
                        <center>
                        <NavLink to='/Tree' style={{width:'70%',color:'white',fontFamily:'Georgia'}} className="button button4">Tree</NavLink>
                        </center>
                    </div>
                    </div>
                    </center>
                    </div>

                    </div>
                </div>

                <div className="row">
                <div className="col-12">
                <br/><br/>
                </div>
                </div>
                <div className="row">
                <div className="col-12">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8 box" >
                        <p style={{fontFamily:'Georgia'}}> The application is aimed to help the users better understand various data structures and algorithms.</p>
                    </div>
                    <div className="col-2"></div>
                </div>
                </div></div>
            </div>
            </center>
        )
    }
}

export default Home
