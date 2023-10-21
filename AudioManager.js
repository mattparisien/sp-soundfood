class AudioManager {
  constructor(audioEl, track, onLoadCb) {
    this.el = audioEl;
    this.track - track;
    this.onLoadCb = onLoadCb;

    this.initListeners();
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
    this.el.duration;
  }

  getProgressPercent() {
    const max = this.getDuration();
    const curr = this.getProgress();

    return curr / max;
  }

  initListeners() {
    this.audio.addEventListener("loadeddata", (e) => {
      this.onLoadCb?.(e);
    });
  }
}

export default AudioManager;
