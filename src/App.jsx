import React, { useCallback, useRef, useState } from "react";

const App = () => {
  const [bar, setBar] = useState(0);
  let queue = useRef(0);
  let startTime = useRef(null);

  const timer = useCallback(function () {
    if (startTime.current === null) {
      startTime.current = Date.now();
    }
    let presentTime = Date.now() - startTime.current;
    if (presentTime >= 5000) {
      setBar((e) => 0);
      queue.current -= 1;
      startTime.current = null;
    } else {
      setBar((e) => (presentTime / 5000) * 100);
    }
    if (queue.current <= 0) {
      startTime.current = null;
      setBar((e) => 0);
      return;
    }
    setTimeout(timer, 100);
  }, []);

  const start = useCallback(function () {
    queue.current += 1;
    timer();
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => start()}>Start :{queue.current} </button>
      </div>
      <h1></h1>
      <div style={{ width: "50vw", border: "1px solid black", height: "10vh" }}>
        <div
          style={{
            width: `${Math.floor(bar)}%`,
            backgroundColor: "blue",
            color: "blue",
            height: "100%",
          }}
        ></div>
      </div>
    </div>
  );
};

export default App;
