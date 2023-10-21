import "./assets/styles/main.css";
import PodcastApi from "../PodcastApi.js";
import SoundfoodPlayer from "../SoundfoodPlayer.js";


const init = async () => {

    
    const api = new PodcastApi();
    
    var episodeId = parseInt(window.location.search.substring(12));

    
    const episode = await api.getEpisode(episodeId);
    
    const player = await new SoundfoodPlayer(episode.trackName, episode.releaseDate);
    
    
};

window.addEventListener("load", init);
