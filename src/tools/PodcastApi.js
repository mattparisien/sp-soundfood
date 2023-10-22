import axios from "axios";
import Module from "./Module.js";

class PodcastApi extends Module {
  constructor() {
    super();
    this.collectionId = "1539431210";
    this.media = "podcast";
    this.entity = "podcastEpisode";
    this.limit = 100;
    this.proxyUrl = process.env.PROXY_URL;
  }

  async getEpisodes() {
    return await axios.get(this.endpoint);
  }

  async getEpisode(episodeNumber) {
    const { data } = await axios.get(this.proxyUrl + "/" + episodeNumber);
    return data;
  }
}

export default PodcastApi;
