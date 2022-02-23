'use strict';
const BASE = 'https://windy-brawny-lumber.glitch.me/movies'

function getAllMovies() {
    $.get(BASE, function () {
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

function getSelectedMovie(id) {
    $.get(`${BASE}/${id}`).done((results) => {
        console.log(results)
        $('#movie-info').html(singleMovieModal(results.actors, results.dateReleased, results.director, results.genre, results.imdb, results.plot, results.poster, results.rating, results.rotten, results.runtime, results.title)).removeClass('hidden')
        $('.overlay').removeClass('hidden')

    })
}

function addMovie(newMovie) {
    $.post(BASE, newMovie).done(function () {
        getAllMovies()
    })
}

function deleteMovie(id) {
    $.ajax({url: `${BASE}/${id}`, type: 'DELETE',}).done(function (data) {
        console.log("deletesuccess")
    })
}

function getMovieData(title) {
    let structuredTitle = title.split(' ').join('+')
    $.get(`http://www.omdbapi.com/?apikey=${OMBD_KEY}&t=${structuredTitle}`, function (movie, _, jqXHR) {
        const {Error} = jqXHR.responseJSON
        if (Error === "Movie not found!") {
            alert("Movie not found. Please enter a correct title.");
            return;
        }
        let {Value} = movie.Ratings[1] || 'Not Available';
        const newMovie = {
            title: movie.Title,
            director: movie.Director,
            poster: movie.Poster,
            dateReleased: movie.Released,
            genre: movie.Genre,
            plot: movie.Plot,
            rating: movie.Rated,
            imdb: movie.imdbRating,
            runtime: movie.Runtime,
            actors: movie.Actors,
            rotten: Value,
        }
        addMovie(newMovie);
        $(`.create-movie-form`).removeClass('hidden');
        $('#title').val('')
    })
}
