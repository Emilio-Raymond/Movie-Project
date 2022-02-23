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

function singleMovieModal(actors, date, director, genre, imdb, plot, poster, rating, rotten, runtime, title, id) {
    //language=HTML
    return `
        <div id="movie-info-insert" data-id="${id}">
            <div id="movie-info-top">
                <img src="${poster}" alt="${title} Movie Poster">
                <div>
                    <div id="tr">
                        <p>${title}</p>
                        <p>${rating}</p>
                    </div>
                    <p>Director - ${director}</p>
                    <p>Actors - ${actors}</p>
                    <p>Date Released - ${date}</p>
                    <p>Genre - ${genre}</p>
                    <p>IMDB Rating - ${imdb}</p>
                    <p>Rotten Tomatoes Rating - ${rotten}</p>
                    <p>Run Time - ${runtime}</p>
                </div>
            </div>
            <div id="movie-info-plot">
                <p>${plot}</p>
            </div>
            <div id="links">
                <a href="" id="edit">Edit Movie</a>
                <a href="" id="delete">Delete Movie</a>
            </div>
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
    window.scrollTo({top: 0, behavior: "smooth"})
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

$(`#movie-info`).click(function (e) {
    e.preventDefault()
    if (e.target.getAttribute('id') === 'edit'){
        console.log("open edit modal")
    }
    if (e.target.getAttribute('id') === 'delete'){
        deleteMovie($(this).children().attr('data-id'))
    }
})



