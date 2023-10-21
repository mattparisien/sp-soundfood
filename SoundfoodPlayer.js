class SoundfoodPlayer {
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
      },
    };

    this.initDom();
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

  initDom() {
    this.updateUI();
  }
}

export default SoundfoodPlayer;
