import { Route, Routes } from "react-router-dom";
import "./App.css";
import Access from "./presentation/access/Access";
import AuthRoutes from "./utils/AuthRoutes";
import { AuthProvider } from "./context/AuthContext.jsx";
import Home from "./presentation/home/Home";
import Dashboard from "./presentation/dashboard/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Access />} />
        <Route element={<AuthRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
