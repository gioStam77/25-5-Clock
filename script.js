const ACTIONS = {
  ADD: "add",
  CUT: "cut",
  ADD_SESS: "addSession",
  CUT_SESS: "cutSession",
  CUT_SECONDS: "cutSeconds",
  RESET: "reset",
  PLAY: "play",
  PAUSE: "pause" };


const formatTime = time => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  return (minutes < 10 ? "0" + minutes : minutes) +
  ":" + (
  seconds < 10 ? "0" + seconds : seconds);

};

const initialState = {
  breakLength: 5,
  sessionLength: 25,
  timeLeft: 1500,
  timerLabel: "Session",
  play: false };

function reducer(state, actions) {
  switch (actions.type) {

    case ACTIONS.ADD:{
        if (state.breakLength >= 60) return initialState;
        return {
          ...state,
          breakLength: state.breakLength + 1 };

      }
    case ACTIONS.CUT:{
        if (state.breakLength <= 1) return initialState;
        return {
          ...state,
          breakLength: state.breakLength - 1 };

      }case ACTIONS.ADD_SESS:{
        if (state.sessionLength >= 60) return initialState;

        return {
          ...state,
          sessionLength: state.sessionLength + 1,
          timeLeft: (state.sessionLength + 1) * 60 };

      }
    case ACTIONS.CUT_SESS:{
        if (state.sessionLength <= 1) return initialState;
        if (state.timeLeft <= 0) return initialState;
        return {
          ...state,
          sessionLength: state.sessionLength - 1,
          timeLeft: (state.sessionLength - 1) * 60 };

      }
    case ACTIONS.CUT_SECONDS:{
        if (state.sessionLength <= 0) return initialState;
        if (state.timeLeft <= 0) return initialState;
        return {
          ...state,
          timeLeft: state.timeLeft - 1 };


      }
    case ACTIONS.PLAY:
      return {
        ...state,
        play: true };

    case ACTIONS.PAUSE:
      return {
        ...state,
        play: false };

    case ACTIONS.RESET:
      return initialState;}

}

const App = () => {

  const audioElement = React.useRef();const [{ breakLength, sessionLength, timeLeft, timerLabel, play }, dispatch] = React.useReducer(reducer, initialState);

  let interval;

  React.useEffect(() => {
    if (play && timeLeft) {interval = setInterval(() => {
        dispatch({ type: ACTIONS.CUT_SECONDS });
      }, 1000);} else if (play && timeLeft === 0) {interval = setInterval(() => {
        audioElement.current.play();
        dispatch({ type: ACTIONS.RESET });

      }, 1000);}

    return () => {
      clearInterval(interval);
    };
  }, [play, timeLeft]);

  const handleClick = e => {
    e.preventDefault;
    clearInterval(interval);
    dispatch({ type: ACTIONS.RESET });
    audioElement.current.pause();
  };

  return /*#__PURE__*/React.createElement("div", { className: "container p-5" }, /*#__PURE__*/
  React.createElement("div", { className: "clock d-flex flex-column justify-content-center align-items-center w-75 m-auto rounded" }, /*#__PURE__*/
  React.createElement("h1", { className: "fw-bold" }, "25+5 Clock"), /*#__PURE__*/
  React.createElement("div", { className: "" }, /*#__PURE__*/
  React.createElement("h2", { id: "break-label", className: "fw-semibold" }, "Break Length"), /*#__PURE__*/
  React.createElement("div", { className: "d-flex align-items-center justify-content-between" }, /*#__PURE__*/
  React.createElement("div", { onClick: () => dispatch({ type: ACTIONS.ADD }), id: "break-increment", className: "btn btn-success m-2" }, /*#__PURE__*/React.createElement("i", { className: "bi bi-arrow-up-square fs-2 " })), /*#__PURE__*/
  React.createElement("h1", { id: "break-length" }, breakLength), /*#__PURE__*/
  React.createElement("div", { onClick: () => dispatch({ type: ACTIONS.CUT }), id: "break-decrement", className: "btn btn-success m-2" }, /*#__PURE__*/React.createElement("i", { className: "bi bi-arrow-down-square fs-2 p" }))), /*#__PURE__*/

  React.createElement("h2", { id: "session-label", className: "fw-semibold" }, "Session Length"), /*#__PURE__*/
  React.createElement("div", { className: "d-flex align-items-center justify-content-between" }, /*#__PURE__*/
  React.createElement("div", { onClick: () => dispatch({ type: ACTIONS.ADD_SESS }), id: "session-increment", className: "btn btn-success m-2" }, /*#__PURE__*/React.createElement("i", { className: "bi bi-arrow-up-square fs-2 " })), /*#__PURE__*/
  React.createElement("h1", { id: "session-length" }, sessionLength), /*#__PURE__*/
  React.createElement("div", { onClick: () => dispatch({ type: ACTIONS.CUT_SESS }), id: "session-decrement", className: "btn btn-success m-2" }, /*#__PURE__*/React.createElement("i", { className: "bi bi-arrow-down-square fs-2 " })))), /*#__PURE__*/



  React.createElement("div", { class: "border border-4  border-success rounded m-2 p-2 text-center fs-1 " }, /*#__PURE__*/
  React.createElement("h2", { id: "timer-label" }, play ? timerLabel : "Break"), /*#__PURE__*/
  React.createElement("span", { id: "time-left", className: "fw-lighter fs-{20} " }, formatTime(timeLeft))), "  ", /*#__PURE__*/
  React.createElement("div", { className: "d-flex justify-content-center mb-2 " },
  !play && /*#__PURE__*/React.createElement("span", { onClick: () => dispatch({ type: ACTIONS.PLAY }), id: "start_stop", className: "btn btn-success" }, /*#__PURE__*/React.createElement("i", { class: "bi bi-play-btn fs-2" })),

  play && /*#__PURE__*/React.createElement("span", { onClick: () => dispatch({ type: ACTIONS.PAUSE }), className: "btn btn-success" }, /*#__PURE__*/React.createElement("i", { class: "bi bi-pause-circle px-2 fs-2" })), /*#__PURE__*/
  React.createElement("span", { onClick: handleClick, id: "reset", className: "btn btn-success" }, /*#__PURE__*/React.createElement("i", { class: "bi bi-arrow-repeat fs-2" })), /*#__PURE__*/

  React.createElement("audio", { id: "beep", src: "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg ", type: "audio/mp3", ref: audioElement }))));




};


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));