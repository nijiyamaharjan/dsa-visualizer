import React, { Component } from 'react';
import './style.css';

// Sub components
import SortChart from '../SortingSortChart';
import VisualizerControls from '../../Sortingmolecules/SortingVisualizerControls';
import ProgressBar from '../../Sortingmolecules/SortingProgressBar';
import ColorKey from '../../Sortingmolecules/SortingColorKey';

//main body for assembling component of animation and like bars,play button etc,and handles button clicks
class SortVisualizer extends Component {
  state = {
    trace: [],
    traceStep: -1,

    originalArray: [],
    array: [],
    groupA: [],
    groupB: [],
    groupC: [],
    groupD: [],
    sortedIndices: [],

    timeoutIds: [],
    playbackSpeed: 1
  };
  //updating progress of sorting on internal container
  componentDidUpdate(prevProps) {
    if (prevProps.array !== this.props.array) {
      this._reset(this.props.array);
    }
    if (prevProps.trace !== this.props.trace) {
      this.clearTimeouts();
      this.setState({ trace: this.props.trace });
    }
  }

  // Actions

  _reset = (array) => {
    this.setState({
      array,
      trace: [],
      traceStep: -1,
      groupA: [],
      groupB: [],
      groupC: [],
      groupD: [],
      sortedIndices: [],
      originalArray: [...array]
    });
  };

  //clears timeout delays for each bar using inbuild method clearTimeout()
  clearTimeouts = () => {
    this.state.timeoutIds.forEach((timeoutId) =>
      clearTimeout(timeoutId)
    );
    this.setState({ timeoutIds: [] });
  };
  //change visual state on screen accordingly as sorting progress

  _changeVisualState = (visualState) => {
    this.setState({
      array: visualState.array,
      groupA: visualState.groupA,
      groupB: visualState.groupB,
      groupC: visualState.groupC,
      groupD: visualState.groupD,
      sortedIndices: visualState.sortedIndices
    });
  };
  //play button click controls, handles: tracing progress,chaging visuals 
  run = (trace) => {
    const timeoutIds = [];
    //setting time related with shifting and sorting each individual bar
    const timer = 250 / this.state.playbackSpeed;

    // Set a timeoutId i.e delay for each sorting bar so that we can see the animation in the trace
    trace.forEach((item, i) => {
      let timeoutId = setTimeout(
        (item) => {
          this.setState(
            (prevState) => ({
              //incresing the traceStep to track the progress to be used for skip and animation control
              traceStep: prevState.traceStep + 1
            }),
            this._changeVisualState(item)
          );
        },
        //multiplying by i so the later bars have more time delay
        i * timer,
        item
      );

      timeoutIds.push(timeoutId);
    });

    // Clear timeIds upon completion
    let timeoutId = setTimeout(
      this.clearTimeouts,
      trace.length * timer
    );
    timeoutIds.push(timeoutId);

    this.setState({ timeoutIds });
  };

  pause = () => {
    this.clearTimeouts();
  };

  continue = () => {
    const trace = this.state.trace.slice(this.state.traceStep);
    this.run(trace);
  };
  //controls fror skip
  stepForward = () => {
    const trace = this.state.trace;
    const step = this.state.traceStep;
    if (step < trace.length - 1) {
      const item = trace[step + 1];
      this.setState(
        { traceStep: step + 1 },
        this._changeVisualState(item)
      );
    }
  };
  //for backward skip
  stepBackward = () => {
    const trace = this.state.trace;
    const step = this.state.traceStep;
    if (step > 0) {
      const item = trace[step - 1];
      this.setState(
        { traceStep: step - 1 },
        this._changeVisualState(item)
      );
    }
  };
  //controls for when clicked on repeat button 
  repeat = () => {
    this.clearTimeouts();
    this.setState((prevState) => ({
      array: [...prevState.originalArray],
      traceStep: -1,
      comparing: [],
      compared: [],
      sorted: []
    }));
    this.run(this.state.trace);
  };
  //handles playback speed change
  adjustPlaybackSpeed = (speed) => {
    const playing = this.state.timeoutIds.length > 0;
    this.pause();
    //number conversion of speed based on x: x stands for * when storing info sorting control
    const playbackSpeed = Number(speed.split('x')[0]);
    this.setState({ playbackSpeed }, () => {
      if (playing) this.continue();
    });
  };

  render() {
    return (
      <div className="SortVisualizer">

        <SortChart
          numbers={this.state.array}
          maxNum={Math.max(...this.state.array)}
          groupA={this.state.groupA}
          groupB={this.state.groupB}
          groupC={this.state.groupC}
          groupD={this.state.groupD}
          sortedIndices={this.state.sortedIndices}
        />



        <div className="SortVisualizer__ProgressBar">
          {/* for the status of progress of animation to change colour from gray to pink currently */}
          <ProgressBar
            width={
              this.state.trace.length > 0
                ? (this.state.traceStep /
                  (this.state.trace.length - 1)) *
                100
                : 0
            }
          />
        </div>

        <VisualizerControls
          onPlay={
            this.state.traceStep === -1
              ? this.run.bind(this, this.state.trace)
              : this.continue.bind(this)
          }
          //to ensure this points to correct object on callbacks
          onPause={this.pause.bind(this)}
          onForward={this.stepForward.bind(this)}
          onBackward={this.stepBackward.bind(this)}
          onRepeat={this.repeat.bind(this)}
          onAdjustSpeed={this.adjustPlaybackSpeed}
          playing={this.state.timeoutIds.length > 0}
          playDisabled={
            (this.state.traceStep >= this.state.trace.length - 1 &&
              this.state.traceStep !== -1) ||
            this.state.trace.length <= 0
          }
          forwardDisabled={
            this.state.traceStep >= this.state.trace.length - 1
          }
          backwardDisabled={this.state.traceStep <= 0}
          repeatDisabled={this.state.traceStep <= 0}
          playbackSpeed={this.state.playbackSpeed}
        />

        <ColorKey {...this.props.colorKey} />


      </div>
    );
  }
}

export default SortVisualizer;
