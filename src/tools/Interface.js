import Module from "./Module.js";

class Interface extends Module {
  constructor() {
    super();

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
    const nodes = Array.from(document.querySelectorAll("[data-ui-action]"));

    nodes.forEach((node) => {
      const dataset = node.dataset.uiAction.split("|");

      dataset.forEach((set) => {
        const event = set.split(",")[0]?.trim();
        const d = set
          .split(",")[1]
          .split("-")
          .map((x) => x.split(";"));

        d.forEach((x) => {
          const m = Module.modules.filter((m) => m.name == x[0].trim())[0];
          const hasArgs = x[1].indexOf("(") != -1 && x[1].indexOf(")") != -1;

          let f, cb;

          if (hasArgs) {
            f = x[1].substring(0, x[1].indexOf("(")).trim();
          } else {
            f = x[1].substring(0, x[1].length).trim();
          }

          cb = m[f];

          let args = [];

          if (hasArgs) {
            const data = x[1].substring(
              x[1].indexOf("(") + 1,
              x[1].indexOf(")")
            );
            const m = Module.get(data.split(".")[0])?.[0];
            const a = m[data.split(".")[1]].bind(m);
            args.push(a);
          }

          node["addEventListener"](event, (e) => cb.bind(m, ...args, e)());
        });
      });
    });
  }

  init() {
    setTimeout(() => {
      this.initListeners();
    }, 1000);
  }
}

export default Interface;
