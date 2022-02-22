"use strict;"
function creatingHtml(imgSrc, title, yearRel, runTime, genre, plotDes) {
    //language=HTML
    return `
        <div id="movie" class="movie-container">
            <div id="img-div">
                <img src="${imgSrc}"
                     alt="Movie Poster">
            </div>
            <div id="movie-info">
                <p>Title: ${title}</p>
                <p>Year Released: ${yearRel}</p>
                <p>Runtime: ${runTime}</p>
                <p>Genre: ${genre}</p>
            </div>
            <div id="plot">
                <p>Plot: </p>
                <p>${plotDes}</p>
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