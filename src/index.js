import "./assets/styles/main.css";
import "../PodcastApi.js";

const init = () => {
    const Api = new PodcastApi();
    var url = window.location.search.substring(12);
    console.log(url)
};

window.addEventListener("load", init);
