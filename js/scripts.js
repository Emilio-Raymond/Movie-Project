"use strict;"

const $createMovieForm = $('.create-movie-form');
const $movieInfo = $('#movie-info');
const $overlay = $('.overlay');
const $editMovieSection = $('.edit-movie-section');

const $editTitleInput = $('#editTitle');
const $editYearInput = $('#editYear');
const $editGenreInput = $('#editGenre');

const creatingHtml = function (imgSrc, title, id) {
    //language=HTML
    return `
        <div id="movie" class="movie-container">
            <div>
                <img src="${imgSrc}" alt="Movie Poster" data-id="${id}">
                <p>${title}</p>
            </div>
        </div>`
}

const setIMDBRating = function (imdbRating) {
    if (imdbRating === "N/A") {
        return 'NR'
    } else {
        return `${imdbRating}/10`
    }
}

const singleMovieModal = function (actors, date, director, genre, imdb, plot, poster, rating, runtime, title, year, id) {
    //language=HTML

    return `
        <div id="movie-info-insert" data-id="${id}">
            <img src="${poster}" alt="${title} Movie Poster" id="single-image">
            <div id="main-movie-info">
                <h2>${title}<span>(${year})</span></h2>
                <div class="facts">${rating}<span>${date}</span><span
                        id="single-genre">${genre}</span><span>${runtime}</span></div>
                <div id="ratings"><span>${setIMDBRating(imdb)}</span> IMDB<span></div>
                <div>${plot}</div>
                <div>Actors - ${actors}</div>
                <span>Director - ${director}</span>
                <div id="links">
                    <a href="" id="edit">Edit</a>
                    <a href="" id="delete">Delete</a>
                </div>
            </div>`
}

const closeModal = function () {
    $createMovieForm.addClass('hidden');
    $movieInfo.addClass('hidden');
    $editMovieSection.addClass('hidden');
    $overlay.addClass('hidden');
}

const editFormFill = function () {
    let [title, year] = $('#main-movie-info h2').text().split('(')
    let genre = $('#single-genre').text()
    $editTitleInput.val(title);
    $editYearInput.val(parseInt(year));
    $editGenreInput.val(genre);
    $editMovieSection.removeClass('hidden');
    $movieInfo.addClass('hidden');
}

const getEditData = function (){
    return {
        title: $editTitleInput.val(),
        year: $editYearInput.val(),
        genre: $editGenreInput.val()
    }
}


const customSort = function(movieData, sortBy) {
    if (sortBy === 'Title'){
        return movieData.sort((prevMovie, currMovie) => prevMovie.title.localeCompare(currMovie.title));
    } else if (sortBy === "Rating"){
        return movieData.sort((prevMovie, currMovie) => prevMovie.rating.localeCompare(currMovie.rating));
    } else if (sortBy === "Action" || sortBy === "Adventure" || sortBy === "Comedy" || sortBy === "Drama" || sortBy === "Fantasy" || sortBy === "Horror" || sortBy === "Mystery" || sortBy === "Romance" || sortBy === "Thriller" || sortBy === "War" || sortBy === "Western") {
        return movieData.filter(movie => movie.genre.split(', ').includes(sortBy))
            .sort((prevMovie, currMovie) => prevMovie.title.localeCompare(currMovie.title));
    } else {
        return movieData;
    }
}
