import "./assets/styles/main.css";
// import PodcastApi from "../PodcastApi.js";
// import SoundfoodPlayer from "../SoundfoodPlayer.js";
import axios from "axios";

const init = async () => {
  console.log('hello!')
  const endpoint = `https://itunes.apple.com/lookup?id=1539431210&media=podcast&entity=podcastEpisode&limit=100`;
  axios
    .get(endpoint)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  // const api = new PodcastApi();
  // let player;

  // var episodeId = parseInt(window.location.search.substring(12));

  // const episode = await api.getEpisode(episodeId);

  // const data = await api.getTrack(episode.episodeUrl);

  // if (data) {
  //   player = await new SoundfoodPlayer(
  //     episode.trackName,
  //     episode.releaseDate,
  //     data.data
  //   );
  // }
};

window.addEventListener("load", init);
