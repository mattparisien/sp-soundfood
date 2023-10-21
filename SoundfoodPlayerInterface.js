class SoundfoodPlayerInterface {
  constructor() {
    this.els = Array.from(document.querySelectorAll("[data-player-el]")).reduce(
      (a, v) => ({ ...a, [v.dataset.playerEl]: v })
    );
    this.els["root"] = document.querySelector('[data-player-el="root"]');
  }

  updateTimeline(progressPercent) {
    const maxWidth = this.els.timeline.getBoundingClientRect().width;
    this.els.progress.style.width = maxWidth * progressPercent + "px";
  }

  setAttributes(title, shortTitle, guest, releaseDate) {
    console.log(this.els);
    this.els.root.setAttribute("data-episode-title", title);
    this.els.root.setAttribute("data-episode-short-title", shortTitle);
    this.els.root.setAttribute("data-episode-guest", guest);

    this.els.title.innerText = shortTitle;
    this.els.date.innerText = releaseDate;
    this.updateTimeline();
  }
}

export default SoundfoodPlayerInterface;
