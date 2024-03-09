import React from "react";
import { Tree } from "react-tree-graph";
import 'react-tree-graph/dist/style.css';

const TreeDiagram = props => {
  return (
    <div>
      <Tree
        data={props.data}
        height={450}
        width={450}
        nodeShape="circle"
        svgProps={{
          transform: "rotate(90)",
          viewBox: "-150 -1 500 500",
        }}
        textProps={{
          transform: "rotate(-90)",
          x: "-10",
          y: "2"
        }}
      />
    </div>
  );
};

export default TreeDiagram;
