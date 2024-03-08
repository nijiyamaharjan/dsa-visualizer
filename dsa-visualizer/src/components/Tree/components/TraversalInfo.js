import React from "react";

const displayInfo = traversal => {
  const info = {
    Inorder: `1. Traverse the left subtree i.e. call Inorder(left-subtree)\n\n2. Visit the Node \n\n 3. Traverse the right subtree i.e. call Inorder(right-subtree)`,
    Preorder: `1. Visit the Node \n\n 2. Traverse the left subtree i.e. call Preorder(left-subtree) \n\n 3. Traverse the right subtree i.e. call Preorder(right-subtree)`,
    Postorder: `1. Traverse the left subtree i.e. call Postorder(left-subtree) \n\n 2. Traverse the right subtree i.e. call Postorder(right-subtree) \n\n 3. Visit the Node`,
  };

  return info[traversal];
};

const TraversalInfo = props => {
  const { selectedTraversal: traversal } = props;
  const info = displayInfo(traversal);

  return (
    <div className="glass-morphed-box bg-white bg-opacity-30 backdrop-blur-md text-white h-96 w-full box-border m-5 text-l rounded-md shadow-md flex justify-center items-center">
      <div className="text-center">
        {traversal !== "Select Traversal" ? (
          <span className="info-header text-3xl pb-15 font-bold text-white">{traversal} Traversal</span>
        ) : (
          <span className="info-header text-3xl pb-5 font-bold text-white">Choose any traversal</span>
        )}
        <div className="display-linebreak whitespace-pre-line pl-5 mt-10 leading-17 text-white text-lg">{info}</div>
      </div>
    </div>
  );
};

export default TraversalInfo;
