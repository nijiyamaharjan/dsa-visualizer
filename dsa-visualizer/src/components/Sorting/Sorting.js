import React, { Component } from 'react';
import './Sorting.css';
import './SortingDark.css';

import SortingControls from '../Sorting/SortingComponents/Sortingmolecules/SortingControls';
import TopBar from '../Sorting/SortingComponents/Sortingorganisms/SortingTopBar';
import SortingDrawer from '../Sorting/SortingComponents/Sortingorganisms/SortingDrawer';
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
    state = {
        /* darkMode: false,*/
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

    ALGORITHM_DESC = {
        'Bubble Sort': BubbleSortDesc,
        'Selection Sort': SelectionSortDesc,
        'Insertion Sort': InsertionSortDesc,

    };
    componentDidMount() {
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
            {
                array,
                trace: []
            },
            this.createTrace
        );
    };

    handleAlgorithmChange = (algorithm) => {
        this.setState({ algorithm }, this.generateRandomArray);
    };

    handleArraySizeChange = (size) => {
        size = Number(size);
        size = size > 100 ? 100 : size;
        size = size < 0 ? 0 : size;
        this.setState({ arraySize: size }, this.generateRandomArray);
    };

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
        let theme = `Sorting`;

        if (this.state.sortingDrawerOpen) theme += ` Sorting_modal_open`;

        const colorKey = this.ALGORITHM_KEY[this.state.algorithm];


        const controls = (
            <SortingControls
                onGenerateRandomArray={this.generateRandomArray}
                algorithm={this.state.algorithm}
                onAlgorithmChange={this.handleAlgorithmChange}
                arraySize={this.state.arraySize}
                onArraySizeChange={this.handleArraySizeChange}

            />
        );

        return (
            <div className={theme}>
                <TopBar
                    drawerOpen={this.state.sortingDrawerOpen}
                    toggleDrawer={this.toggleSortingDrawer}
                >
                    {controls}
                </TopBar>

                <SortingDrawer
                    open={this.state.sortingDrawerOpen}
                    closeDrawer={this.toggleSortingDrawer}
                >
                    {controls}
                </SortingDrawer>

                <div className="Sorting__Body">
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
