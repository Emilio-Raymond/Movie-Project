
// When clicked, generates data for selected movie
// Scrolls to the top of the page
$('#movie-insert').click(function (event) {
    const imgId = event.target.getAttribute('data-id');
    if (imgId !== null) {
        getSelectedMovie(imgId);
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
$('#createMovie').click(function (e) {
    e.preventDefault();
    getMovieData($('#title').val());
})

// When the input is selected on the create movie form,
// enter can be used to initiate a click the createMovie button
$createMovieForm.on('focus', function (e) {
    if (e.key === 'Enter') {
        $('#createMovie').click();
    }
})

// Closes all modals upon the escape key being pressed
$(document).on('keydown', function (e) {
    if (e.key === "Escape") {
        closeModal();
    }
})

// Closes all modals when the overlay is clicked
$overlay.click(closeModal);

// Closes all modals when the close button is clicked
$('#close-form').click(closeModal);

// Closes all modals when the close button is clicked
$('#close-edit-form').click(closeModal);

// Checks to see which link is clicked on the single movie info modal
// calls either the edit or delete functions based on the target
$(`#movie-info`).click(function (e) {
    e.preventDefault();
    if (e.target.getAttribute('id') === 'edit') {
        editFormFill();
    }
    if (e.target.getAttribute('id') === 'delete') {
        deleteMovie($(this).children().attr('data-id'));
    }
})

// passed in the edited values to update the database when clicked
$('#editMovie').click(function (e) {
    e.preventDefault();
    const movieID = $('#movie-info-insert').attr('data-id');
    editRequest(movieID, getEditData());
    $editMovieSection.addClass('hidden');
    $overlay.addClass('hidden')
})

// Sorts list based on change of the select
$('#sort').on('change', function () {
    let sortValue = $('#sort option:selected').val();
    getAllMovies(sortValue);
})
