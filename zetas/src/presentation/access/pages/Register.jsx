import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Validator from "../../../utils/Validators";
import InputAcces from "../components/InputAcces";

function Register() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const auth = useAuth();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    userName: [],
    email: [],
    confirmEmail: [],
    password: [],
    confirmPassword: [],
  });

  const validateField = (name, value) => {
    if (name === "userName") {
      const v = new Validator(value).isLength({ min: 3, max: 8 });
      setErrors((prev) => ({ ...prev, userName: v.getErrors() }));
    }
    if (name === "email") {
      const v = new Validator(value).isEmail();
      setErrors((prev) => ({ ...prev, email: v.getErrors() }));
    }
    if (name === "confirmEmail") {
      const v = new Validator(value).matches(formData.email);
      setErrors((prev) => ({ ...prev, confirmEmail: v.getErrors() }));
    }
    if (name === "password") {
      const v = new Validator(value).containNumbers().isLength({ min: 4 });
      setErrors((prev) => ({ ...prev, password: v.getErrors() }));
    }
    if (name === "confirmPassword") {
      const v = new Validator(value).matches(formData.password);
      setErrors((prev) => ({ ...prev, confirmPassword: v.getErrors() }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value); // feedback instantáneo
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateField("userName", formData.userName);
    validateField("email", formData.email);
    validateField("confirmEmail", formData.confirmEmail);
    validateField("password", formData.password);
    validateField("confirmPassword", formData.confirmPassword);

    if (errors.email.length === 0 && errors.password.length === 0) {
      console.log("Formulario válido", formData);
      auth.login(formData);
      navigate("/home");
    }
  };

  return (
    <div className="card--form">
      <h2>Registra una cuenta en Zetas.com</h2>
      <form onSubmit={handleSubmit}>
        <InputAcces
          type="text"
          idName="userName"
          placeholder="Nombre de usuario"
          handleChange={handleChange}
          value={formData.userName}
          errors={errors.userName}
        />

        <InputAcces
          type="email"
          idName="email"
          placeholder="Correo electronico"
          handleChange={handleChange}
          value={formData.email}
          errors={errors.email}
        />

        <InputAcces
          type="email"
          idName="confirmEmail"
          placeholder="Confirmar correo electronico"
          handleChange={handleChange}
          value={formData.confirmEmail}
          errors={errors.confirmEmail}
        />

        <InputAcces
          type="password"
          idName="password"
          placeholder="Contraseña"
          handleChange={handleChange}
          value={formData.password}
          errors={errors.password}
        />

        <InputAcces
          type="password"
          idName="confirmPassword"
          placeholder="Confirmar contraseña"
          handleChange={handleChange}
          value={formData.confirmPassword}
          errors={errors.confirmPassword}
        />

        <button type="submit">Registarte</button>
      </form>
    </div>
  );
}

export default Register;
