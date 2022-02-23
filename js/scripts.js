"use strict;"

const $createMovieForm = $('.create-movie-form');
const $movieInfo = $('#movie-info');
const $overlay = $('.overlay');
const $editMovieSection = $('.edit-movie-section');

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

function singleMovieModal(actors, date, director, genre, imdb, plot, poster, rating, runtime, title, year, id) {
    //language=HTML
    return `
        <div id="movie-info-insert" data-id="${id}">
            <img src="${poster}" alt="${title} Movie Poster" id="single-image">
            <div id="main-movie-info">
                <h2>${title}<span>(${year})</span></h2>
                <div class="facts">${rating}<span>${date}</span><span>${genre}</span><span>${runtime}</span></div>
                <div id="ratings"><span>${imdb}/10</span> IMDB<span></div>
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

$('#add-movie-modal').click(function (e) {
    e.preventDefault();
    $createMovieForm.removeClass('hidden');
    $overlay.removeClass('hidden');
})

$('#movie-insert').click(function (event) {
    const imgId = event.target.getAttribute('data-id');
    if (imgId !== null) {
        getSelectedMovie(imgId);
        window.scrollTo({top: 0, behavior: "smooth"})
    }
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
    closeModal();
})

$(document).on('keydown', function (e) {
    if (e.key === "Escape") {
       closeModal();
    }
})

$('#close-form').click(function () {
    closeModal();
})

$(`#movie-info`).click(function (e) {
    e.preventDefault()
    if (e.target.getAttribute('id') === 'edit') {
        $editMovieSection.removeClass('hidden');
    }
    if (e.target.getAttribute('id') === 'delete') {
        deleteMovie($(this).children().attr('data-id'));
    }
})



