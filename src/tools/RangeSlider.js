import Module from "./Module.js";

class RangeSlider extends Module {
  currPos = null;
  maxPos = null;

  constructor(wrapper) {
    super();
    this.wrapper = wrapper;
    this.progressEl = wrapper.querySelector("[data-rangeSlider-progressEl]");

    this.currPos = 0;
    this.maxPos = this.calcMaxPos();
  }

  calcMaxPos() {
    return (
      this.wrapper.getBoundingClientRect().width -
      this.wrapper.getBoundingClientRect().left
    );
  }

  setPos(percent) {
    this.progressEl.style.width = this.maxPos * percent + "px";
  }

  onResize() {
    window.addEventListener("resize", () => {
      this.maxPos = this.calcMaxPos();
    });
  }
}

export default RangeSlider;
