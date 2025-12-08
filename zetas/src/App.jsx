import { useState } from "react";
import Login from "./screens/Login";
import Register from "./screens/Register";
import "./App.css";

function App() {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <>
      {isToggled ? <Login /> : <Register />}

      <div className="card">
        <button onClick={handleToggle}>
          {isToggled
            ? "No cuentas con una cuenta? Registrate"
            : "Ya cuentas con una cuenta? Accede"}
        </button>
      </div>
    </>
  );
}

export default App;
