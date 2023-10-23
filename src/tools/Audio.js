import Module from "./Module.js";

class Audio extends Module {
  constructor(wrapper) {
    super();
    this.el = wrapper;
    this.isPlaying = false;
  }

  onLoad(onLoadCb) {
    console.log(onLoadCb);
    this.el.addEventListener("loadeddata", () => {
      onLoadCb?.();
    });
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
    const onLoadCb = () => {
      const m1 = Module.get("Controls")[0];
      const m2 = Module.get("Player")[0];

      m1?.setEndTime.bind(m1)();
      m2?.setReady.bind(m2)();
    };

    this.track = track;
    this.setTrack();
    this.onLoad(onLoadCb);
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
