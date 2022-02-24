'use strict';
const BASE = 'https://windy-brawny-lumber.glitch.me/movies'

const getAllMovies = function () {
    $.get(BASE, function () {
    }).done(function (results) {
        $(`#movie-insert`).html('')
        results.forEach(function (movie) {
            if (movie.title === undefined) {
                deleteMovie(movie.id)
            }
            const HTML = creatingHtml(movie.poster, movie.title, movie.id)
            $(`#movie-insert`).append(HTML)
        })
    })
}
getAllMovies()

const getSelectedMovie = function (id) {
    $.get(`${BASE}/${id}`).done((results) => {
        console.log(results)
        const ACTORS = results.actors;
        const DATE_RELEASED = results.dateReleased;
        const DIRECTOR = results.director;
        const GENRE = results.genre;
        const IMDB_RATING = results.imdb;
        const PLOT = results.plot;
        const POSTER = results.poster;
        const MOVIE_RATING = results.rating;
        const RUNTIME = results.runtime;
        const TITLE = results.title;
        const YEAR = results.year;
        const ID = results.id;
        $('#movie-info')
            .html(singleMovieModal(ACTORS,DATE_RELEASED,DIRECTOR,GENRE,IMDB_RATING,PLOT,POSTER,MOVIE_RATING,RUNTIME,TITLE,YEAR, ID))
            .removeClass('hidden')
        $overlay.removeClass('hidden')
    })
}

const addMovie = function (newMovie) {
    $.post(BASE, newMovie).done(function () {
        getAllMovies()
    })
}

const deleteMovie = function (id) {
    $.ajax({url: `${BASE}/${id}`, type: 'DELETE',}).done(function (data) {
        console.log("deletesuccess")
        getAllMovies()
        closeModal()
    })
}

const getMovieData = function (title) {
    let structuredTitle = title.split(' ').join('+')
    $.get(`http://www.omdbapi.com/?apikey=${OMBD_KEY}&t=${structuredTitle}`, function (movie, _, jqXHR) {
        const {Error} = jqXHR.responseJSON
        if (Error === "Movie not found!") {
            alert("Movie not found. Please enter a correct title.");
            return;
        }
        console.log(movie)

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
            year: movie.Year,
        }
        addMovie(newMovie);
        $createMovieForm.addClass('hidden');
        $overlay.addClass('hidden')
        $('#title').val('')
    })
}
