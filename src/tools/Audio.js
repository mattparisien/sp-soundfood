import Module from "./Module.js";

class Audio extends Module {
  constructor(wrapper) {
    super();
    this.el = wrapper;
    this.isPlaying = false;
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
    return this.el.currentTime;
  }

  getDuration() {
    return this.el.duration;
  }

  getProgressDurationFromProgressPercent(progressPercent) {
    return this.el.duration * progressPercent;
  }

  getProgressPercent() {
    const max = this.getDuration();
    const curr = this.getProgress();

    return curr / max;
  }

  setProgressBasedOnClick(progressPercent) {
    
    const progress =
      this.getProgressDurationFromProgressPercent(progressPercent);
    this.setProgress(progress);
  }

  load(track) {
    this.track = track;
    this.setTrack();
  }

  togglePlayState() {
    if (!this.el.paused) {
      this.pause();
    } else {
      this.play();
    }
  }

  setTrack() {
    this.el.src = this.track;
  }
}

export default Audio;
