import "./assets/styles/main.css";
import PodcastApi from "../PodcastApi.js";

const init = async () => {
    const api = new PodcastApi();
    
    var episodeId = window.location.search.substring(12);

    await api.getEpisodes();
    
};

window.addEventListener("load", init);
