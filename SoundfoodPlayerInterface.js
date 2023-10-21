class SoundfoodPlayerInterface {
  constructor() {
    this.els = Array.from(document.querySelectorAll("[data-player-el]")).reduce(
      (a, v) => ({
        ...a,
        [v.dataset.playerEl]: v,
        [events]: this.getListeners(v.dataset.playerCb),
      })
    );
    this.els["root"] = document.querySelector('[data-player-el="root"]');
  }

  udpateControls() {
    console.log("called!");
  }

  getListeners(str) {
    if (!str) return str;

    const obj = {};

    str.split(";").forEach((l) => {
      const e = l.split(",")[0];
      const h = l.split(",")[1];
      obj[e] = this[h];
    });

    return obj;
  }

  updateTimeline(progressPercent) {
    const maxWidth = this.els.timeline.getBoundingClientRect().width;
    // console.log(
    //   this.els.timeline.getBoundingClientRect().width * progressPercent
    // );
    this.els.progress.style.width = maxWidth * progressPercent + "px";
  }

  setAttributes(title, shortTitle, guest, releaseDate) {
    this.els.root.setAttribute("data-episode-title", title);
    this.els.root.setAttribute("data-episode-short-title", shortTitle);
    this.els.root.setAttribute("data-episode-guest", guest);

    this.els.title.innerText = shortTitle;
    this.els.date.innerText = releaseDate;
    this.updateTimeline();
  }
}

export default SoundfoodPlayerInterface;
