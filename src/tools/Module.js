import _ from "lodash";

class Module {
  static modules = [];
  static list = []

  constructor() {
    this.name = this.constructor.name;
    this.container = document.querySelector(
      `[data-module-${this.name.toLowerCase()}]`
    );

    this.setContainerId();
    this.addToModules();
  }

  static get(name) {
    return Module.modules.filter(x => x.name == name);
  }

  addToModules() {
    Module.modules.push(this);
  }

  setContainerId() {
    this.container?.setAttribute(
      `data-module-${this.name.toLowerCase()}`,
      _.uniqueId("m")
    );
  }

  self() {
    return this;
  }

  destroy() {
    delete this;
  }
}

export default Module;
