class SoundfoodPlayerInterface {
  constructor() {
    this.els = Array.from(document.querySelectorAll("[data-player-el]")).reduce(
      (a, v) => ({ ...a, [v.dataset.playerEl]: v })
    );
  }

  setAttributes(title, shortTitle, guest, releaseDate) {
    console.log(this.els)
    this.els.root.setAttribute("data-episode-title", title);
    this.els.root.setAttribute("data-episode-short-title", shortTitle);
    this.els.root.setAttribute("data-episode-guest", guest);

    this.els.title.innerText = shortTitle;
    this.els.date.innerText = releaseDate;
  }
}

export default SoundfoodPlayerInterface;
