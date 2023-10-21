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
    try {
      return await axios.get(this.endpoint, {
        headers: {
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "https://mattparisien.github.io",
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async getEpisode(episodeNumber) {
    try {
      const { data } = await axios.get(this.endpoint, {
        headers: {
          "Access-Control-Allow-Origin": "https://mattparisien.github.io",
          "Content-Type": "application/json",
        },
      });
      
      return await data.results.reverse()[episodeNumber + 1];
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
