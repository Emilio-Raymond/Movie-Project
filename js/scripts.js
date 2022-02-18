"use strict;"
const BASE = 'https://windy-brawny-lumber.glitch.me/movies'
$.get(BASE, function () {
    console.log('loading')
}).done(function (results) {
    console.log(results)
    results.forEach(function (movie) {
        const HTML = creatingHtml(movie.poster, movie.title, movie.year, 'war' , movie.genre, movie.plot)
        $(`#movie-insert`).append(HTML)
    })
})

function creatingHtml(imgSrc, title, yearRel, runTime, genre, plotDes) {
    //language=HTML
    return `
        <div id="movie" class="movie-container">
            <div id="img-div">
                <img src="${imgSrc}"
                     alt="Movie Poster">
            </div>
            <div id="movie-info">
                <p>${title}</p>
                <p>${yearRel}</p>
                <p>${runTime}</p>
                <p>${genre}</p>
            </div>
            <div id="plot">
                <p>${plotDes}</p>
            </div>
        </div>`
}