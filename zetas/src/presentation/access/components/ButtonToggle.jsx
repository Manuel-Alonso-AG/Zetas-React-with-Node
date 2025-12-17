function ButtonToggle({ isToggled, onClick }) {
  return (
    <p className="card">
      {isToggled
        ? "Ya cuentas con una cuenta? "
        : "No cuentas con una cuenta? "}
      <b>
        <a onClick={onClick}>{isToggled ? "Accede" : "Registrate"}</a>
      </b>
    </p>
  );
}

export default ButtonToggle;
