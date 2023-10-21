import "./assets/styles/main.css";
import PodcastApi from "../PodcastApi.js";


const init = async () => {

    
    const api = new PodcastApi();
    
    var episodeId = window.location.search.substring(12);

    const episode = await api.getEpisode(episodeId);
    console.log(episode)
    
};

window.addEventListener("load", init);
