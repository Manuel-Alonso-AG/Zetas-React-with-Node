import { NavLink } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      dashboard
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
    </div>
  );
}

export default Dashboard;
