import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    switch (name) {
      case "confirmPassword":
        if (value !== formData["password"]) {
          console.log(
            "Error, contraseña diferente " + value + " " + formData["password"]
          );
        }
        break;

      case "confirmEmail":
        if (value !== formData["email"]) {
          console.log(
            "Error, contraseña diferente " + value + " " + formData["email"]
          );
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="card--form">
      <h2>Registra una cuenta en Zetas.com</h2>
      <input
        type="text"
        className="input--form"
        name="userName"
        id="userName"
        placeholder="Nombre de usuario"
        onChange={handleChange}
      />
      <p></p>
      <input
        type="email"
        className="input--form"
        name="email"
        id="email"
        placeholder="Correo electronico"
        onChange={handleChange}
      />

      <input
        type="email"
        className="input--form"
        name="confirmEmail"
        id="confirmEmail"
        placeholder="Confirmar correo electronico"
        onChange={handleChange}
      />
      <p></p>
      <input
        type="password"
        className="input--form"
        name="password"
        id="password"
        placeholder="Contraseña"
        onChange={handleChange}
      />
      <input
        type="password"
        className="input--form"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirmar contraseña"
        onChange={handleChange}
      />
      <button type="submit">Registarte</button>
    </form>
  );
}

export default Register;
