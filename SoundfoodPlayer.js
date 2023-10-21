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
    this.initAudio();
  }

  toggleUIPlayState() {
    if (
      this.hasPlayed &&
      !this.player.els.wrapper.classList.contains("has-played")
    ) {
      this.player.els.wrapper.classList.add("has-played");
    }

    if (this.isPlaying) {
      this.player.els.audio.play();
      this.player.els.wrapper.classList.add("is-playing");
      this.player.els.playSvg.style.display = "none";
      this.player.els.pauseSvg.style.display = "flex";
      this.initAnimation();
    } else {
      this.player.els.audio.pause();
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
    const elapsedPercent = this.getElapsedTimePercentage();

    this.timelineTrackWidth = this.timelineWidth * elapsedPercent;
    this.currTrackTime = this.formatTime(this.player.els.audio.currentTime);

    this.updateUIAnimation();

    this.animationFrame = requestAnimationFrame(this.initAnimation.bind(this));
  }

  formatTime(seconds) {
    return new Date(seconds * 1000).toISOString().slice(11, 19);
  }

  formatDate(date) {
    let dateStr = "";

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const arr = date.substring(0, 10).split("-");
    const year = arr[0];
    const month = arr[1];
    const day = arr[2];

    dateStr += `${monthNames[month - 1]} ${day}, ${year}`;

    return dateStr;
  }

  getDuration() {
    return this.formatTime(this.player.els.audio.duration);
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
    const elapsedPercent = this.getElapsedTimePercentage();

    this.timelineTrackWidth = this.timelineWidth * elapsedPercent;
    this.currTrackTime = this.formatTime(this.player.els.audio.currentTime);
  }

  onAudioLoad() {
    this.player.els.timeEnd.innerText = this.getDuration();
  }

  onActionClick() {
    if (!this.hasPlayed) this.hasPlayed = true;

    this.isPlaying = !this.isPlaying;

    this.toggleUIPlayState();
  }

  onTimelineClick(e) {
      const xPos = e.clientX;
      console.log(xPos)
  }

  initListeners() {
    window.addEventListener("resize", this.onResize.bind(this));
    this.player.els.audio.addEventListener("loadeddata", this.onAudioLoad.bind(this));
    this.player.els.playBtn.addEventListener("click", this.onActionClick.bind(this));
    this.player.els.timeline.addEventListener("click", this.onTimelineClick.bind(this));
  }

  getElapsedTimePercentage() {
    const max = this.player.els.audio.duration;
    const curr = this.player.els.audio.currentTime;

    return curr / max;
  }

  initAudio() {
    this.player.els.audio.src = this.track;
  }
}

export default SoundfoodPlayer;
