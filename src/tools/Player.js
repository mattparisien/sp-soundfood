import Module from "./Module.js";
import PodcastApi from "./PodcastApi.js";

class Player extends Module {
  hasPlayed = false;
  episode = null;
  track = null;

  constructor() {
    super();
    this.episodeId = parseInt(window.location.search.substring(12));
    this.api = new PodcastApi();

    this.init();
  }

  async init() {
    try {
      this.episode = await this.api.getEpisode(this.episodeId);
      this.audio = Module.get("Audio")[0];
      this.audio?.load(this.episode.episodeUrl);
      Module.get("Interface")[0]?.init();
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
