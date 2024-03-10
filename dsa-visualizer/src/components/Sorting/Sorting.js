import React, { Component } from 'react';
import './Sorting.css';


import SortingControls from '../Sorting/SortingComponents/Sortingmolecules/SortingControls';
import TopBar from '../Sorting/SortingComponents/Sortingorganisms/SortingTopBar';
//import SortingDrawer from '../Sorting/SortingComponents/Sortingorganisms/SortingDrawer';
import SortVisualizer from '../Sorting/SortingComponents/Sortingorganisms/SortingSortVisualizer';


import BubbleSort, {
    BubbleSortKey,
    BubbleSortDesc
} from '../Sorting/SortingAlgorithms/BubbleSort';
import SelectionSort, {
    SelectionSortKey,
    SelectionSortDesc
} from '../Sorting/SortingAlgorithms/SelectionSort';
import InsertionSort, {
    InsertionSortKey,
    InsertionSortDesc
} from '../Sorting/SortingAlgorithms/InsertionSort';


class Sorting extends Component {
    //main state of the sorting page consisting of array,size ,algorithm selsected
    //at first kept to null, size to 10,dropdown button closed
    state = {

        array: [],
        arraySize: 10,
        trace: [],
        algorithm: null,
        sortingDrawerOpen: false
    };

    ALGORITHM = {
        'Bubble Sort': BubbleSort,
        'Selection Sort': SelectionSort,
        'Insertion Sort': InsertionSort,

    };

    ALGORITHM_KEY = {
        'Bubble Sort': BubbleSortKey,
        'Selection Sort': SelectionSortKey,
        'Insertion Sort': InsertionSortKey,

    };


    componentDidMount() {
        //generated new random array on every refresh
        this.generateRandomArray();
    }

    generateRandomArray = () => {
        // Generate pseudo-random number between 1 and max
        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max)) + 1;
        }

        // Generate an array of length max
        const array = Array(this.state.arraySize)
            .fill(0)
            .map(() => getRandomInt(this.state.arraySize * 5));

        this.setState(
            //sets the generated array and also updates according to the play progress
            {
                array,
                trace: []
            },
            this.createTrace
        );
    };

    //gives the algorithm value when changed and generated new random array every 
    //time algortihm has been changed
    handleAlgorithmChange = (algorithm) => {
        this.setState({ algorithm }, this.generateRandomArray);
    };

    //when size of array is changed it changes the state data and ensures that 
    //size doesn't get out of range from 0 to 100
    handleArraySizeChange = (size) => {
        size = Number(size);
        size = size > 100 ? 100 : size;
        size = size < 0 ? 0 : size;
        this.setState({ arraySize: size }, this.generateRandomArray);
    };
    //updates the array, the algorithm accordingly as play progress
    createTrace = () => {
        const numbers = [...this.state.array];
        const sort = this.ALGORITHM[this.state.algorithm];
        if (sort) {
            const trace = sort(numbers);
            this.setState({ trace });
        }
    };


    toggleSortingDrawer = () => {
        this.setState((prevState) => ({
            sortingDrawerOpen: !prevState.sortingDrawerOpen
        }));
    };

    render() {

        //for css labelling Sorting and sorting modal open(for when the drop down opens) for responsiveness
        let theme = `Sorting`;

        if (this.state.sortingDrawerOpen) theme += ` Sorting_modal_open`;

        //sets colour theme according to algorithm chosen to be passed to sorting visualizer component
        const colorKey = this.ALGORITHM_KEY[this.state.algorithm];


        const controls = (
            //event handling from when bottons clicked
            <SortingControls
                onGenerateRandomArray={this.generateRandomArray}
                algorithm={this.state.algorithm}
                onAlgorithmChange={this.handleAlgorithmChange}
                arraySize={this.state.arraySize}
                onArraySizeChange={this.handleArraySizeChange}

            />
        );

        return (
            //theme for responsiveness to contrl css divs
            <div className={theme}>
                <TopBar
                    drawerOpen={this.state.sortingDrawerOpen}
                    toggleDrawer={this.toggleSortingDrawer}
                >
                    {controls}
                </TopBar>

                {/* <SortingDrawer
                    open={this.state.sortingDrawerOpen}
                    closeDrawer={this.toggleSortingDrawer}
                >
                    {controls}
                </SortingDrawer> */}

                <div className="Sorting__Body">
                    {/* main body of sorting algorithm i.e. the video controls nad bars */}
                    <SortVisualizer
                        array={this.state.array}
                        trace={this.state.trace}
                        colorKey={colorKey}

                    />
                </div>

            </div>
        );
    }
}

export default Sorting;
