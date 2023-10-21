import Utils from "./Utils.js";

class AudioManager {
  constructor(audioEl, track, onLoadCb) {
    this.el = audioEl;
    this.track = track;
    this.onLoadCb = onLoadCb;

    this.init();
  }

  play() {
    this.el.play();
  }

  pause() {
    this.el.pause();
  }

  setProgress(time) {
    this.el.currentTime = time;
  }

  getProgress() {
    return this.el.currentTime;
  }

  getDuration() {
    Utils.formatSeconds(this.el.duration);
  }

  getProgressPercent() {
    const max = this.getDuration();
    const curr = this.getProgress();

    return curr / max;
  }

  initListeners() {
    this.el.addEventListener("loadeddata", (e) => {
      this.onLoadCb?.(e);
    });
  }

  setTrack() {
    this.el.src = this.track;
  }

  init() {
    this.initListeners();
    this.setTrack(this.track);
  }
}

export default AudioManager;
