import React from "react";
import { Tree } from "react-tree-graph";
import 'react-tree-graph/dist/style.css';

const TreeDiagram = props => {
  return (
    <div>
      <Tree
        data={props.data}
        height={550}
        width={450}
        nodeShape="circle"
        svgProps={{
          transform: "rotate(90)",
          viewBox: "-50 -10 400 400",
        }}
        textProps={{
          transform: "rotate(-90)",
          x: "-10",
          y: "2"
        }}
        nodeSize={{ x: 100, y: 100 }} // increase the radius of the circle
      />
    </div>
  );
};

export default TreeDiagram;
