"use strict;"

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
        <div>
            <img src="${poster}" alt="${title} Movie Poster">
            <p>${title}</p>
            <p>${date}</p>
            <p>${director}</p>
            <p>${genre}</p>
            <p>${imdb}</p>
            <p>${plot}</p>
            <p>${rating}</p>
            <p>${rotten}</p>
            <p>${runtime}</p>
        </div>`
}

$('#add-movie-modal').click(function (e) {
    e.preventDefault();
    $('.create-movie-form').toggleClass('hidden')
})

$('#movie-insert').click(function (event) {
    const imgId = event.target.getAttribute('data-id');
    getSelectedMovie(imgId);
})

$('#createMovie').click(function (e) {
    e.preventDefault();
    getMovieData($('#title').val());
})
$('.create-movie-form').on('focus', function (e){
    if (e.key === 'Enter') {
        $('#createMovie').click();
    }
})

