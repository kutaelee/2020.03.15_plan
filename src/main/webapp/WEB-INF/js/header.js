$(document).ready(function () {
    var path = $(location).attr('pathname').split('/');
    var width = screen.width;
    if (!path[2]) {
        $('#index-btn').css('color', 'white');
    } else {
        $('#' + path[2] + '-btn').css('color', 'white');
    }

    if (width < 700) {
        $('#join').insertAfter('#login');
    }
    $(document).on('click', '.nav-toggle', function () {
        $('#nav-toggle').attr('class', 'nav-active');
        $('.nav').fadeIn();
    });

    $(document).on('click', '.nav-active', function () {
        $('#nav-toggle').attr('class', 'nav-toggle');
        $('.nav').fadeOut();
    });
});
