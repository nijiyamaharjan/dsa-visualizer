import React from "react";

const displayInfo = traversal => {
  const info = {
    Inorder: `1. Traverse the left subtree i.e. call Inorder(left-subtree)\n\n2. Visit the Node \n\n 3. Traverse the right subtree i.e. call Inorder(right-subtree)`,
    Preorder: `1. Visit the Node \n\n 2. Traverse the left subtree i.e. call Preorder(left-subtree) \n\n 3. Traverse the right subtree i.e. call Preorder(right-subtree)`,
    Postorder: `1. Traverse the left subtree i.e. call Postorder(left-subtree) \n\n 2. Traverse the right subtree i.e. call Postorder(right-subtree) \n\n 3. Visit the Node`,
    Levelorder: `1. Create an empty queue \n\n 2. temp_node = root \n\n 3. Loop while temp_node is not null \n\n - print value of temp_node \n\n - Enqueue temp_node's children to Enqueue \n\n - Dequeue a node from queue and assign its value to temp_node`
  };

  return info[traversal];
};

const TraversalInfo = props => {
  const { selectedTraversal: traversal } = props;
  return (
    <div className="glass-morphed-box bg-white bg-opacity-30 backdrop-blur-md text-gray-800 min-h-1/2 w-full box-border m-10 p-5 text-base rounded-md shadow-md">
      <div className="text-center">
        {traversal !== "Select Traversal" ? (
          <span className="info-header text-2xl pb-5 font-bold">{traversal} Traversal</span>
        ) : (
          <span className="info-header text-2xl pb-5 font-bold">Choose any traversal</span>
        )}
        <div className="display-linebreak whitespace-pre-line pl-5 leading-17">{displayInfo(traversal)}</div>
      </div>
    </div>
  );
};

export default TraversalInfo;
