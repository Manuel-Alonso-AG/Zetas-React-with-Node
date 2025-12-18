import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Validator from "../../../utils/Validators";
import InputAcces from "../components/InputAcces";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: [], password: [] });
  const auth = useAuth();
  const navigate = useNavigate();

  const validateField = (name, value) => {
    if (name === "email") {
      const v = new Validator(value).isEmail();
      setErrors((prev) => ({ ...prev, email: v.getErrors() }));
    }
    if (name === "password") {
      const v = new Validator(value).containNumbers().isLength({ min: 4 });
      setErrors((prev) => ({ ...prev, password: v.getErrors() }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value); // feedback instantáneo
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateField("email", formData.email);
    validateField("password", formData.password);

    if (errors.email.length === 0 && errors.password.length === 0) {
      console.log("Formulario válido", formData);
      auth.login(formData);
      navigate("/home");
    }
  };

  return (
    <div className="card--form">
      <h2>Accede a Zetas.com</h2>

      <form onSubmit={handleSubmit}>
        <InputAcces
          type="email"
          idName="email"
          placeholder="Correo electronico"
          handleChange={handleChange}
          value={formData.email}
          errors={errors.email}
        />

        <InputAcces
          type="password"
          idName="password"
          placeholder="Contraseña"
          handleChange={handleChange}
          value={formData.password}
          errors={errors.password}
        />

        <button type="submit">Acceder</button>
      </form>
    </div>
  );
}

export default Login;
