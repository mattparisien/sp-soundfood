import Module from "./Module.js";
import Utils from "./Utils.js";

class Controls extends Module {
  animationFrame = null;
  isPause = true;

  constructor(wrapper) {
    super();
    this.wrapper = wrapper;
    this.currTime = wrapper.querySelector("[data-control='currTime']");
    this.endTime = wrapper.querySelector("[data-control='endTime']");
    this.playBtn = wrapper.querySelector("[data-control='playBtn']");
    this.playSvg = document.getElementById("playSvg");
    this.pauseSvg = document.getElementById("pauseSvg");

  }

  updateCurrTime() {}



  toggleBtn() {
    if (!this.hasPlayed) {
      this.hasPlayed = true;
      document.querySelector(".sf-player").classList.add("has-played");
    }

    if (this.isPause) {
      this.playSvg.style.display = "none";
      this.pauseSvg.style.display = "block";
    } else {
      this.playSvg.style.display = "block";
      this.pauseSvg.style.display = "none";
    }

    this.isPause = !this.isPause;
  }

  setCurrTime(func) {
    this.currTime.innerText = Utils.formatSeconds(
      Module.get("Audio")[0].getProgress()
    );
  }

  setEndTime() {
    this.endTime.innerText = Utils.formatSeconds(
      Module.get("Audio")[0].getDuration()
    );
  }
}

export default Controls;
