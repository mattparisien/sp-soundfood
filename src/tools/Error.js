import Module from "./Module";

class Error extends Module {
  statusCode = null;
  message = null;

  constructor(el) {
    super();
    this.el = el;
  }

  setError(code, msg) {
    this.el.innerText = `${code} Error: ${msg}`
    this.el.style.display = "block";
    Module.get("Player")[0].container.classList.add("is-error");
  }
}

export default Error;
