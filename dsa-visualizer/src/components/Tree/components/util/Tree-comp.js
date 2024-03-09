function Node(val) {
  this.value = val;
  this.left = null;
  this.right = null;
}

function Treecomp(rootNode) {
  this.root = null;
  this.visited = []; //keeps the sequence of the nodes in which they are visited

  if (typeof rootNode !== "undefined") {
    this.root = new Node(rootNode);
  } else {
    throw new Error("Enter valid root element. Root node can't be empty");
  }
  /*Inserts a new node to the tree. if targetnode is provided then adds the newNode to its left/right based on the value of direction
  provided as an argument and if not provided then set it as roots left or right child*/
  this.add = function(value, dir, targetNode = null) {
    const newNode = new Node(value);

    if (targetNode === null) {
      this.root[dir] = newNode;
    } else {
      const position = this.findNode(targetNode); //returns the position of the targetNode
      position[dir] = newNode;
    }
  };

  /*Recursively performs inorder traversal and updates the sequence of visited node*/
  this.inorderTraversal = function(node = this.root) {
    if (node === this.root && this.visited.length > 0) this.visited = [];
    if (node !== null) {
      this.inorderTraversal(node.left);
      this.visited.push(node.value);
      this.inorderTraversal(node.right);
    }
  };

  /*Recursively performs preorder traversal and updates the sequence of visited node*/
  this.preorderTraversal = function(node = this.root) {
    if (node === this.root && this.visited.length > 0) this.visited = [];
    if (node !== null) {
      this.visited.push(node.value);
      this.preorderTraversal(node.left);
      this.preorderTraversal(node.right);
    }
  };

  /*Recursively performs postorder traversal and updates the sequence of visited node*/
  this.postorderTraversal = function(node = this.root) {
    if (node === this.root && this.visited.length > 0) this.visited = [];
    if (node !== null) {
      this.postorderTraversal(node.left);
      this.postorderTraversal(node.right);
      this.visited.push(node.value);
    }
  };

  this.getTraversalOrder = function() {
    return this.visited;
  };

  // Helper function to find a node in the tree
  this.findNode = function(searchNode) {
    const stack = [this.root];
    while (stack.length > 0) {
      const currentNode = stack.pop();
      if (currentNode.value === searchNode) {
        return currentNode;
      }
      if (currentNode.right !== null) {
        stack.push(currentNode.right);
      }
      if (currentNode.left !== null) {
        stack.push(currentNode.left);
      }
    }
    return null;
  };
}

export default Treecomp;
