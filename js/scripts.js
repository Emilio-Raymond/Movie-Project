"use strict;"

function creatingHtml(imgSrc, title, id) {
    //language=HTML
    return `
        <div id="movie" class="movie-container">
            <div id="img-div">
                <img src="${imgSrc}" alt="Movie Poster" data-id="${id}">
                <p>${title}</p>
            </div>
        </div>`
}

function singleMovieModal(actors, date, director, genre, imdb, plot, poster, rating, rotten, runtime, title){
    //language=HTML
    return `<p>${title}</p>`
}

function createMovie() {
    const [title] = $('form').children()
    return title.value
}


$('#movie-insert').click(function (event){
    const imgId = event.target.getAttribute('data-id');
    getSelectedMovie(imgId)
})

$('#createMovie').click(function (e) {
    e.preventDefault();
    //addMovie(createMovie())
    getMovieData(createMovie())
})

