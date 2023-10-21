import AudioManager from "./AudioManager.js";

class SoundfoodPlayer {
  hasPlayed = false;
  isPlaying = false;
  isReady = false;

  constructor(title, releaseDate, track) {
    this.track = track;
    this.title = title.split("with")[0].trim();
    this.guest = title.split("with")[1].trim();
    this.shortTitle = this.title.replace(":", "|").split("|")[0].trim();
    this.releaseDate = this.formatDate(releaseDate);
    this.audio = new AudioManager(
      document.querySelector(".sf-player-audio"),
      this.track,
      this.onAudioLoad.bind(this)
    );

    this.currTrackTime = 0;
    this.maxTrackTime = 0;
    this.animationFrame = null;

    this.player = {
      els: {
        wrapper: document.getElementById("sf-player"),
        title: document.querySelector(".sf-player-title"),
        date: document.querySelector(".sf-player-date"),
        audio: document.querySelector(".sf-player-audio"),
        timeCurrent: document.querySelector(
          ".sf-player-controls--timeStamp .track-time-current"
        ),
        timeEnd: document.querySelector(
          ".sf-player-controls--timeStamp .track-time-end"
        ),
        playBtn: document.querySelector(".sf-player-playBtn"),
        playSvg: document.getElementById("playSvg"),
        pauseSvg: document.getElementById("pauseSvg"),
        timeline: document.querySelector(".sf-player-timeline"),
        timelineTrack: document.querySelector(".sf-player-timeline .track"),
      },
    };

    this.timelineWidth = this.player.els.timeline.getBoundingClientRect().width;

    this.updateUI();
    this.initListeners();
  }

  toggleUIPlayState() {
    if (
      this.hasPlayed &&
      !this.player.els.wrapper.classList.contains("has-played")
    ) {
      this.player.els.wrapper.classList.add("has-played");
    }

    if (this.isPlaying) {
      this.audio.play();
      this.player.els.wrapper.classList.add("is-playing");
      this.player.els.playSvg.style.display = "none";
      this.player.els.pauseSvg.style.display = "flex";
      this.initAnimation();
    } else {
      this.audio.pause();
      this.player.els.wrapper.classList.remove("is-playing");
      this.player.els.playSvg.style.display = "flex";
      this.player.els.pauseSvg.style.display = "none";
      this.cancelAnimation();
    }
  }

  cancelAnimation() {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
  }

  updateUIAnimation() {
    this.player.els.timeCurrent.innerText = this.currTrackTime;
    this.player.els.timelineTrack.style.width = `${this.timelineTrackWidth}px`;
  }

  initAnimation() {
    const elapsedPercent = this.audio.getProgressPercent();

    this.timelineTrackWidth = this.timelineWidth * elapsedPercent;
    this.currTrackTime = this.formatTime(this.audio.getProgress());

    this.updateUIAnimation();

    this.animationFrame = requestAnimationFrame(this.initAnimation.bind(this));
  }

 

  getDuration() {
    return this.formatTime(this.audio.getDuration());
  }

  updateUI() {
    this.player.els.wrapper.setAttribute("data-episode-title", this.title);
    this.player.els.wrapper.setAttribute(
      "data-episode-short-title",
      this.shortTitle
    );
    this.player.els.wrapper.setAttribute("data-episode-guest", this.guest);

    this.player.els.title.innerText = this.shortTitle;
    this.player.els.date.innerText = this.releaseDate;
  }

  onResize() {
    this.player.els.timeline.getBoundingClientRect().width;
    const elapsedPercent = this.audio.getProgressPercent();

    this.timelineTrackWidth = this.timelineWidth * elapsedPercent;
    this.currTrackTime = this.formatTime(this.audio.getProgress());
  }

  onAudioLoad() {
    this.player.els.timeEnd.innerText = this.getDuration();
  }

  onActionClick() {
    if (!this.hasPlayed) this.hasPlayed = true;

    this.isPlaying = !this.isPlaying;

    this.toggleUIPlayState();
  }

  pauseAudio() {
    this.audio.pause();
  }

  onTimelineMouseDown(e) {
    // this.pauseAudio();

    const pos =
      e.clientX - this.player.els.timeline.getBoundingClientRect().left;
    this.timelineTrackWidth = pos;
  }

  initListeners() {
    window.addEventListener("resize", this.onResize.bind(this));
    this.player.els.playBtn.addEventListener(
      "click",
      this.onActionClick.bind(this)
    );
    this.player.els.timeline.addEventListener(
      "mousedown",
      this.onTimelineMouseDown.bind(this)
    );
  }
}

export default SoundfoodPlayer;
