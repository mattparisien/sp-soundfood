import "./assets/styles/main.css";

const init = () => {
    console.log('hi')
    var url = window.location.search.substring(1);
    console.log(url)
};

window.addEventListener("load", init);
