/*A tree data-structure which create a static binary tree
This is used to get expected traversal order given the tree structure
*/

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
      const position = this.Traversal(targetNode); //returns the position of the targetNode
      position[dir] = newNode;
    }
  };

  /*performs level order traversal. If given any node as an argument then return that node's position else
  updates the sequence of the visited nodes*/
  this.Traversal = function(searchNode = -1) {
    const queue = [];
    let currentNode = this.root;
    queue.push(currentNode);
    if (this.visited.length > 0) this.visited = [];
    while (queue.length > 0) {
      currentNode = queue.shift();
      if (currentNode !== null) {
        if (searchNode === -1) {
          this.visited.push(currentNode.value);
        }
        if (currentNode.value === searchNode && searchNode !== -1) {
          return currentNode;
        }
        if (currentNode.left !== null) {
          queue.push(currentNode.left);
        }
        if (currentNode.right !== null) {
          queue.push(currentNode.right);
        }
      }
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
}

export default Treecomp;
