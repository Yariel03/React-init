import { useState, useEffect } from "react";
import "./App.css";

const FollowMouse = () => {
  const [coords, setCoords] = useState({ x: -25, y: -25 });
  const [enable, setEnable] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("no-cursor", enable);
    return () => {
      document.body.classList.remove("no-cursor");
    };
  }, [enable]);

  useEffect(() => {
    const handeleMove = (e) => {
      const { clientX, clientY } = e;
      console.log("evento", clientX, clientY);
      setCoords({ x: clientX, y: clientY });
    };

    if (enable) {
      window.addEventListener("pointermove", handeleMove);
    }
    return () => {
      window.removeEventListener("pointermove", handeleMove);
    };
  }, [enable]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          border: "1px solid #fff",
          borderRadius: "50%",
          opacity: 0.8,
          pointerEvents: "none",
          cursor: `${enable ? "none" : "crosshair"}`,
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${coords.x}px, ${coords.y}px)`,
          display: `${enable ? "block" : "none"}`,
        }}
      ></div>
      <h3>Proyecto 2</h3>
      <button onClick={() => setEnable(!enable)}>
        {enable ? "activo" : "inactivo"}
      </button>
    </>
  );
};

function App() {
  return (
    <>
      <main>
        <FollowMouse />
      </main>
    </>
  );
}

export default App;
