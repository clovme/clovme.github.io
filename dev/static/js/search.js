$(window).scroll(function () {
    var header = $('header').height();
    var search = $('.search-content').height();

    if ($(window).scrollTop() >= (header + 4)) {
        $('#menu-wrap').css({
            position: 'relative',
            top: (header + search - 4) + 'px'
        })
    }
    if ($(window).scrollTop() >= (search)) {
        $("#menu-wrap").css({
            position: 'fixed',
            top: (header + 4) + 'px'
        })
    }
});