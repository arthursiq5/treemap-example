import Graph from "./Graph"
import { normalize } from "./Helpers/NormalizeData";

window.addEventListener("load", initialize);
window.addEventListener("resize", resizeCanvas);

const canva = document.getElementById('chart')
let graph = null;
let cachedData = null;

function initialize () {
    resizeCanvas();
    fetchData();
}

function resizeCanvas() {
    canva.width = window.innerWidth;
    canva.height = window.innerHeight;

    if (graph && cachedData) {
        graph.render()
    }
}

const fetchData = () => {
    const empresas = ['PETR4', 'VALE3', 'ITUB4', 'BBDC4', 'ABEV3', 'BBAS3', 'B3SA3', 'WEGE3', 'RENT3', 'ITSA4'];
    const getApiUrl = query => `https://b3api.me/api/quote/${query}`
    const generatePromises = () => empresas.map(element =>
        fetch(getApiUrl(element))
            .then(response => response.json())
        )
    Promise.all(generatePromises())
        .then(results => normalize(results))
        .then(data => {
            cachedData = data
            graph = new Graph(canva, data)
            graph.render()
        })
}
