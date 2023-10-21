class SoundfoodPlayerInterface {
  constructor() {
    this.els = Array.from(document.querySelectorAll("[data-player-el]")).reduce(
      (a, v) => ({ ...a, [v.dataset.playerEl]: v })
    );
    console.log(this.els);
  }

  setAttributes(title, shortTitle, guest, releaseDate) {
    this.root.setAttribute("data-episode-title", title);
    this.root.setAttribute("data-episode-short-title", shortTitle);
    this.root.setAttribute("data-episode-guest", guest);

    this.title.innerText = shortTitle;
    this.date.innerText = releaseDate;
  }
}

export default SoundfoodPlayerInterface;
