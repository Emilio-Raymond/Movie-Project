"use strict;"
// Declaring global variables for elements that are targeted more than once
const $createMovieForm = $('.create-movie-form');
const $singleMovieInfo = $('#single-movie-modal');
const $overlay = $('.overlay');
const $editMovieSection = $('.edit-movie-section');

const $editTitle = $('#editTitle');
const $editDirector = $('#editDirector');
const $editPoster = $('#editPoster');
const $editDateReleased = $('#editDateReleased');
const $editYearMade = $('#editYearMade');
const $editGenre = $('#editGenre');
const $editPlot = $('#editPlot');
const $editRating = $('#editRating');
const $editImdb = $('#editImdb');
const $editRuntime = $('#editRuntime');
const $editActors = $('#editActors');

// Creates main html for page
const createMovieCardHtml = (imgSrc, title, id) => {
    //language=HTML
    return `
        <div id="movie" class="movie-container">
            <div>
                <img src="${imgSrc}" alt="Movie Poster" data-id="${id}">
                <p>${title}</p>
            </div>
        </div>`
}

// Configures IMDB Rating
const setIMDBRating = (imdbRating) => {
    if (imdbRating === "N/A") {
        return 'NR'
    } else {
        return `${imdbRating}/10`
    }
}

// Creates the html for modal after image is clicked
const populateMovieInfoModalHtml = (actors, date, director, genre, imdb, plot, poster, rating, runtime, title, year, id) => {
    //language=HTML
    return `
        <div id="movie-info-insert" data-id="${id}">
            <img src="${poster}" alt="${title} Movie Poster" id="single-image">
            <div id="main-movie-info">
                <h2>${title}<span>(${year})</span></h2>
                <div class="facts">${rating}<span>${date}</span><span
                        id="single-genre">${genre}</span><span>${runtime}</span></div>
                <div id="ratings"><span>${setIMDBRating(imdb)}</span> IMDB<span></div>
                <div>${plot}</div>
                <div>Actors - ${actors}</div>
                <span>Director - ${director}</span>
                <div id="links">
                    <a href="" id="edit">Edit</a>
                    <a href="" id="delete">Delete</a>
                </div>
            </div>`
}

const populateSingleMovieInfo = (movie) => {
    const ACTORS = movie.actors;
    const DATE_RELEASED = movie.dateReleased;
    const DIRECTOR = movie.director;
    const GENRE = movie.genre;
    const IMDB_RATING = movie.imdb;
    const PLOT = movie.plot;
    const POSTER = movie.poster;
    const MOVIE_RATING = movie.rating;
    const RUNTIME = movie.runtime;
    const TITLE = movie.title;
    const YEAR = movie.yearMade;
    const ID = movie.id;

    $singleMovieInfo
        .html(populateMovieInfoModalHtml(ACTORS, DATE_RELEASED, DIRECTOR, GENRE, IMDB_RATING, PLOT, POSTER, MOVIE_RATING, RUNTIME, TITLE, YEAR, ID))
        .removeClass('hidden')
    $overlay.removeClass('hidden')
    populateEditForm(movie)
}

// Closes all modals
const closeAllModals = _ => {
    $createMovieForm.addClass('hidden');
    $singleMovieInfo.addClass('hidden');
    $editMovieSection.addClass('hidden');
    $overlay.addClass('hidden');
}

// Sets the values for the edit modal
const populateEditForm = (movie) =>{
    $editTitle.val(movie.title);
    $editDirector.val(movie.director);
    $editPoster.val(movie.poster);
    $editDateReleased.val(movie.dateReleased);
    $editYearMade.val(parseInt(movie.yearMade));
    $editGenre.val(movie.genre);
    $editPlot.val(movie.plot);
    $editRating.val(movie.rating);
    $editImdb.val(movie.imdb);
    $editRuntime.val(movie.runtime);
    $editActors.val(movie.actors);
}

// Returns the values to patch the movie
const getEditData = _ => {
    return {
        title: $editTitle.val(),
        director: $editDirector.val(),
        poster: $editPoster.val(),
        dateReleased: $editDateReleased.val(),
        yearMade: $editYearMade.val(),
        genre: $editGenre.val(),
        plot: $editPlot.val(),
        rating: $editRating.val(),
        imdb: $editImdb.val(),
        runtime: $editRuntime.val(),
        actors: $editActors.val(),
    }
}

// Pass in the edited values to update the database when clicked
const editMovie = (event) => {
    event.preventDefault();
    const movieID = $('#movie-info-insert').attr('data-id');
    editRequest(movieID, getEditData());
    $editMovieSection.addClass('hidden');
    $overlay.addClass('hidden')
}

// Checks to see which link is clicked on the single movie info modal
// calls either the edit or delete functions based on the target
const editOrDelete = (event) => {
    event.preventDefault();
    if (event.target.getAttribute('id') === 'edit') {
        $editMovieSection.removeClass('hidden');
        $singleMovieInfo.addClass('hidden');
    }
    if (event.target.getAttribute('id') === 'delete') {
        deleteMovie($singleMovieInfo.children().attr('data-id'));
    }
}

// Custom sort and filter for the movies results
const customSort = (movieData, sortBy) => {
    if (sortBy === 'Title'){
        return movieData.sort((prevMovie, currMovie) => prevMovie.title.localeCompare(currMovie.title));
    } else if (sortBy === "Rating"){
        return movieData.sort((prevMovie, currMovie) => prevMovie.rating.localeCompare(currMovie.rating));
    } else if (sortBy === "Action" || sortBy === "Adventure" || sortBy === "Comedy" || sortBy === "Drama" || sortBy === "Fantasy" || sortBy === "Horror" || sortBy === "Mystery" || sortBy === "Romance" || sortBy === "Thriller" || sortBy === "War" || sortBy === "Western") {
        return movieData.filter(movie => movie.genre.includes(sortBy))
            .sort((prevMovie, currMovie) => prevMovie.title.localeCompare(currMovie.title));
    } else {
        return movieData;
    }
}
