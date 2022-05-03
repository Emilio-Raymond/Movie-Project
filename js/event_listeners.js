"use strict"
// When clicked, generates data for selected movie
// Scrolls to the top of the page
$('#movies-container').click(function (event) {
    const imgId = event.target.getAttribute('data-id');
    if (imgId !== null) {
        getSelectedMovie(imgId).then(movie => populateSingleMovieInfo(movie));
        window.scrollTo({top: 0, behavior: "smooth"});
    }
})

// Shows the create movie form when Add A New Movie link is clicked
$('#add-movie-modal').click(function (e) {
    e.preventDefault();
    $createMovieForm.removeClass('hidden');
    $overlay.removeClass('hidden');
})

// Calls the getMovieData function to create the new movie when clicked
$('#createMovieBtn').click(function (e) {
    e.preventDefault();
    getMovieData($('#title').val());
})

// When the input is selected on the create movie form,
// enter can be used to initiate a click the createMovie button
$createMovieForm.on('focus', function (e) {
    if (e.key === 'Enter') {
        $('#createMovieBtn').click();
    }
})

// Closes all modals upon the escape key being pressed
$(document).on('keydown', function (e) {
    if (e.key === "Escape") {
        closeAllModals();
    }
})

// Closes all modals when the overlay is clicked
$overlay.click(closeAllModals);

// Closes all modals when the close button is clicked
$('#close-form').click(closeAllModals);

// Closes all modals when the close button is clicked
$('#close-edit-form').click(closeAllModals);

// On click calls the editOrDelete function
$singleMovieInfo.click(editOrDelete.bind());

// Calls the editMovie function when clicked
$('#editMovie').click(editMovie.bind());

// Sorts list based on change of the select
$('#sort').on('change', function () {
    let sortValue = $('#sort option:selected').val();
    getAllMovies(sortValue);
})
