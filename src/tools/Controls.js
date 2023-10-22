import Module from "./Module.js";
import Utils from "./Utils.js";

class Controls extends Module {
  animationFrame = null;
  isPause = true;

  constructor(wrapper) {
    super();
    this.wrapper = wrapper;
    this.currTime = wrapper.querySelector("[data-control='currTime']");
    this.endTime = wrapper.querySelector("[data-control='endime']");
    this.playBtn = wrapper.querySelector("[data-control='playBtn']");
    this.timeline = wrapper.querySelector("[data-control='timeline']");
    this.progress = wrapper.querySelector("[data-control='progress']");
    this.playSvg = document.getElementById("playSvg");
    this.pauseSvg = document.getElementById("pauseSvg");

    this.tlWidth = this.timeline.getBoundingClientRect().width;
  }

  updateCurrTime() {}

  updateTimeline() {
    const percent = Module.get("Audio")[0].getProgressPercent();
    this.progress.style.width = this.tlWidth * percent + "px";
  }

  setProgressWidth(cb, e) {
    const x = e.clientX - this.timeline.getBoundingClientRect().left;

    const percent = x / this.tlWidth;
    this.progress.style.width = this.tlWidth * percent + "px";

    cb?.(percent);
  }

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

  setCurrTime() {
    this.currTime.innerText = Utils.formatSeconds(
      Module.get("Audio")[0].getProgress()
    );
  }
}

export default Controls;
