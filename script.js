const api_key = 'a3016ba6049f537e33cb6a0c27a8a821';
const url_path = 'https://api.themoviedb.org/3/movie';
const img_path = 'https://image.tmdb.org/t/p/w500/'
const search_path = 'https://api.themoviedb.org/3/search/movie?api_key=a3016ba6049f537e33cb6a0c27a8a821&language=en-US&query='
let page = 1;

// Query Selectors
const movieGridElement = document.getElementById('movies-grid');
const loadMoreMoviesElement = document.getElementById('load-more-movies-btn');
const searchFormElement = document.getElementById('search-form');
const searchInputElement = document.getElementById('search-input');
const closeSearchButtonElement = document.getElementById('close-search-btn');

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
    let response = await fetch(url_path + '/now_playing?api_key=' + api_key + '&page=' + page.toString());
    let data = await response.json();
    addMoviesGrid (data['results']);
}

async function searchMovie(movieName) {
    console.log('searching...')
    page = 1
    let response = await fetch(search_path + movieName + '&page=' + page.toString());
    let data = await response.json();
    initializeMoviesGrid (data['results']);
}

function showCloseButton(closeSearchButtonElement){
    closeSearchButtonElement.classList.remove('closed')
}

function hidCloseButton(closeSearchButtonElement) {
    searchInputElement.value = '';
    getData();
    closeSearchButtonElement.classList.add('closed');
}

function showLoadMoreButton(loadMoreMoviesElement) {
    closeSearchButtonElement.classList.remove('closed');
}

function hidLoadMoreButton(loadMoreMoviesElement) {
    loadMoreMoviesElement.classList.add('closed');
}

function addEventListeners(loadMoreMoviesElement, searchFormElement, closeSearchButtonElement) {
   
    loadMoreMoviesElement.addEventListener("click", (e) => {   
        e.preventDefault(),     
        getMoreData()
    })
    searchFormElement.addEventListener('submit', (e) => {
        e.preventDefault(),
        searchMovie(searchInputElement.value), 
        showCloseButton(closeSearchButtonElement),
        hidLoadMoreButton(loadMoreMoviesElement)
    })
    closeSearchButtonElement.addEventListener('click', (e)=> {
        e.preventDefault(),
        hidCloseButton(closeSearchButtonElement),
        showLoadMoreButton(loadMoreMoviesElement)
    })
    
}

window.onload = function () {
    getData();
    addEventListeners(loadMoreMoviesElement, searchFormElement, closeSearchButtonElement);
}