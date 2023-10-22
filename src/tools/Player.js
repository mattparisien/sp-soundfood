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
    this.episode = await this.api.getEpisode(this.episodeId);
    this.audio = Module.get("Audio")[0];
    this.audio?.load(this.episode.episodeUrl);
    Module.get("Interface")[0]?.init();
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

  onResize() {
    this.player.els.timeline.getBoundingClientRect().width;
    const elapsedPercent = this.audio.getProgressPercent();

    this.timelineTrackWidth = this.timelineWidth * elapsedPercent;
    this.currTrackTime = this.audio.getProgress();
  }

  pauseAudio() {
    this.audio.pause();
  }

  onTimelineMouseDown(e) {
    const pos =
      e.clientX - this.player.els.timeline.getBoundingClientRect().left;
    this.timelineTrackWidth = pos;
  }
}

export default Player;
