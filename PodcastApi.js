import axios from "axios";

class PodcastApi {
  constructor() {
    this.collectionId = "1539431210";
    this.media = "podcast";
    this.entity = "podcastEpisode";
    this.limit = 100;
    this.endpoint = `https://itunes.apple.com/lookup?id=${this.collectionId}&media=${this.media}&entity=${this.entity}&limit=${this.limit}`;
  }

  async getEpisodes() {
    return await axios.get(this.endpoint, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  }

  async getEpisode(episodeNumber) {
    const { data } = await axios.get(this.endpoint, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    return await data.results.reverse()[episodeNumber + 1];
  }
}

export default PodcastApi;
