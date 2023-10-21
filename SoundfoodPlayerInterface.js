class SoundfoodPlayerInterface {
  constructor(audio) {
    const func = this.getListeners.bind(this);
    this.audio = audio;

    this.els = Array.from(document.querySelectorAll("[data-player-el]")).reduce(
      (a, v) => ({
        ...a,
        [v.dataset.playerEl]: {
          node: v,
        },
      })
    );

    this.els["root"] = {};
    this.els["root"].node = document.querySelector('[data-player-el="root"]');

    this.init();
  }

  onTimelineDown(e) {
    this.audio.pause();
    const pos = e.pageX - this.els.timeline.node.getBoundingClientRect().left;
    const progressPercent =
      pos / this.els.timeline.node.getBoundingClientRect().width;
    const newCurrentTime =
      this.audio.getProgressDurationFromProgressPercent(progressPercent);
    this.audio.setProgress(newCurrentTime);
  }

  onTimelineUp() {
    this.audio.play();
  }

  getListeners(str) {
    if (!str) return str;

    const obj = {};

    str.split(";").forEach((l) => {
      const e = l.split(",")[0]?.trim();
      const h = l.split(",")[1]?.trim();
      obj[e] = SoundfoodPlayerInterface[h];
    });

    return obj;
  }

  updateTimeline(progressPercent) {
    const maxWidth = this.els.timeline.node.getBoundingClientRect().width;
    this.els.progress.node.style.width = maxWidth * progressPercent + "px";
  }

  setAttributes(title, shortTitle, guest, releaseDate) {
    this.els.root.node.setAttribute("data-episode-title", title);
    this.els.root.node.setAttribute("data-episode-short-title", shortTitle);
    this.els.root.node.setAttribute("data-episode-guest", guest);

    this.els.title.node.innerText = shortTitle;
    this.els.date.node.innerText = releaseDate;
    this.updateTimeline();
  }

  initListeners() {
    const nodes = Array.from(document.querySelectorAll("[data-player-cb]"));

    nodes.forEach((node) => {
      const listeners = node.dataset.playerCb.split(";");
      listeners.forEach((l) => {
        const event = l.split(",")[0]?.trim();
        const cb = this[l.split(",")[1]?.trim()];

        node["addEventListener"](event, cb.bind(this));
      });
    });
  }

  init() {
    this.initListeners();
  }
}

export default SoundfoodPlayerInterface;
