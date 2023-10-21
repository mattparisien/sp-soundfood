class SoundfoodPlayerInterface {
  constructor(wrapper) {
    this.root = wrapper;
    this.title = wrapper.querySelector(".sf-player-title");
    this.date = wrapper.querySelector(".sf-player-date");
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
