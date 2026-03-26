import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ButtonToggle from "./components/ButtonToggle";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

function Access() {
  const auth = useAuth();

  if (auth.user != null) return <Navigate to="/home" />;

  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <>
      {isToggled ? <Register /> : <Login />}
      <ButtonToggle isToggled={isToggled} onClick={handleToggle} />
    </>
  );
}

export default Access;
