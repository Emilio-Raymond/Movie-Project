"use strict;"

function creatingHtml(imgSrc, title, yearRel, runTime, genre, plotDes, id) {
    //language=HTML
    return `
        <div id="movie" class="movie-container">
            <div id="img-div">
                <img src="${imgSrc}"
                     alt="Movie Poster">
                <p>${title}</p>
            </div>
        </div>`
}

function createMovie() {
    const [title] = $('form').children()
    return title.value
}

$('#createMovie').click(function (e) {
    e.preventDefault();
    //addMovie(createMovie())
    getMovieData(createMovie())
})
