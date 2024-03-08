// import React, { Component } from 'react'
// import { Helmet } from 'react-helmet';
// import './graph.css'
// let v1=null,v2=null
// let adj=[]
// var delay=500
// let weights=[]
// var r=14
// var INT_MAX=100000
// let parent=[]
// let color1='rgb(0, 204, 0)';
// let done=false
// let timeouts=[]
// export class MST extends Component {
//     constructor(props) {
//         super(props)
    
//         this.state = {
//              points:[],
//              edges:[]
//         }
//     }

//     componentDidMount(){
// //        this.generateRandomGraph()
//     }
//     randomWeights(){
//         for(let i=0;i<this.state.edges.length;i++)
//         weights[i]=getRandomInt(1,50);
//         this.reset()
//         this.forceUpdate();
//     }
//     addWeights()
//     {
//         weights.push(getRandomInt(1,50))
//         this.forceUpdate()
//     }
//     getMousePosition(event)
//     {
//         this.reset()
//         done=false
//         let x = event.clientX-this.refs.svg.getBoundingClientRect().left
//         let y = event.clientY-this.refs.svg.getBoundingClientRect().top
//         for(let i=0;i<this.state.points.length;i++)
//         {
//             let x1=this.state.points[i].x;
//             let y1=this.state.points[i].y;
//             let dist=(x-x1)*(x-x1)+(y-y1)*(y-y1);
//             if(dist<=1000)
//                 return false;
//         }
//         this.setState((prev)=>{
//             points:prev.points.push({x:x,y:y})
//         },function(){
//             adj.push([])
//         })
//         this.forceUpdate();
//     }

//     drawLine(idx){
//         this.reset()
//         done=false
//         let u=document.getElementById(`point${idx}`);
//         u.style.fill='red';
//         if(v1===null)
//         v1=idx;
//         else {
//             v2=idx;
//             u=document.getElementById(`point${v1}`)
//             u.style.fill='#000'
//             u=document.getElementById(`point${v2}`)
//             u.style.fill='#000'
//             for(let i=0;i<this.state.edges.length;i++)
//             {
//                 if(this.state.edges[i].u===v1 && this.state.edges[i].v===v2)
//                 {   v1=null
//                     v2=null
//                     return;
//                 }
//                 else if(this.state.edges[i].u===v2 && this.state.edges[i].v===v1)
//                 {
//                     v1=null
//                     v2=null
//                     return
//                 }
//             }
//             if(v1===v2)
//             {
//                 v1=null
//                 v2=null
//                 return
//             }
//             this.setState((prev)=>{
//                 edges:prev.edges.push({
//                     u:v1,
//                     v:v2
//                 })
//             },function(){
//                 this.addWeights()
//                 adj[v1].push({vertex:v2,edgeNo:this.state.edges.length-1})
//                 adj[v2].push({vertex:v1,edgeNo:this.state.edges.length-1})
//                 v1=null
//                 v2=null
//             })
//             this.forceUpdate()
//         }
//     }

//     reset(){
//         done=false
//         for(let i=0;i<this.state.points.length;i++){
//             if(document.getElementById(`point${i}`).style.fill!=='red')
//             document.getElementById(`point${i}`).style.fill='#000'
//         }
//         for(let i=0;i<this.state.edges.length;i++)
//         {
//             document.getElementById(`edge${i}`).style.stroke='red'
//             document.getElementById(`weight${i}`).style.fill='black'
//         }
//         parent=[]
//         this.forceUpdate();
//     }
//     clear(){
//         done=false
//         this.setState({
//             points:[],
//             edges:[]
//         },function(){
//             v1=null
//             v2=null
//             adj=[]
//             weights=[]
//             parent=[]
//         })
//         this.forceUpdate();
//     }

//     //KRUSKAL'S MST
//     root(ar,x){
//         let j=x
//         while(ar[x]!=x)
//         {
//             x=ar[x]
//         }
//         ar[j]=x
//         return x
//     }
//     join(ar,size,a,b){
//         let ra=this.root(ar,a)
//         let rb=this.root(ar,b)
//         if(ra==rb) return
//         if(size[ra]<size[rb]){
//             size[rb]+=size[ra]
//             ar[ra]=rb
//         }
//         else{
//             size[ra]+=size[rb]
//             ar[rb]=ra
//         }
//     }
//     kruskalAnimations(){
//         this.reset()
//         let ar=[]
//         //forming triplets
//         for(let i=0;i<this.state.edges.length;i++)
//         {
//             ar.push({
//                 u:this.state.edges[i].u,
//                 v:this.state.edges[i].v,
//                 edge:{
//                     wt:weights[i],
//                     number:i
//                 }
//             })
//         }
//         ar.sort(function(a,b){
//             return a.edge.wt-b.edge.wt
//         })
//         let vis=[]
//         for(let i=0;i<this.state.points.length;i++)
//         vis[i]=false;
//         let animations=[]
//         let arr=[]
//         let size=[]
//         for(let i=0;i<this.state.points.length;i++)
//         {
//             arr[i]=i
//             size[i]=1
//         }
//         for(let it=0;it<ar.length;it++)
//         {
//             animations.push({
//                 edge:ar[it].edge.number,
//                 x:-1,
//                 y:-1,
//                 color:'test'
//             })
//             if(this.root(arr,ar[it].u)===this.root(arr,ar[it].v)){
//                 animations.push({
//                     edge:ar[it].edge.number,
//                     x:-1,
//                     y:-1,
//                     color:'excluded'
//                 })
//                 continue
//             }
//             this.join(arr,size,ar[it].u,ar[it].v)
//             animations.push({
//                 edge:ar[it].edge.number,
//                 x:ar[it].u,
//                 y:ar[it].v,
//                 color:'included'
//             })
//         }
//         let rt=this.root(arr,0)
//         for(let i=0;i<this.state.points.length;i++)
//         if(rt!==this.root(arr,i)) {
//             alert(`${i} ${arr[i]} ${rt}`)
//             return []
//         }
//         return animations
//     }

//     kruskal(){
//         this.reset()
//         if(this.state.points.length===0) return
//         if(this.state.points.length===1)
//         {
//             document.getElementById(`point${0}`).style.fill=color1
//             return
//         }
//         const animations=this.kruskalAnimations()
//         let len=animations.length
//         for(let i=0;i<len;i++)
//         {
//             if(animations[i].color==='test'){
//                 let tm=setTimeout(() => {
//                     let q=document.getElementById(`edge${animations[i].edge}`)
//                     q.style.stroke='blue'
//                     q.style.strokeWidth='5'
//                     }, i*delay)
//                 timeouts.push(tm)
//             }
//             else if(animations[i].color==='excluded')
//             {
//                 let tm=setTimeout(() => {
//                     let q=document.getElementById(`edge${animations[i].edge}`)
//                     q.style.stroke='#bfbfbf'
//                     q.style.strokeWidth='2'
//                     document.getElementById(`weight${animations[i].edge}`).style.fill='#bfbfbf'
//                 }, i*delay)
//                 timeouts.push(tm)
//             }
//             else
//             {
//                 let tm=setTimeout(() => {
//                     let q=document.getElementById(`edge${animations[i].edge}`)
//                     q.style.stroke=color1
//                     q.style.strokeWidth='2'
//                     document.getElementById(`point${animations[i].x}`).style.fill=color1
//                     document.getElementById(`point${animations[i].y}`).style.fill=color1
//                 }, i*delay)
//                 timeouts.push(tm)
//             }
//         }
//         done=true
//     }
//     render() {
//         var pts=this.state.points.map((x,idx)=>{
//             return(
//             <circle key={"point"+idx} id={"point"+idx} cx={x.x} cy={x.y} r={r} stroke="black" onClick={(event)=>this.drawLine(idx)} strokeWidth="1.5" style={{fill:"#000",transition:'all .2s linear',cursor:'pointer'}}/>
//             )
//         })
//         var ptsidx=this.state.points.map((pt,idx)=>{
//             return(
//                 <text key={"index"+idx} id={"index"+idx} fontSize="14" fontFamily="Arial" x={pt.x-4} y={pt.y+4} onClick={(event)=>this.drawLine(idx)} style={{fill:"#fff",transition:'all .2s linear',cursor:'pointer'}} >{idx}</text>
//             )
//         })
//         var lines=this.state.edges.map((q,idx)=>{
//             return(
//                 <line key={"edge"+idx} id={"edge"+idx} x1={this.state.points[q.u].x} y1={this.state.points[q.u].y} x2={this.state.points[q.v].x} y2={this.state.points[q.v].y} style={{stroke:'red',strokeWidth:'2',zIndex:'-1',transition:'all .2s linear'}} />
//             )
//         })
//         var edgeWeights=this.state.edges.map((edge,idx)=>{
//             return(
//                 <text key={"weight"+idx} id={"weight"+idx} fontSize="14" fontFamily="Arial" fill="#000" x={(this.state.points[edge.u].x+this.state.points[edge.v].x)/2.0} y={(this.state.points[edge.u].y+this.state.points[edge.v].y)/2.0} >{weights[idx]}</text>
//             )
//         })
        
//         return (
//         <div>
//             <Helmet>
//         <title>Kruskal's Algoriithm</title>
//       </Helmet>
//             <center>
//             <h3>Kruskal's Minimal Spanning Tree Algoriithm</h3>
//             <button className="button button4" onClick={()=>this.kruskal()}>Kruskal's Algorithm</button>
//             <button className="button button4" onClick={()=>this.randomWeights()}>Randomize edge weights</button>
//             <button className="button button4" onClick={()=>this.reset()}>Reset</button>
//             <button className="button button4" onClick={()=>this.clear()}>Clear Canvas</button>
//             </center>
//             <center>
//             <svg paintOrder='markers' ref='svg' width={window.innerWidth*.995} height={window.innerHeight*.88} style={{border:'2px solid black',backgroundColor:'#dddddd',cursor:'crosshair'}} onClick={(event)=>this.getMousePosition(event)}>
//             <rect>
//             <title>
//             1.Click to plot some points.&#13;2.Connect two points by clicking on them consecutively.&#13;3.Run the algo and Enjoy!!!
//             </title>
//             </rect>
//             {edgeWeights}
//             {lines}
//             {pts}
//             {ptsidx}
//             </svg>
//             </center>
//         </div>
//         )
//     }
// }

// export default MST
// function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }