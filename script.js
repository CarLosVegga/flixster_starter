let movieRegistry = [];

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

// Initialize page

async function getData() {
    let response = await fetch(url_path + '/now_playing?api_key=' + api_key + '&page=' + page.toString());
    let data = await response.json();
    initializeMoviesGrid (data['results']);
}

function initializeMoviesGrid(movies) {
    movieGridElement.innerHTML = '';
    movies.forEach(movie => movieRegistry.push(movie));
    movies.forEach(movie => {addMovieCard(movie)});
    console.log(movieRegistry)
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
}

// Load more movies

async function getMoreData(){
    console.log('adding more movies')
    console.log('movie page:' + page.toString())
    page += 1
    let response = await fetch(url_path + '/now_playing?api_key=' + api_key + '&page=' + page.toString());
    let data = await response.json();
    addMoviesGrid (data['results']);
}

function addMoviesGrid(movies) {
    movies.forEach(movie => movieRegistry.push(movie));
    movies.forEach(movie => {addMovieCard(movie)});
}

// Search movies

async function searchMovie(movieName) {
    let response = await fetch(search_path + movieName);
    let data = await response.json();
    initializeSearchMoviesGrid (data['results']);
}

function initializeSearchMoviesGrid(movies) {
    movieGridElement.innerHTML = '';
    movies.forEach(movie => {addMovieCard(movie)});
}

// Retrieve movies

function retrieveMovieRegistry() {
    movieGridElement.innerHTML = '';
    movieRegistry.forEach(movie => {addMovieCard(movie)});
}

// Show and hide functions

function showCloseButton(closeSearchButtonElement){
    closeSearchButtonElement.classList.remove('closed')
}

function hidCloseButton(closeSearchButtonElement) {
    searchInputElement.value = '';
    closeSearchButtonElement.classList.add('closed');
}

function showLoadMoreButton(loadMoreMoviesElement) {
    loadMoreMoviesElement.classList.remove('closed');
}

function hidLoadMoreButton(loadMoreMoviesElement) {
    loadMoreMoviesElement.classList.add('closed');
}

// Event listeners

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
        showLoadMoreButton(loadMoreMoviesElement),
        retrieveMovieRegistry()
    })
}

// Startup functions

window.onload = function () {
    getData();
    addEventListeners(loadMoreMoviesElement, searchFormElement, closeSearchButtonElement);
}