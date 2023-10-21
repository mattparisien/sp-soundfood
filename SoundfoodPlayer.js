class SoundfoodPlayer {
  hasPlayed = false;
  isPlaying = false;
  isReady = false;

  constructor(title, releaseDate, trackData) {
    this.trackData = trackData;
    this.title = title.split("with")[0].trim();
    this.guest = title.split("with")[1].trim();
    this.shortTitle = this.title.replace(":", "|").split("|")[0].trim();
    this.releaseDate = this.formatDate(releaseDate);
    this.trackData = trackData;

    this.player = {
      els: {
        wrapper: document.getElementById("sf-player"),
        title: document.querySelector(".sf-player-title"),
        date: document.querySelector(".sf-player-date"),
        audio: document.querySelector(".sf-player-audio"),
        timeEnd: document.querySelector(
          ".sf-player-controls--timeStamp .track-time-end"
        ),
        playBtn: document.querySelector(".sf-player-playBtn"),
        playSvg: document.getElementById("playSvg"),
        pauseSvg: document.getElementById("pauseSvg"),
      },
    };

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
      this.player.els.timeEnd.innerText = this.player.els.audio.duration;
      this.player.els.wrapper.classList.add("is-playing");
      this.player.els.playSvg.style.display = "none";
      this.player.els.pauseSvg.style.display = "flex";
    } else {
      this.player.els.audio.pause();
      this.player.els.wrapper.classList.remove("is-playing");
      this.player.els.playSvg.style.display = "flex";
      this.player.els.pauseSvg.style.display = "none";
    }
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

  initListeners() {
    this.player.els.playBtn.addEventListener("click", () => {
      if (!this.hasPlayed) this.hasPlayed = true;

      this.isPlaying = !this.isPlaying;

      this.toggleUIPlayState();
    });
  }

  initAudio() {
    this.player.els.audio.src = URL.createObjectURL(this.trackData);
  }
}

export default SoundfoodPlayer;
