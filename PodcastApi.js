import axios from "axios";

class PodcastApi {
  constructor() {
    this.collectionId = "1539431210";
    this.media = "podcast";
    this.entity = "podcastEpisode";
    this.limit = 100;
    this.proxyUrl = "http://localhost:3000/episodes";
  }

  async getEpisodes() {
    try {
      return await axios.get(this.endpoint);
    } catch (err) {
      console.log(err);
    }
  }

  async getEpisode(episodeNumber) {
    try {
      const { data } = await axios.get(this.proxyUrl + "/" + episodeNumber);

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async getTrack(trackUrl) {
    try {
      const hi = await axios.get(trackUrl, {
        responseType: "blob",
      });
      return hi;
    } catch (err) {
      console.log(err);
    }
  }
}

export default PodcastApi;
