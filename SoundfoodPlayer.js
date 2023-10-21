class SoundfoodPlayer {
  constructor(title) {
    this.title = title.split("with")[0].trim();
    this.guest = title.split("with")[1].trim();
    this.shortTitle = this.title.split("|")[0].trim();

    this.player = {
      els: {
        wrapper: document.getElementById("sf-player"),
        title: document.querySelector(".sf-player-title"),
      },
    };

    this.initDom();
  }

  updateUI() {
    this.player.els.wrapper.setAttribute("data-episode-title", this.title);
    this.player.els.wrapper.setAttribute("data-episode-short-title", this.shortTitle);
    this.player.els.wrapper.setAttribute("data-episode-guest", this.guest);

    
    this.player.els.title.innerText = this.shortTitle;
  }

  initDom() {
    this.updateUI();
  }
}

export default SoundfoodPlayer;
