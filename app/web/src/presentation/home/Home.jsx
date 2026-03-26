import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div>
      Home
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
    </div>
  );
}

export default Home;
