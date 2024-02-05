import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import { Helmet } from 'react-helmet';
import './graph.css'

export class GraphAlgorithm extends Component {
    render() {
        return (
            <center>
            <div>
            <Helmet>
        <title>Graph Algorithms</title>
      </Helmet>
            <br/>
                <h1 className="heading" style={{color:'darkblue'}}>
                    GRAPH ALGORITHM VISUALISER
                </h1>
                <br/>
                <div className="container">
                    <div className="row">
                    
                    <div className="col-sm-12 col-md-3">
                    <center>
                    <div className="card box" style={{width: '100%',backgroundColor:'#fafafa'}}>
                    
                    <div className="card-body">
                        <h3 className="card-title" style={{fontFamily:'Georgia'}}><br/>Breadth First and Depth First Algorithms</h3>
                        <p style={{fontFamily: 'Georgia'}} className="card-text">A simple simulation of Breadth First Traversal and Depth First traversal on an undirected graph created by the user.</p>
                        <center>
                        <NavLink to='/bfsdfs' style={{width:'70%',color:'white',fontFamily:'Georgia'}} className="button button4">BFS and DFS</NavLink>
                        </center>
                    </div>
                    </div>
                    </center>
                    </div>
    
                    <div className="col-sm-12 col-md-3">
                    <center>
                    <div className="card box" style={{width: '100%',backgroundColor:'#fafafa'}}>
                    
                    <div className="card-body">
                        <h3 className="card-title" style={{fontFamily:'Georgia'}}><br/>Dijkstra's Shortest Path Algorithm</h3>
                        <p style={{fontFamily: 'Georgia'}} className="card-text">A simulation of Djikstra's Shortest Path Algorithm and finding the shortest paths from the chosen source vertex to all the nodes.</p>
                        <center>
                        <NavLink to='/dijkstra' style={{width:'70%',color:'white',fontFamily:'Georgia'}} className="button button4">Dijkstra's Algorithm</NavLink>
                        </center>
                    </div>
                    </div>
                    </center>
                    </div>

                    <div className="col-sm-12 col-md-3">
                    <center>
                    <div className="card box" style={{width: '100%',backgroundColor:'#fafafa'}}>
                    
                    <div className="card-body">
                        <h3 className="card-title" style={{fontFamily:'Georgia'}}><br/>Kruskal's Minimal Spanning Tree</h3>
                        <p style={{fontFamily: 'Georgia'}} className="card-text">A simple simulation Kruskal's Algorithm for finding the Minimal Spanning Tree of a connected undirected weighted graph.</p>
                        <center>
                        <NavLink to='/KruskalMST' style={{width:'70%',color:'white',fontFamily:'Georgia'}} className="button button4">Kruskal's MST</NavLink>
                        </center>
                    </div>
                    </div>
                    </center>
                    </div>

                    <div className="col-sm-12 col-md-3">
                    <center>
                    <div className="card box" style={{width: '100%',backgroundColor:'#fafafa'}}>
                    
                    <div className="card-body">
                        <h3 className="card-title" style={{fontFamily:'Georgia'}}><br/>Prim's Minimal Spanning Tree Algorithm</h3>
                        <p style={{fontFamily: 'Georgia'}} className="card-text">A simple simulation Prim's Algorithm for finding the Minimal Spanning Tree of a connected undirected weighted graph.</p>
                        <center>
                        <NavLink to='/PrimMST' style={{width:'70%',color:'white',fontFamily:'Georgia'}} className="button button4">Prim's MST</NavLink>
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
                <div className="col-12" style={{backgroundColor:'#fafafa',border:'.5px solid #d6d6d6',borderRadius:'4px',padding:'10px 10px 0px 10px'}}>
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8 box" >
                        <p style={{fontFamily:'Georgia'}}> The application is aimed to help the users better understand the famous algorithms on graph by visualizing the steps and realizing how the algorithm actually works. The graph is user generated and the edge weights of weighted graphs are randomly generated and can be changed by the click of a button.</p>
                        <p>For any query/sugesstion/feedback, mail at: <b>pratimsarkar23@gmail.com</b></p>
                    </div>
                    <div className="col-2"></div>
                </div>
                </div></div>
            </div>
            </center>
        )
    }
}

export default GraphAlgorithm
