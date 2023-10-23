import Module from "./Module.js";
import PodcastApi from "./PodcastApi.js";

class Player extends Module {
  isReady = false;
  hasPlayed = false;
  episode = null;
  trackName = null;
  guestName = null;
  releaseDate = null;

  constructor(wrapper) {
    super();
    this.el = wrapper;
    this.episodeId = parseInt(window.location.search.substring(12) - 1);
    this.api = new PodcastApi();

    this.init();
  }

  setReady() {
    this.isReady = true;
    this.el.classList.add("is-ready");
  }

  async init() {
    try {
      this.episode = await this.api.getEpisode(this.episodeId);

      this.trackName = this.episode.trackName;
      this.releaseDate = this.episode.releaseDate;

      this.audio = Module.get("Audio")[0];
      this.audio?.load(this.episode.episodeUrl);

      Module.get("Interface")[0]?.init(this.trackName, this.releaseDate);
    } catch (err) {
      console.log(Module.get("Error")[0]);
      Module.get("Error")[0]?.setError(
        null,
        "There was an issue loading audio."
      );
    }
  }

  cancelAnimation() {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
  }

  initAnimation(onAnimCb) {
    onAnimCb?.(this.audio);

    this.animationFrame = requestAnimationFrame(
      this.initAnimation.bind(this, () => onAnimCb(this.audio))
    );
  }
}

export default Player;
