const { useState, useEffect, useCallback, useRef } = React;
const { createRoot } = ReactDOM;

const config = {
  initNumBars: 4,
  PRIMARY_COLOR: "#03FC8C",
  SECONDARY_COLOR: "#5343FF",
};

const algorithms = {
  "Bubble Sort": (arr) => getBubbleSortLL(arr),
  "Selection Sort": (arr) => getSelectionSortLL(arr),
  "Insertion Sort": (arr) => getInsertionSortLL(arr),
};

const root = createRoot(document.getElementById("root"));
root.render(<Main />);

function Main() {
  const barsRef = useRef([]);
  const mainRef = useRef(null);

  const [numBars, setNumBars] = useState(config.initNumBars);
  const [arr, setArr] = useState(getRandomArr(numBars));
  const arrRef = useRef(arr);

  const setArrState = (newArr) => {
    setArr(newArr);
    arrRef.current = newArr;
  };

  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  const setRunState = (newRun) => {
    setRunning(newRun);
    runningRef.current = newRun;
  };

  const [barWidth, setBarWidth] = useState(0);
  const [boardHeight, setBoardHeight] = useState(0);

  let [animTime, setAnimTime] = useState(1000);
  const animTimeRef = useRef(animTime);
  animTimeRef.current = animTime;

  const setAnimTimeState = (newTime) => {
    setAnimTime(newTime);
    animTimeRef.current = newTime;
  };

  const [sortingAlg, setSortingAlg] = useState(null);
  const sortingAlgRef = useRef(sortingAlg);
  sortingAlgRef.current = sortingAlg;

  const setSortingAlgState = (newAlg) => {
    setSortingAlg(newAlg);
    sortingAlgRef.current = newAlg;
  };

  useEffect(() => {
    setBarWidth(parseInt(mainRef.current.offsetWidth / (numBars + 1)));
    setBoardHeight(mainRef.current.offsetHeight);
    barsRef.current = barsRef.current.slice(0, numBars);
  }, []);

  function getBarHeight(height) {
    let max = arr.reduce(function (a, b) {
      return Math.max(a, b);
    });
    return (height / max) * boardHeight;
  }

  const runSimulation = useCallback(
    (node) => {
      if (!runningRef.current || node == null) {
        setRunState(false);
        return;
      }

      let idx1 = node.a;
      let idx2 = node.b;
      let shouldSwap = node.swap;

      barsRef.current[idx1].style.backgroundColor = config.SECONDARY_COLOR;
      barsRef.current[idx2].style.backgroundColor = config.SECONDARY_COLOR;

      setTimeout(() => {
        barsRef.current[idx1].style.backgroundColor = config.PRIMARY_COLOR;
        barsRef.current[idx2].style.backgroundColor = config.PRIMARY_COLOR;

        let updatedArr = getUpdatedArr(idx1, idx2, shouldSwap);
        setArrState(updatedArr);
        runSimulation(node.next);
      }, animTimeRef.current);
    },
    [animTimeRef.current]
  );

  function toggleRunning() {
    if (!runningRef.current && sortingAlgRef.current === null) {
      alert("Chose a sorting algorithm");
      return;
    }
    setRunState(!running);

    let tempArrCopy = Array.from(arrRef.current);
    let algo = sortingAlgRef.current;

    let LL = algorithms[algo](tempArrCopy);
    runSimulation(LL);
  }

  function randomizeArr() {
    setRunState(false);
    const randomArr = getRandomArr(numBars);
    setArrState(randomArr);
  }

  function changeBarCount(cnt) {
    setNumBars(cnt);
    randomizeArr();
  }

  const getUpdatedArr = (i, j, shouldSwap) => {
    let temp = Array.from(arrRef.current);
    if (shouldSwap) {
      swapEles(temp, i, j);
    }
    return temp;
  };

  return (
    <>
      <div id="settings-dock">
        <button className="btn" onClick={toggleRunning}>
          {running ? "Pause" : "Play"}
        </button>
        <button className="btn" onClick={randomizeArr}>
          Randomize
        </button>
        <div className="slider-container">
          <label htmlFor="animSlider">
            Time before swap: {animTime / 1000}s
          </label>
          <input
            type="range"
            min="0"
            max="5000"
            value={animTime}
            className="slider"
            step={100}
            id="animSlider"
            onChange={(event) => setAnimTimeState(event.target.value)}
          ></input>
        </div>
        <div className="slider-container">
          <label htmlFor="numBarsSlider">Number of bars: {numBars}</label>
          <input
            type="range"
            min="4"
            max="100"
            value={numBars}
            className="slider"
            id="numBarsSlider"
            onChange={(event) => changeBarCount(event.target.value)}
          ></input>
        </div>
        <Dropdown
          changeState={(newState) => {
            setSortingAlgState(newState);
          }}
        />
      </div>
      <div ref={mainRef} id="main">
        {arr.map((val, i) => (
          <div
            className="bar"
            ref={(ele) => (barsRef.current[i] = ele)}
            key={i}
            style={{
              backgroundColor: config.PRIMARY_COLOR,
              width: `${barWidth}px`,
              height: `${getBarHeight(val)}px`,
            }}
          ></div>
        ))}
      </div>
    </>
  );
}

function Dropdown({ changeState }) {
  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(algorithms);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (label) => {
    selectedItem == label ? setSelectedItem(null) : setSelectedItem(label);
    changeState(label);
    toggleDropdown();
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedItem ? selectedItem : "Select an Algorithm "}
        <i className={`fa fa-chevron-right icon ${isOpen && "open"}`}></i>
      </div>
      <div className={`dropdown-body ${isOpen && "open"}`}>
        {Object.keys(items).map((label, index) => (
          <div key={index}>
            <div
              className="dropdown-item"
              onClick={() => handleItemClick(label)}
            >
              <span
                className={`dropdown-item-dot ${
                  label == selectedItem && "selected"
                }`}
              >
                •{" "}
              </span>
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
