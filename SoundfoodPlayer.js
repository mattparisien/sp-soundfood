class SoundfoodPlayer {
  isPlaying = false;
  isReady = false;

  constructor(title, releaseDate) {
    this.title = title.split("with")[0].trim();
    this.guest = title.split("with")[1].trim();
    this.shortTitle = this.title.replace(":", "|").split("|")[0].trim();
    this.releaseDate = this.formatDate(releaseDate);

    this.player = {
      els: {
        wrapper: document.getElementById("sf-player"),
        title: document.querySelector(".sf-player-title"),
        date: document.querySelector(".sf-player-date"),
        playBtn: document.querySelector(".sf-player-playBtn"),
        playSvg: document.getElementById("playSvg"),
        pauseSvg: document.getElementById("pauseSvg"),
      },
    };

    this.updateUI();
    this.initListeners();
  }

  toggleUIPlayState() {
    if (this.isPlaying) {
      this.player.els.playSvg.style.display = "none";
      this.player.els.pauseSvg.style.display = "block";
    } else {
      this.player.els.playSvg.style.display = "block";
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
    this.player.els.playSvg.addEventListener("click", () => {
      this.isPlaying = !this.isPlaying;
      this.toggleUIPlayState();
    });
  }
}

export default SoundfoodPlayer;
