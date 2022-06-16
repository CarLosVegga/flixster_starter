const api_key = 'a3016ba6049f537e33cb6a0c27a8a821';
const url_path = 'https://api.themoviedb.org/3/movie';
const img_path = 'https://image.tmdb.org/t/p/w500/'
let page = 1;
// Query Selectors
const movieGridElement = document.getElementById('movies-grid');
const loadMoreMoviesElement = document.getElementById('load-more-movies-btn');

async function getData() {
    let response = await fetch(url_path + '/now_playing?api_key=' + api_key + '&page=' + page.toString());
    let data = await response.json();
    initializeMoviesGrid (data['results']);
}

function initializeMoviesGrid(movies) {
    movieGridElement.innerHTML = '';
    movies.forEach(movie => {addMovieCard(movie)})
}

function addMovieCard(movie){
    movieGridElement.innerHTML += 
    `
    <div class="movie-card" id='${movie.id}'>
        <img class="movie-poster" src="${img_path + movie.poster_path }" alt="${'Poster for ' + movie.original_title}"></img>
        <span class="movie-title">
            ${movie.original_title}
        </span>
        <span class="movie-votes">
            ${movie.vote_average}
        </span>
    </div>
    `;
    console.log(movie.original_title)
}

function addMoviesGrid(movies) {
    movies.forEach(movie => {addMovieCard(movie)})
}

async function getMoreData(){
    page += 1
    console.log(page)
    let response = await fetch(url_path + '/now_playing?api_key=' + api_key + '&page=' + page.toString());
    let data = await response.json();
    addMoviesGrid (data['results']);
}

function addEventListeners(loadMoreMoviesElement) {
    loadMoreMoviesElement.addEventListener("click", (e) => {        
        getMoreData()
      })
    
}

window.onload = function () {
    getData();
    addEventListeners(loadMoreMoviesElement);
}