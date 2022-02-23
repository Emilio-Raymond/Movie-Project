"use strict;"

const $createMovieForm = $('.create-movie-form');
const $movieInfo = $('#movie-info');
const $overlay = $('.overlay');

function creatingHtml(imgSrc, title, id) {
    //language=HTML
    return `
        <div id="movie" class="movie-container">
            <div>
                <img src="${imgSrc}" alt="Movie Poster" data-id="${id}">
                <p>${title}</p>
            </div>
        </div>`
}

function singleMovieModal(actors, date, director, genre, imdb, plot, poster, rating, rotten, runtime, title) {
    //language=HTML
    return `
        <img src="${poster}" alt="${title} Movie Poster">
        <div>
            <p>${title}</p>
            <p>${date}</p>
            <p>${director}</p>
            <p>${genre}</p>
            <p>${imdb}</p>
            <p>${plot}</p>
            <p>${rating}</p>
            <p>${rotten}</p>
            <p>${runtime}</p>
        </div>
        <div id="links">
            <a href="">Edit Movie</a>
            <a href="">Delete Movie</a>
        </div>`
}

const closeModal = function () {
    $createMovieForm.addClass('hidden')
    $movieInfo.addClass('hidden')
    $overlay.addClass('hidden');
}

$('#add-movie-modal').click(function (e) {
    e.preventDefault();
    $createMovieForm.removeClass('hidden');
    $overlay.removeClass('hidden');
})

$('#movie-insert').click(function (event) {
    const imgId = event.target.getAttribute('data-id');
    getSelectedMovie(imgId);
})

$('#createMovie').click(function (e) {
    e.preventDefault();
    getMovieData($('#title').val());
})

$createMovieForm.on('focus', function (e) {
    if (e.key === 'Enter') {
        $('#createMovie').click();
    }
})

$overlay.click(function () {
    closeModal()
})

$(document).on('keydown', function (e) {
    if (e.key === "Escape") {
        $('.create-movie-form').addClass('hidden');
        $('#movie-info').addClass('hidden');
        $('.overlay').addClass('hidden');
    }
})

$('#close-form').click(function () {
    closeModal()
})
