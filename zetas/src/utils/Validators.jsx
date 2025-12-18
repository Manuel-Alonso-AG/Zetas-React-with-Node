class Validator {
  str = "";
  errors = [];

  constructor(str) {
    this.str = String(str || "");
    this.errors = [];
  }

  reset() {
    this.errors = [];
    return this;
  }

  isLength({ min, max }) {
    if (min != null && this.str.length < min) {
      this.errors.push(`Debe contener mínimo ${min} caracteres`);
    }

    if (max != null && this.str.length > max) {
      this.errors.push(`Debe contener máximo ${max} caracteres`);
    }

    return this;
  }

  isEmail() {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(this.str)) {
      this.errors.push(`No es un correo válido`);
    }

    return this;
  }

  containNumbers() {
    const regex = /\d/;
    if (!regex.test(this.str)) {
      this.errors.push(`Debe contener números`);
    }

    return this;
  }

  matches(other) {
    if (this.str !== String(other || "")) {
      this.errors.push(`No coinciden`);
    }
    return this;
  }

  isValid() {
    return this.errors.length === 0;
  }

  getErrors() {
    return [...this.errors];
  }

  firstError() {
    return this.errors[0] || "";
  }
}

export default Validator;
