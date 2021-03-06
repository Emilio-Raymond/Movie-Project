'use strict';
const BASE = 'http://localhost:8080/movies'

// Gets an array of objects from the server
const getAllMovies = function (sortBy = 'Title') {
    fetch(BASE)
        .then(results => results.json())
        .then((movies) => {
            // Clears the current movie list
            $(`#movies-container`).html('');

            // Uses the return of customSort and loop through the results to post the html
            customSort(movies, sortBy).forEach(function (movie) {
                // If the movie title is undefined, delete the movie
                if (movie.title === undefined || movie.title === "") {
                    deleteMovie(movie.id);
                    getAllMovies();
                }
                const HTML = createMovieCardHtml(movie.poster, movie.title, movie.id);
                $(`#movies-container`).append(HTML);
            })
        })
}
getAllMovies()

// Gets data for one movie based on the id passed in
const getSelectedMovie = (id) => {
    return fetch(`${BASE}/${id}`)
        .then(results => results.json())
        .then(movie => {
            return movie
        })
}

// Adds the movie to the database
const addMovieRequest = (newMovie) => {
    fetch(BASE, {
        method: 'POST',
        body: JSON.stringify(newMovie)
    })
        .then(results => results.json())
        .then(movie => {
            if (movie.toString().startsWith("Duplicate")) {
                alert('This title already exists')
            } else {
                getAllMovies(movie)
            }
        })
}

// Calls the addMovieRequest function based on the results of the title being added
const getMovieData = (title) => {
    let structuredTitle = title.split(' ').join('+')
    $.get(`http://www.omdbapi.com/?apikey=${OMBD_KEY}&t=${structuredTitle}`, function (movie, _, jqXHR) {
        const {Error} = jqXHR.responseJSON
        if (Error === "Movie not found!") {
            alert("Movie not found. Please enter a correct title.");
            return;
        }

        const newMovie = [{
            title: movie.Title,
            director: movie.Director,
            poster: movie.Poster,
            dateReleased: movie.Released,
            yearMade: movie.Year,
            genre: movie.Genre,
            plot: movie.Plot,
            rating: movie.Rated,
            imdb: movie.imdbRating,
            runtime: movie.Runtime,
            actors: movie.Actors,
        }]
        addMovieRequest(newMovie)
        $createMovieForm.addClass('hidden');
        $overlay.addClass('hidden')
        $('#title').val('')
    })
}

//Deletes movie from database
const deleteMovie = (id) => {
    fetch(`${BASE}/${id}`, {
        method: 'DELETE',
    })
        .then(_ => {
            getAllMovies()
            closeAllModals()
        })
}

// Edits the current movie passed in by id and movie data
const editRequest = (id, editedData) => {
    fetch(`${BASE}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(editedData),
    })
        .then(results => results.json())
        .then(_ => getAllMovies('Title'))
}
