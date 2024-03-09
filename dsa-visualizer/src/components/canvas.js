import React, { Component } from 'react'
import { Helmet } from 'react-helmet';
let v1=null,v2=null;
let adj=[]
var delay=500
var color1='rgb(0, 204, 0)';
export class Canvas extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             points:[],
             edges:[],
             src:0
        }
    }

    getMousePosition(event) {//gets mouse co ordinates and add new point to canvas
        this.reset()
        let x = event.clientX-this.refs.svg.getBoundingClientRect().left ;
        let y = event.clientY-this.refs.svg.getBoundingClientRect().top;
        for(let i=0;i<this.state.points.length;i++)
        {
            let x1=this.state.points[i].x;
            let y1=this.state.points[i].y;
            let dist=(x-x1)*(x-x1)+(y-y1)*(y-y1);
            if(dist<=900)
            {
                return;
            }
        }
        this.setState((prev)=>{
            points:prev.points.push({
                x:x,
                y:y
            })
        },function(){
            adj.push([])
        })
        this.forceUpdate();
    }

    drawLine(e,idx){//draws edge
        this.reset()
        let u=document.getElementById(`point${idx}`);
        u.style.fill='red';
        if(v1===null)
        v1=idx;
        else {
            v2=idx;
            u=document.getElementById(`point${v1}`);
            u.style.fill='#000';
            u=document.getElementById(`point${v2}`);
            u.style.fill='#000';
            for(let i=0;i<this.state.edges.length;i++)
            {
                if(this.state.edges[i].u===v1 && this.state.edges[i].v===v2)
                {   v1=null
                    v2=null
                    return;
                }
                else if(this.state.edges[i].u===v2 && this.state.edges[i].v===v1)
                {
                    v1=null
                    v2=null
                    return;
                }
            }
            if(v1===v2)
            {
                v1=null
                v2=null
                return
            }
            this.setState((prev)=>{
                edges:prev.edges.push({
                    u:v1,
                    v:v2
                })
            },function(){
                adj[v1].push({vertex:v2,edgeNo:this.state.edges.length-1})
                adj[v2].push({vertex:v1,edgeNo:this.state.edges.length-1})
                v1=null
                v2=null
            })
            this.forceUpdate()
        }
    }

    reset(){//resets animation
        for(let i=0;i<this.state.points.length;i++){
            if(document.getElementById(`point${i}`).style.fill==='blue' || document.getElementById(`point${i}`).style.fill===color1)
            document.getElementById(`point${i}`).style.fill='#000'
        }
        for(let i=0;i<this.state.edges.length;i++)
        {
            if(document.getElementById(`edge${i}`).style.stroke==='blue')
            document.getElementById(`edge${i}`).style.stroke='red'
        }
    }
    
    changeSrc(e){//updates source vertex as entered by user
        let x=document.getElementById('src').value
        this.setState({
            src:x
        })
    }

    clear(){//clears canvas
        this.setState({
            points:[],
            edges:[],
            src:0
        },function(){
            v1=null
            v2=null
            adj=[]
        })
        this.forceUpdate();
    }
    
    //BFS TRAVERSAL OF GRAPH
    bfsAnimations(s){//generates animation for bfs
        let animations=[]
        let vis=[]
        for(let i=0;i<this.state.points.length;i++)
        {
            vis[i]=false
        }
        let queue=[]
        queue.push(s)
        vis[s]=true;
        while(queue.length!==0)
        {
            var x=queue[0]
            queue.shift()
            animations.push({
                x:x,
                y:-1,
                color:color1
            })
            for(let i=0;i<adj[x].length;i++)
            {
                if(vis[adj[x][i].vertex]===false)
                {
                    vis[adj[x][i].vertex]=true;
                    queue.push(adj[x][i].vertex)
                    
                    animations.push({
                        x:adj[x][i].edgeNo,
                        y:-1,
                        color:'edge'
                    })
                    animations.push({
                        x:adj[x][i].edgeNo,
                        y:-1,
                        color:'shrinkEdge'
                    })

                    animations.push({
                        x:adj[x][i].vertex,
                        y:-1,
                        color:'blue'
                    })
                }
            }
        }
        return animations
    }

    bfs(s){//triggers bfs algorithm
        if(s>=this.state.points.length)
        return;
        this.reset()
        const animations=this.bfsAnimations(s)
        let len=animations.length
        for(let i=0;i<len;i++)
        {
            if(animations[i].color==='edge')
            {
                let x1=document.getElementById(`edge${animations[i].x}`)
                setTimeout(() => {
                    x1.style.stroke='blue'
                    x1.style.strokeWidth='5'
                    x1.style.borderRadius='2'
                }, i*delay);
            }
            else if(animations[i].color==='shrinkEdge')
            {
                let x1=document.getElementById(`edge${animations[i].x}`)
                setTimeout(() => {
                    x1.style.strokeWidth='2'
                    x1.style.borderRadius='0'
                }, i*delay);
            }
            else
            {
                    let x=document.getElementById(`point${animations[i].x}`)
                    setTimeout(() => {
                        x.style.fill=animations[i].color
                    }, i*delay);
            }
        }
    }

    //DFS ALGORITHM
    dfsutil(s,vis,animations){
        animations.push({
            x:s,
            y:-1,
            color:color1
        })
        vis[s]=true
        for(let i=0;i<adj[s].length;i++)
        {
            if(!vis[adj[s][i].vertex])
            {
                animations.push({
                    x:adj[s][i].edgeNo,
                    y:-1,
                    color:'edge'
                })
                
                animations.push({
                    x:adj[s][i].edgeNo,
                    y:-1,
                    color:'shrinkEdge'
                })
                animations.push({
                    x:adj[s][i].vertex,
                    y:-1,
                    color:'blue'
                })
                this.dfsutil(adj[s][i].vertex,vis,animations)
            }
        }
    }

    dfsAnimations(s){//generates animations for dfs
        var animations=[]
        let vis=[]
        for(let i=0;i<this.state.points.length;i++)
        {
            vis[i]=false
        }
        this.dfsutil(s,vis,animations)
        return animations
    }

    dfs(s){//triggers dfs algorithm
        if(s>=this.state.points.length)
        return;
        const animations=this.dfsAnimations(s)
        this.reset()
        let len=animations.length
        for(let i=0;i<len;i++)
        {
            if(animations[i].color==='edge')
            {
                let x1=document.getElementById(`edge${animations[i].x}`)
                setTimeout(() => {
                    x1.style.stroke='blue'
                    x1.style.strokeWidth='5'
                    x1.style.borderRadius='2'
                }, i*delay);
            }
            else if(animations[i].color==='shrinkEdge')
            {
                let x1=document.getElementById(`edge${animations[i].x}`)
                setTimeout(() => {
                    x1.style.strokeWidth='2'
                    x1.style.borderRadius='0'
                }, i*delay);
            }
            else
            {
                    let x=document.getElementById(`point${animations[i].x}`)
                    setTimeout(() => {
                        x.style.fill=animations[i].color
                    }, i*delay);
            }
        }
    }
    render() {
        var pts=this.state.points.map((x,idx)=>{
            return(
            <circle key={"point"+idx} id={"point"+idx} cx={x.x} cy={x.y} r="14" stroke="black" onClick={(event)=>this.drawLine(event,idx)} strokeWidth="1.5" style={{fill:"#000",transition:'all .2s linear',cursor:'pointer'}} />
            )
        })
        var ptsidx=this.state.points.map((pt,idx)=>{
            return(
                <text  key={"index"+idx} id={"index"+idx} fontSize="14" fontFamily="Arial" x={pt.x-4} y={pt.y+4} onClick={(event)=>this.drawLine(event,idx)} style={{fill:"#fff",transition:'all .2s linear',cursor:'pointer'}}>{idx}</text>
            )
        })
        var lines=this.state.edges.map((q,idx)=>{
            return(
                <line key={"edge"+idx} id={"edge"+idx} x1={this.state.points[q.u].x} y1={this.state.points[q.u].y} x2={this.state.points[q.v].x} y2={this.state.points[q.v].y} style={{stroke:'red',strokeWidth:'2',transition:'all .2s linear'}} />
            )
        })

        return (
            <div className='bg'>
                <Helmet>
        <title>BFS and DFS</title>
      </Helmet>
            <center>
            <button className="button button4" onClick={()=>this.bfs(this.state.src)}>BFS</button>
            <button className="button button4" onClick={()=>this.dfs(this.state.src)}>DFS</button>
            <button className="button button4" onClick={()=>this.reset()}>Reset</button>
            <button className="button button4" onClick={()=>this.clear()}>Clear Canvas</button>
            <label style={{fontFamily:'Georgia'}}>&nbsp;&nbsp;&nbsp;Source/starting Vertex &nbsp;</label>
            <input type="text" style={{width:'25px'}} id="src" value={this.state.src} onChange={(e)=>this.changeSrc(e)} />
            </center>
            <center>
            <svg paintOrder='markers' ref='svg' width={window.innerWidth*.998} height={window.innerHeight*0.94} style={{backgroundColor:'#BEBEEC',cursor:'crosshair'}} onClick={(event)=>this.getMousePosition(event)}>
            <rect>
            <title>
            1.Click to plot some points.&#13;2.Connect two points by clicking on them consecutively.&#13;3.Run the algo and Enjoy!!!
            </title>
            </rect>
            {lines}
            {pts}
            {ptsidx}
            
            </svg>
            </center>
            </div>
        )
    }
}

export default Canvas
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}