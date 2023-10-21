import "./assets/styles/main.css";
import PodcastApi from "../PodcastApi.js";

const init = () => {
    const api = new PodcastApi();
    var episodeId = window.location.search.substring(12);
    console.log(url)
};

window.addEventListener("load", init);
