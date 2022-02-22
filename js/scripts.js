"use strict;"

function creatingHtml(imgSrc, title, yearRel, runTime, genre, plotDes, id) {
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
                    <p>${plotDes}</p>
                <div id="links">
                    <a href="">Add a new movie</a>
                    <a href="">Edit this movie</a>
                    <a id="${id}" href="">Delete this movie</a>
                </div>
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
