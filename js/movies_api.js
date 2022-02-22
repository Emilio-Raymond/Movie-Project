'use strict';
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
            const HTML = creatingHtml(movie.poster, movie.title, movie.id)
            $(`#movie-insert`).append(HTML)
        })
    })
}

getAllMovies()

function getSelectedMovie(id){
    $.get(`${BASE}/${id}`).done((results) => {
        console.log(results)
       $('#movie-info').html(singleMovieModal(results.actors, results.dateReleased, results.director, results.genre, results.imdb, results.plot, results.poster, results.rating, results.rotten, results.runtime, results.title))
    })
}

function addMovie(newMovie) {
    console.log(newMovie);
    $.post(BASE, newMovie).done(function () {
        getAllMovies()
    })
}

function deleteMovie(id) {
    $.ajax({url: `${BASE}/${id}`, type: 'DELETE',}).done(function (data) {
        console.log("deletesuccess")
    })
}

function getMovieData (title) {
    let structuredTitle = title.split(' ').join('+')
    console.log(structuredTitle)
    $.get(`http://www.omdbapi.com/?apikey=${OMBD_KEY}&t=${structuredTitle}`).done(function (results) {
        console.log(results)
        const {Value} = results.Ratings[1];
        const newMovie = {
            title: results.Title,
            director: results.Director,
            poster: results.Poster,
            dateReleased: results.Released,
            genre: results.Genre,
            plot: results.Plot,
            rating: results.Rated,
            imdb: results.imdbRating,
            runtime: results.Runtime,
            actors: results.Actors,
            rotten: Value,
        }
        addMovie(newMovie)
        $(`.create-movie-form`).toggleClass('hidden')
    })
}
