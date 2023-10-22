import Interface from "./Interface.js";
import Audio from "./Audio.js";
import Player from "./Player.js";
import PodcastApi from "./PodcastApi.js";
import Controls from "./Controls.js";
import Error from "./Error.js";

class App {
  static modules = {};
  constructor() {
    this.init();
  }

  static refresh() {
    const mds = Object.values(App.modules).filter((x) => x.isRefresh);

    mds.forEach((m) => {
      App.modules[m.obj.name] = new (eval(m.obj.name))();
    });
  }

  init() {
    const modules = [Interface, Audio, Player, PodcastApi, Controls, Error];

    modules.forEach((m) => {
      const name = m.name;
      const els = Array.from(
        document.querySelectorAll(`[data-module-${name.toLowerCase()}]`)
      );

      if (els.length) {
        els.forEach((el) => {
          const mod = modules.find((x) => x.name == m.name);
          const isRefresh =
            el.hasAttribute(`data-refresh`) &&
            el.getAttribute("data-refresh") == m.name;

          const obj = new mod(el);

          App.modules[m.name] = {
            obj,
            isRefresh,
          };
        });
      }
    });
  }
}

export default App;
