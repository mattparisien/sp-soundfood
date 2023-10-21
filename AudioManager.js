import Utils from "./Utils.js";

class AudioManager {
  constructor(audioEl, track, onLoadCb) {
    this.el = audioEl;
    this.track = track;
    this.onLoadCb = onLoadCb;
    this.isPlaying = false;

    this.init();
  }

  play() {
    this.el.play();
    this.isPlaying = true;
  }

  pause() {
    this.el.pause();
    this.isPlaying = false;
  }

  setProgress(time) {
    this.el.currentTime = time;
  }

  getProgress() {
    return Utils.formatSeconds(this.el.currentTime);
  }

  getDuration() {
    return Utils.formatSeconds(this.el.duration);
  }

  getProgressPercent() {
    const max = this.getDuration();
    const curr = this.getProgress();

    console.log(max, curr);

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
