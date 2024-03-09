import React, { Component } from 'react'
import { Helmet } from 'react-helmet';
import './graph.css'

let v1=null,v2=null
let adj=[]
var delay=500
let weights=[]
var r=14
var INT_MAX=100000
let parent=[]
let color1='rgb(0, 204, 0)';
let done=false
let timeouts=[]
export class ShortestPath extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             points:[],
             edges:[],
             src:0
        }
    }

    randomWeights(){ //generate random weights for edges of the graph
        for(let i=0;i<this.state.edges.length;i++)
        weights[i]=getRandomInt(1,50);
        this.reset()
        this.forceUpdate();
    }
    addWeights() //add random weight for a new edge
    {
        weights.push(getRandomInt(1,50))
        this.forceUpdate()
    }
    getMousePosition(event) //gets position of mouse click
    {
        this.reset()
        done=false
        let x = event.clientX-this.refs.svg.getBoundingClientRect().left
        let y = event.clientY-this.refs.svg.getBoundingClientRect().top
        for(let i=0;i<this.state.points.length;i++)
        {
            let x1=this.state.points[i].x;
            let y1=this.state.points[i].y;
            let dist=(x-x1)*(x-x1)+(y-y1)*(y-y1);
            if(dist<=1000)
                return false;
        }
        this.setState((prev)=>{
            points:prev.points.push({x:x,y:y})
        },function(){
            adj.push([])
        })
        this.forceUpdate();
    }

    changeSrc(e){ //handles changes to the source vertex input field
        this.reset()
        done=false
        let x=document.getElementById('src').value
        this.setState({
            src:x
        })
    }

    drawLine(idx){// draws edge between two vertices and adds to the state
        this.reset()
        done=false
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
                    return
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
                this.addWeights()
                adj[v1].push({vertex:v2,edgeNo:this.state.edges.length-1})
                adj[v2].push({vertex:v1,edgeNo:this.state.edges.length-1})
                v1=null
                v2=null
            })
            this.forceUpdate()
        }
    }

    reset(){//resetd graph visualization
        done=false
        for(let i=0;i<this.state.points.length;i++){
            if(document.getElementById(`point${i}`).style.fill!=='red')
            document.getElementById(`point${i}`).style.fill='#000'
        }
        for(let i=0;i<this.state.edges.length;i++)
        {
            document.getElementById(`edge${i}`).style.stroke='red'
            document.getElementById(`weight${i}`).style.fill='black'
        }
        for(let i=0;i<this.state.points.length;i++)
        {
            document.getElementById(`dist${i}`).textContent='∞';
        }
        parent=[]
        this.forceUpdate();
    }
    clear(){//clears canvas
        done=false
        this.setState({
            points:[],
            edges:[],
            dist:[]
        },function(){
            v1=null
            v2=null
            adj=[]
            weights=[]
            parent=[]
        })
        this.forceUpdate();
    }

    showPath(s){//highlights shortest path from source vertex to vertex 's'
        
        if(done===false)
        return
        let i=parent[s]
        document.getElementById(`point${s}`).style.fill='yellow'
        document.getElementById(`index${s}`).style.fill='black'
        if(typeof i==="undefined")
        return
        while(i.vertex!==-1)
        {
            document.getElementById(`edge${i.edgeNo}`).style.stroke='yellow'
            document.getElementById(`point${i.vertex}`).style.fill='yellow'
            document.getElementById(`index${i.vertex}`).style.fill='black'
            i=parent[i.vertex]
        }
    }

    removePath(s){//removes highlight
       
        if(done===false)
        return
        let i=parent[s]
        document.getElementById(`point${s}`).style.fill=color1
        document.getElementById(`index${s}`).style.fill='white'
        if(typeof i==="undefined")
        return
        while(i.vertex!==-1)
        {
            document.getElementById(`edge${i.edgeNo}`).style.stroke='blue'
            document.getElementById(`point${i.vertex}`).style.fill=color1
            document.getElementById(`index${i.vertex}`).style.fill='white'
            i=parent[i.vertex]
        }
    }

    //DIJKSTRA'S SHORTEST PATH ALGORITHM
    minDist(dist,sptSet) 
    {
        // Initialize min value 
        let min = INT_MAX, min_index; 
        for (let v = 0; v < this.state.points.length; v++)
            if (sptSet[v] === false && dist[v] <= min)
                {
                    min = dist[v]
                    min_index = v
                }
        return min_index
    }
    dijkstraAnimations(s){
        this.reset()
        let ar=[]
        for(let i=0;i<this.state.points.length;i++)
        {
            ar.push([])
            for(let j=0;j<this.state.points.length;j++)
            ar[i].push(0)
        }
        //forming adj matrix
        for(let i=0;i<this.state.edges.length;i++)
        {
            ar[this.state.edges[i].u][this.state.edges[i].v]=({wt:weights[i],edgeNo:i})
            ar[this.state.edges[i].v][this.state.edges[i].u]=({wt:weights[i],edgeNo:i})
        }
        let vis=[]
        for(let i=0;i<this.state.points.length;i++)
        vis[i]=false;
        let animations=[]
        let dist=[]
        parent=[]
        for(let i=0;i<this.state.points.length;i++)
        dist[i]=100000
        dist[s]=0
        parent[s]={vertex:-1,edgeNo:-1}
        animations.push({
            x:s,
            y:0,
            color:'setdist'
        })
        for(let it=0;it<this.state.points.length;it++)
        {
            let u=this.minDist(dist,vis)
            if(dist[u]===INT_MAX)
            return animations;
            vis[u]=true
            animations.push({
                x:u,
                y:-1,
                color:'confirmdist'
            })
            for(let v=0;v<this.state.points.length;v++)
            {
                if(!vis[v] && ar[u][v].wt && dist[u]+ar[u][v].wt<dist[v])
                {
                    parent[v]={vertex:u,edgeNo:ar[u][v].edgeNo}
                    dist[v]=dist[u]+ar[u][v].wt
                    animations.push({
                        x:ar[u][v].edgeNo,
                        y:-1,
                        color:'edge'
                    })
                    animations.push({
                        x:ar[u][v].edgeNo,
                        y:-1,
                        color:'shrinkEdge'
                    })
                    animations.push({
                        x:v,
                        y:dist[v],
                        color:'setdist'
                    })
                }
            }
        }
        return animations
    }

    dijkstra(s){
        if(s>=this.state.points.length)
        return
        if(s==="" && s!=='0')
        {
            alert("Enter a source vertex")
            return
        }
        for(let i=0;i<s.length;i++)
        {
            if(s[i]!=='0' && s[i]!=='1' && s[i]!=='2' && s[i]!=='3' && s[i]!=='4' && s[i]!=='5' && s[i]!=='6' && s[i]!=='7' && s[i]!=='8' && s[i]!=='9')
            {
                alert("Enter an integer as source vertex")
                return
            }
        }
        s=parseInt(s)
        const animations=this.dijkstraAnimations(s)
        let len=animations.length
        for(let i=0;i<len;i++)
        {
            if(animations[i].color==='edge'){
                let tm=setTimeout(() => {
                    let q=document.getElementById(`edge${animations[i].x}`)
                    q.style.stroke='blue'
                    q.style.strokeWidth='5'
                    }, i*delay);
                timeouts.push(tm)
            }
            else if(animations[i].color==='shrinkEdge')
            {
                let tm=setTimeout(() => {
                    let q=document.getElementById(`edge${animations[i].x}`)
                    q.style.stroke='blue'
                    q.style.strokeWidth='2'
                    }, i*delay);
                timeouts.push(tm)
            }
            else if(animations[i].color==='setdist')
            {
                let tm=setTimeout(() => {
                    let q=document.getElementById(`point${animations[i].x}`)
                    q.style.fill='blue'
                    q=document.getElementById(`dist${animations[i].x}`);
                    q.textContent=animations[i].y
                    
                }, i*delay);
                timeouts.push(tm);
            }
            else
            {
                let tm=setTimeout(() => {
                    let q=document.getElementById(`point${animations[i].x}`)
                    q.style.fill=color1
                }, i*delay);
                timeouts.push(tm);
            }
        }
        done=true
    }
    
    render() {
        var pts=this.state.points.map((x,idx)=>{
            return(
            <circle key={"point"+idx} id={"point"+idx} cx={x.x} cy={x.y} r={r} stroke="black" onClick={(event)=>this.drawLine(idx)} strokeWidth="2" style={{fill:"#000",transition:'all .2s linear',cursor:'pointer'}} onMouseOver={()=>this.showPath(idx)} onMouseOut={()=>this.removePath(idx)}/>
            )
        })
        var ptsidx=this.state.points.map((pt,idx)=>{
            return(
                <text key={"index"+idx} id={"index"+idx} fontSize="14" fontFamily="Arial" x={pt.x-4} y={pt.y+4} onClick={(event)=>this.drawLine(idx)} style={{fill:"#fff",transition:'all .2s linear',cursor:'pointer'}} onMouseOver={()=>this.showPath(idx)} onMouseOut={()=>this.removePath(idx)}>{idx}</text>
            )
        })
        var lines=this.state.edges.map((q,idx)=>{
            return(
                <line key={"edge"+idx} id={"edge"+idx} x1={this.state.points[q.u].x} y1={this.state.points[q.u].y} x2={this.state.points[q.v].x} y2={this.state.points[q.v].y} style={{stroke:'red',strokeWidth:'2',zIndex:'-1',transition:'all .2s linear'}} />
            )
        })
        var edgeWeights=this.state.edges.map((edge,idx)=>{
            return(
                <text key={"weight"+idx} id={"weight"+idx} fontSize="14" fontFamily="Arial" fill="#000" x={(this.state.points[edge.u].x+this.state.points[edge.v].x)/2.0} y={(this.state.points[edge.u].y+this.state.points[edge.v].y)/2.0} >{weights[idx]}</text>
            )
        })
        var dists=this.state.points.map((x,idx)=>{
            return(
                <text key={"dist"+idx} id={"dist"+idx} fontSize='14' fontFamily='Arial' fill='#000' x={x.x+r+2} y={x.y+r+2}>&infin;</text>
            )
        })
        
        return (
        <div className='bg'>
            <Helmet>
            <title>Dijkstra's Algorithm</title>
      </Helmet>
            <center>
            <button className="button button4" onClick={()=>this.dijkstra(this.state.src)}>Dijkstra's Algorithm</button>

            <button className="button button4" onClick={()=>this.randomWeights()}>Randomize Edge Weights</button>
            <button className="button button4" onClick={()=>this.reset()}>Reset</button>
            <button className="button button4" onClick={()=>this.clear()}>Clear Canvas</button>
            <text style={{fontFamily:'Georgia'}}>&nbsp;&nbsp;&nbsp;Source/Starting Vertex&nbsp;&nbsp;</text>
            <input type="text" id="src" value={this.state.src} style={{width:'25px'}} onChange={(e)=>this.changeSrc(e)} />
            </center>
            <center>
            <svg paintOrder='markers' ref='svg' width={window.innerWidth*.998} height={window.innerHeight*.94} style={{backgroundColor:'#BEBEEC',cursor:'crosshair'}} onClick={(event)=>this.getMousePosition(event)} >
            {
                <rect><title>1.Click to plot some points.&#13;2.Connect two points by clicking on them consecutively.&#13;3.Run the algorithm. &#13;4.Hover on any vertex to see the shortest path from the root vertex.</title></rect>
            }
            {dists}
            {edgeWeights}
            {lines}
            {pts}
            {ptsidx}
            </svg>
            </center>
        </div>
        )
    }
}

export default ShortestPath
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}