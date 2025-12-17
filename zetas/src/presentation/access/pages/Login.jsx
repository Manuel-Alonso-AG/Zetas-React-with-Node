import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const auth = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    auth.login(formData);
    navigate("/home");
  };

  return (
    <form onSubmit={handleSubmit} className="card--form">
      <h2>Accede a Zetas.com</h2>
      <input
        type="email"
        className="input--form"
        name="email"
        id="email"
        placeholder="Correo electronico"
        onChange={handleChange}
      />

      <input
        type="password"
        className="input--form"
        name="password"
        id="password"
        placeholder="Contraseña"
        onChange={handleChange}
      />
      <button type="submit">Acceder</button>
    </form>
  );
}

export default Login;
