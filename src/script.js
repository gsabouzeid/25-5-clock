const App = () => {
  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionLength, setSessionLength] = React.useState(25);
  const [timeLeft, setTimeLeft] = React.useState("25:00");
  const [running, setRunning] = React.useState(false);
  const [onBreak, setOnBreak] = React.useState(false);

  React.useEffect(() => {
    let timer;
    if (running && !onBreak) {
      let totalSeconds;
      if (timeLeft === "00:00") {
        const sessionTime = sessionLength + ":00";
        let timeList = sessionTime.split(":");
        totalSeconds = parseInt(timeList[0]) * 60 + parseInt(timeList[1]);
      } else {
        let timeList = timeLeft.split(":");
        totalSeconds = parseInt(timeList[0]) * 60 + parseInt(timeList[1]) - 1;
      }
      timer = setInterval(() => {
        let minutes = parseInt(totalSeconds / 60, 10);
        let seconds = parseInt(totalSeconds % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        setTimeLeft(minutes + ":" + seconds);
        if (--totalSeconds < 0) {
          clearInterval(timer);
          setOnBreak(true);
          const audioClip = document.getElementById("beep");
          audioClip.play();
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [running, onBreak]);

  React.useEffect(() => {
    let timer;
    if (running && onBreak) {
      let totalSeconds;
      if (timeLeft === "00:00") {
        const breakTime = breakLength + ":00";
        let timeList = breakTime.split(":");
        totalSeconds = parseInt(timeList[0]) * 60 + parseInt(timeList[1]);
      } else {
        let timeList = timeLeft.split(":");
        totalSeconds = parseInt(timeList[0]) * 60 + parseInt(timeList[1]) - 1;
      }
      timer = setInterval(() => {
        let minutes = parseInt(totalSeconds / 60, 10);
        let seconds = parseInt(totalSeconds % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        setTimeLeft(minutes + ":" + seconds);
        if (--totalSeconds < 0) {
          clearInterval(timer);
          setOnBreak(false);
          const audioClip = document.getElementById("beep");
          audioClip.play();
        }
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [running, onBreak]);

  const handleReset = () => {
    setRunning(false);
    setOnBreak(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft("25:00");

    const audioClip = document.getElementById("beep");
    audioClip.pause();
    audioClip.currentTime = 0;
  };

  return (
    <div id="timer-container">
      <h1>25 + 5 Clock</h1>
      <div id="control-container">
        <div id="break-container">
          <h3 id="break-label">Break Length</h3>
          <h3 id="break-length">{breakLength}</h3>
          <button
            id="break-increment"
            onClick={() => {
              if (breakLength < 60 && !running) {
                setBreakLength((prevBreakLength) => prevBreakLength + 1);
              }
            }}
          >
            Up
          </button>
          <button
            id="break-decrement"
            onClick={() => {
              if (breakLength > 1 && !running) {
                setBreakLength((prevBreakLength) => prevBreakLength - 1);
              }
            }}
          >
            Down
          </button>
        </div>
        <div id="session-container">
          <h3 id="session-label">Session Length</h3>
          <h3 id="session-length">{sessionLength}</h3>
          <button
            id="session-increment"
            onClick={() => {
              if (sessionLength + 1 <= 60 && !running) {
                if (sessionLength + 1 < 10) {
                  setTimeLeft(`0${sessionLength + 1}:00`);
                } else {
                  setTimeLeft(`${sessionLength + 1}:00`);
                }
                setSessionLength((prevSessionLength) => prevSessionLength + 1);
              }
            }}
          >
            Up
          </button>
          <button
            id="session-decrement"
            onClick={() => {
              if (sessionLength - 1 > 0 && !running) {
                if (sessionLength - 1 < 10) {
                  setTimeLeft(`0${sessionLength - 1}:00`);
                } else {
                  setTimeLeft(`${sessionLength - 1}:00`);
                }
                setSessionLength((prevSessionLength) => prevSessionLength - 1);
              }
            }}
          >
            Down
          </button>
        </div>
      </div>
      <div id="countdown-container">
        <h2 id="timer-label">{onBreak ? "Break" : "Session"}</h2>
        <h1 id="time-left">{timeLeft}</h1>
        <button
          id="start_stop"
          onClick={() => setRunning((prevRunning) => !prevRunning)}
        >
          Start/Stop
        </button>
        <button id="reset" onClick={handleReset}>
          Reset
        </button>
      </div>
      <audio
        id="beep"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
