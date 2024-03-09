import React, { Component } from "react";

import TreeDiagram from "./components/TreeDiagram";
import TransitionedList from "./components/TransitionedList";
import TraversalInfo from "./components/TraversalInfo";

import Dropdown from "./components/util/Options";
import Treecomp from "./components/util/Tree-comp";

import "./styles/App.css";

class Tree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTraversal: "Select Traversal",
      traversalOrder: [], //it stores the expected sequence of node from tree structure
      list: [], //store the nodes which got displayed on list/hightlighted on tree one by one
      buttonOptions: [
        {
          id: 0,
          value: "Postorder",
          selected: false,
          key: "buttonOptions"
        },
        {
          id: 1,
          value: "Preorder",
          selected: false,
          key: "buttonOptions"
        },
        {
          id: 2,
          value: "Inorder",
          selected: false,
          key: "buttonOptions"
        }
      ],
      treeData: {
        name: "1",
        children: [
          {
            name: "3",
            children: [
              {
                name: "8"
              },
              {
                name: "11",
                children: [
                  {
                    name: "9"
                  },
                  { name: "10" }
                ]
              }
            ]
          },
          {
            name: "2",
            children: [
              {
                name: "5",
                children: [
                  {
                    name: "7"
                  },
                  { name: "6" }
                ]
              },
              {
                name: "4"
              }
            ]
          }
        ]
      }
    };

    this.state.speed = 1000;
    this.tree = new Treecomp("1");

  }

  handleSpeedChange = (speed) => {
    this.setState({ speed });
  };
  //This will build the tree data-structure with these static values
  componentDidMount() {
    this.tree.add("2", "left");
    this.tree.add("3", "right");
    this.tree.add("8", "right", "3");
    this.tree.add("11", "left", "3");
    this.tree.add("9", "right", "11");
    this.tree.add("10", "left", "11");
    this.tree.add("4", "left", "2");
    this.tree.add("5", "right", "2");
    this.tree.add("6", "left", "5");
    this.tree.add("7", "right", "5");
  }

  /*This method will display order of traversal one by one in delayed manner the "if condition" makes sure that
  if user interrupts the traversal and selectes the new one before the old one gets completed the effect of old traversal
  completely nullifies before new gets started*/

  displayList = index => {
    if (
      index === this.state.list.length &&
      index < this.state.traversalOrder.length
    ) {
      let tempList = [...this.state.list, this.state.traversalOrder[index]];
      this.setState({ list: tempList }, () => {
        setTimeout(() => {
          this.displayList(index + 1);
          this.animateTree(this.state.traversalOrder[index + 1]);
        }, this.state.speed); // Use state speed here
      });
    }
  };

  /* as soon as the displayList method is called this method is triggered too to corresponding animate the tree node
  along with the node which just got displayed on the list*/

  animateTree = value => {
    let data = this.state.treeData;
    const nodeList = [this.state.treeData];
    while (true) {
      const current = nodeList.shift();
      if (current) {
        if (current.name === value) {
          current.gProps = {
            className: "traversed-node"
          };
          data = { ...data, current };
          break;
        }
        if (current.children) {
          current.children.forEach(child => nodeList.push(child));
        }
      } else {
        break;
      }
    }
    this.setState({ treeData: data });
  };

  /*This method gets the exepected order of nodes based on the tree as user selects the traversal and updates the state*/
  updateTraversalOrder = () => {
    const { selectedTraversal } = this.state;
    if (selectedTraversal === "Inorder") {
      this.tree.inorderTraversal();
    } else if (selectedTraversal === "Preorder") {
      this.tree.preorderTraversal();
    } else if (selectedTraversal === "Postorder") {
      this.tree.postorderTraversal();
    }

    const traversalOrder = this.tree.getTraversalOrder();
    this.setState({ traversalOrder }, () => {
      this.displayList(0);
      this.animateTree(this.state.traversalOrder[0]);
    });
  };

  /*updates the state when user selectes new traversal and resets the tree and displayed list*/
  handleTraversalChange = (selectedTraversal, id, key) => {
    let temp = JSON.parse(JSON.stringify(this.state[key]));
    temp.forEach(item => (item.selected = false));
    temp[id].selected = true;
    this.setState({
      [key]: temp,
      selectedTraversal
    });
    this.resetTree();
  };

  resetTree = () => {
    this.setState(
      {
        list: [],
        traversalOrder: [],
        treeData: {
          name: "1",
          children: [
            {
              name: "3",
              children: [
                {
                  name: "8"
                },
                {
                  name: "11",
                  children: [
                    {
                      name: "9"
                    },
                    { name: "10" }
                  ]
                }
              ]
            },
            {
              name: "2",
              children: [
                {
                  name: "5",
                  children: [
                    {
                      name: "7"
                    },
                    { name: "6" }
                  ]
                },
                {
                  name: "4"
                }
              ]
            }
          ]
        }
      },
      () => {
        setTimeout(() => {
          this.updateTraversalOrder();
        }, 1000);
      }
    );
  };


  render() {
    return (
      <div className="app">
        <section className="left-container">

          <div className="tree-diagram">
            <TreeDiagram data={this.state.treeData} />
          </div>
          <div className="speed-controls mt-10 ml-10 flex gap-5 ">
            <button
              className="flex justify-center rounded-md bg-white px-3 py-2 text-lg font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:ring-purple-500 focus-visible:ring-purple-500"
              onClick={() => this.handleSpeedChange(1000)}
            >
              Slow
            </button>

            <button
              className="flex justify-center rounded-md bg-white px-3 py-2 text-lg font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:ring-purple-500 focus-visible:ring-purple-500"
              onClick={() => this.handleSpeedChange(750)}
            >
              Medium
            </button>
            <button
              className="flex justify-center rounded-md bg-white px-3 py-2 text-lg font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:ring-purple-500 focus-visible:ring-purple-500"
              onClick={() => this.handleSpeedChange(500)}
            >
              Fast
            </button>

          </div>
          <span className="subtitle">-------------------------------------ORDER OF TRAVERSAL-------------------------------</span>
          <div className="transition-list">
            <TransitionedList list={this.state.list} />
          </div>
        </section>
        <section className="right-container">
          <div className="Dropdown">
            <Dropdown
              title={this.state.selectedTraversal}
              handleTraversalChange={this.handleTraversalChange}
              options={this.state.buttonOptions}
            />
          </div>
          <div className="traversal-info">
            <TraversalInfo selectedTraversal={this.state.selectedTraversal} />
          </div>

        </section>
      </div>
    );
  }
}


export default Tree;
