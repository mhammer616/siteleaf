$( document ).ready(function() {
    $('nav.main > ul > li').has('ul').addClass('accordion');
    $('.open-search').on( "click", function() {
        $('.search-modal').addClass('open');
    });
    $('.close-search').on( "click", function() {
        $('.search-modal').removeClass('open');
    });
    $('.open-menu').on( "click", function() {
        $('.nav-wrapper').addClass('open');
    });
    $('.close-menu').on( "click", function() {
        $('.nav-wrapper').removeClass('open');
    });
});