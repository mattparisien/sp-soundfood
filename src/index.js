import "./assets/styles/main.css";
import PodcastApi from "../PodcastApi.js";

const init = async () => {
    const api = new PodcastApi();
    
    var episodeId = window.location.search.substring(12);

    const episodes = await api.getEpisodes();
    console.log(episodes)
    
};

window.addEventListener("load", init);
