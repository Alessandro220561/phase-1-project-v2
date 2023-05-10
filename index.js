const form = document.getElementById("search-bar");
const random = document.getElementById("random-generator");
const favorite = document.getElementsByClassName("favorite-button");
const imageContainer = document.getElementById("featured-anime-image-container");
const featuredAnime = document.getElementById('anime-details')
const animeSynopsis = document.getElementById('anime-synopsis')

form.addEventListener('submit', getAnime);
random.addEventListener('click', getRandomAnime);
featuredAnime.addEventListener('mouseover', changeColor);
featuredAnime.addEventListener('mouseout', changeColorBack);

function getAnime(e) {
    e.preventDefault();
    fetch(` https://api.jikan.moe/v4/anime?q=${e.target[0].value}&limit=1`)
    .then(response => response.json())
    .then(data => {
        data.data.forEach(data => {
            const anime = data
            const imageUrl = anime.images.jpg.large_image_url
            const animeImageDiv = document.createElement('div')
            const animeDataDiv = document.createElement('div')
            animeDataDiv.id = "featured-anime"
            animeDataDiv.className = "anime-container"
            animeImageDiv.innerHTML = `<img id="featured-anime-image" src="${imageUrl}">`
            animeDataDiv.innerHTML = `
                <h2 id="id=anime-title">${anime.title}</h2>
                <h3 id="japanese-anime-title">${anime.title_japanese}</h3>
                <p id="anime-synopsis">${anime.synopsis}</p>
                <p id="anime-episodes">Number of episodes: ${anime.episodes}</p>
            `;
            imageContainer.innerHTML = ""
            featuredAnime.innerHTML = ""
            imageContainer.appendChild(animeImageDiv);
            featuredAnime.appendChild(animeDataDiv);
            e.target.reset()
        })
    })
}

function getRandomAnime() {
    const randomAnime = Math.floor(Math.random() * 5000) + 1
    fetch(`https://api.jikan.moe/v4/anime/${randomAnime}/full`)
    .then(response => response.json())
    .then(data => {
        const anime = data.data
      //  console.log("data/anime:", anime)
        const imageUrl = anime.images.jpg.large_image_url
        const animeImageDiv = document.createElement('div')
        const animeDataDiv = document.createElement('div')
        animeDataDiv.id = "featured-anime"
        animeDataDiv.className = "anime-container"
        animeImageDiv.innerHTML = `<img id ="featured-anime" src="${imageUrl}"/>`
        animeDataDiv.innerHTML = `
                <h2 id="id=anime-title">${anime.title}</h2>
                <h3 id="japanese-anime-title">${anime.title_japanese}</h3>
                <p id="anime-synopsis">${anime.synopsis}</p>
                <p id="anime-episodes">Number of episodes: ${anime.episodes}</p>
            `;
            imageContainer.innerHTML = ""
            featuredAnime.innerHTML = ""
            imageContainer.appendChild(animeImageDiv);
            featuredAnime.appendChild(animeDataDiv);
        })
        .catch(error => alert("Anime Not Found!"))
}

function saveAnime(e) {
    
}
saveAnime()
function changeColor() {
    featuredAnime.style.color = "#12A386";
}

function changeColorBack() {
    featuredAnime.style.color = "black"
}