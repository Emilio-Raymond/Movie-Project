$('#add-movie-modal').click(function (e) {
    e.preventDefault();
    $createMovieForm.removeClass('hidden');
    $overlay.removeClass('hidden');
})

$('#movie-insert').click(function (event) {
    const imgId = event.target.getAttribute('data-id');
    if (imgId !== null) {
        getSelectedMovie(imgId);
        window.scrollTo({top: 0, behavior: "smooth"})
    }
})

$('#createMovie').click(function (e) {
    e.preventDefault();
    getMovieData($('#title').val());
})

$createMovieForm.on('focus', function (e) {
    if (e.key === 'Enter') {
        $('#createMovie').click();
    }
})

$overlay.click(function () {
    closeModal();
})

$(document).on('keydown', function (e) {
    if (e.key === "Escape") {
        closeModal();
    }
})

$('#close-form').click(function () {
    closeModal();
})

$(`#movie-info`).click(function (e) {
    e.preventDefault()
    if (e.target.getAttribute('id') === 'edit') {
        editFormFill();
    }
    if (e.target.getAttribute('id') === 'delete') {
        deleteMovie($(this).children().attr('data-id'));
    }
})
