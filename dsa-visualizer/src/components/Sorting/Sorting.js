import React, { Component } from 'react';
import './Sorting.css';
import './SortingDark.css';

import SortingControls from '../Sorting/SortingComponents/Sortingmolecules/SortingControls';
import TopBar from '../Sorting/SortingComponents/Sortingorganisms/SortingTopBar';
import SortingDrawer from '../Sorting/SortingComponents/Sortingorganisms/SortingDrawer';
import SortVisualizer from '../Sorting/SortingComponents/Sortingorganisms/SortingSortVisualizer';
import Footer from '../Sorting/SortingComponents/Sortingmolecules/SortingFooter';

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
import MergeSort, {
    MergeSortKey,
    MergeSortDesc
} from '../Sorting/SortingAlgorithms/MergeSort';
import QuickSort, {
    QuickSortKey,
    QuickSortDesc
} from '../Sorting/SortingAlgorithms/QuickSort';
import QuickSort3, {
    QuickSort3Key,
    QuickSort3Desc
} from '../Sorting/SortingAlgorithms/QuickSort3';
import HeapSort, {
    HeapSortKey,
    HeapSortDesc
} from '../Sorting/SortingAlgorithms/HeapSort';
import ShellSort, {
    ShellSortKey,
    ShellSortDesc
} from '../Sorting/SortingAlgorithms/ShellSort';

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
        'Merge Sort': MergeSort,
        'Quick Sort': QuickSort,
        'Quick Sort 3': QuickSort3,
        'Heap Sort': HeapSort,
        'Shell Sort': ShellSort
    };

    ALGORITHM_KEY = {
        'Bubble Sort': BubbleSortKey,
        'Selection Sort': SelectionSortKey,
        'Insertion Sort': InsertionSortKey,
        'Merge Sort': MergeSortKey,
        'Quick Sort': QuickSortKey,
        'Quick Sort 3': QuickSort3Key,
        'Heap Sort': HeapSortKey,
        'Shell Sort': ShellSortKey
    };

    ALGORITHM_DESC = {
        'Bubble Sort': BubbleSortDesc,
        'Selection Sort': SelectionSortDesc,
        'Insertion Sort': InsertionSortDesc,
        'Merge Sort': MergeSortDesc,
        'Quick Sort': QuickSortDesc,
        'Quick Sort 3': QuickSort3Desc,
        'Heap Sort': HeapSortDesc,
        'Shell Sort': ShellSortDesc
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

    /*toggleDarkMode = () => {
        this.setState((prevState) => ({ darkMode: !prevState.darkMode }));
    };*/

    toggleSortingDrawer = () => {
        this.setState((prevState) => ({
            sortingDrawerOpen: !prevState.sortingDrawerOpen
        }));
    };

    render() {
        let theme = `Sorting`;
        /* if (this.state.darkMode) theme += ` Sorting_dark`;*/
        if (this.state.sortingDrawerOpen) theme += ` Sorting_modal_open`;

        const colorKey = this.ALGORITHM_KEY[this.state.algorithm];
        const desc = this.ALGORITHM_DESC[this.state.algorithm];

        const controls = (
            <SortingControls
                onGenerateRandomArray={this.generateRandomArray}
                algorithm={this.state.algorithm}
                onAlgorithmChange={this.handleAlgorithmChange}
                arraySize={this.state.arraySize}
                onArraySizeChange={this.handleArraySizeChange}
            /* onToggleDarkMode={this.toggleDarkMode}
             darkMode={this.state.darkMode}*/
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

                <main className="Sorting__Body">
                    <SortVisualizer
                        array={this.state.array}
                        trace={this.state.trace}
                        colorKey={colorKey}
                        desc={desc}
                    />
                </main>
                <Footer />
            </div>
        );
    }
}

export default Sorting;
