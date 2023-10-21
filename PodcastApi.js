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
    console.log('hi')
    try {
      fetch(this.endpoint)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          return response.blob();
        })
        .then((response) => {
          console.log(response)
          return response;
        });
    } catch (err) {
      console.log(err);
    }
  }

  async getEpisode(episodeNumber) {
    try {
      const { data } = await axios.get(this.endpoint, {
        headers: {
          "Access-Control-Allow-Origin": "*",
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
