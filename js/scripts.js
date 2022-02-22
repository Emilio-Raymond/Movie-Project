"use strict;"
const BASE = 'https://windy-brawny-lumber.glitch.me/movies'

function getAllMovies() {
    $.get(BASE, function () {
        $(`#movie-insert`).html('Get Your POPCORN READY!')
    }).done(function (results) {
        console.log(results)
        $(`#movie-insert`).html('')
        results.forEach(function (movie) {
            //     if (movie.title === undefined) {
            //
            //         deleteMovie(movie.id)
            //     }
            const HTML = creatingHtml(movie.poster, movie.title, movie.year, 'war', movie.genre, movie.plot)
            $(`#movie-insert`).append(HTML)
        })
    })
}

getAllMovies()


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

function deleteMovie(id) {
    $.ajax({url: `${BASE}/${id}`, type: 'DELETE',}).done(function (data) {
        console.log("deletesuccess")
    })
}

function createMovie() {
    const [title, year, genre, director, rating] = $('form').children()
    return {
        title: title.value,
        yearReleased: year.value,
        genre: genre.value,
        director: director.value,
        rating: rating.value,
    }

}

function addMovie(newMovie) {
    console.log(newMovie);
    $.post(BASE, newMovie).done(function () {
        getAllMovies()
    })
}

$('#createMovie').click(function (e) {
    e.preventDefault();
    addMovie(createMovie())
})