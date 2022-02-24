"use strict;"

const $createMovieForm = $('.create-movie-form');
const $movieInfo = $('#movie-info');
const $overlay = $('.overlay');
const $editMovieSection = $('.edit-movie-section');

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

const setIMDBRating = function(imdbRating){
    if (imdbRating === "N/A"){
        return 'NR'
    } else{
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
                <div class="facts">${rating}<span>${date}</span><span id="single-genre">${genre}</span><span>${runtime}</span></div>
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

const editFormFill = function (){
    let [title, year] =  $('#main-movie-info h2').text().split('(')
    let genre = $('#single-genre').text()
    $('#editTitle').val(title);
    $('#editYear').val(parseInt(year));
    $('#editGenre').val(genre);
    $editMovieSection.removeClass('hidden');
}




