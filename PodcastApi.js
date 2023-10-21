import axios from "axios";

class PodcastApi {
    constructor() {
        this.collectionId = "1539431210";
        this.media = "podcast";
        this.entity = "podcastepisode";
        this.limit - 100;
        this.endpoint = `https://itunes.apple.com/lookup?id=${this.collectionId}&media=${this.media}&entity=${this.entity}&limit=${this.limit}`;
1539431210
        this.init();
    }

    init() {
        return axios.get(this.endpoint)
    }
}

export default PodcastApi;