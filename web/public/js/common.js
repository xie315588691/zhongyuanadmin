$(document).ready(function () {
    if ($(document).scrollTop() != 0) {
        $('.header').addClass('header-hover');
    }
    $(window).scroll(function () {
        if ($(document).scrollTop() == 0) {
            $('.header').removeClass('header-hover');
        } else {
            if (!$('.header').hasClass('header-hover')) {
                $('.header').addClass('header-hover');
            }
        }
    });
    $(".btn-m-list").click(function () {
        $(this).addClass('on');
        $(".neirong").addClass('neirong-show');
    });
    $(".neirong .neirong-close").click(function () {
        $(".neirong").removeClass('neirong-show');
        $(".btn-m-list").removeClass('on');
    });
    $('.backtop').click(function () {
        $('html,body').animate({scrollTop: '0px'}, 1000);
        return false;
    });
    $('.sub-mouse').click(function () {
        $('html,body').animate({scrollTop: $(".bannerwarp").height()}, 1000);
        return false;
    });
});