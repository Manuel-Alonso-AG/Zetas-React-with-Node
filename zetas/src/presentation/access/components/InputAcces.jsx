function InputAcces({
  type = "text",
  idName = "",
  placeholder = "",
  value = "",
  handleChange,
  errors,
}) {
  return (
    <div className="input--wrapper">
      <input
        type={type}
        className="input--form"
        name={idName}
        id={idName}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />
      <div className={`input--error ${errors.length > 0 ? "show" : ""}`}>
        {errors.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>
    </div>
  );
}

export default InputAcces;
