// JavaScript Document
// DISABLE/ENABLE NAV TOGGLE
var mobileNavVisible = 768;
function toggleNav($obj) {
    if ($obj.width() > mobileNavVisible) {
        $('#toggleNav, [for="toggleNav"]').prop('disabled', true).attr('aria-hidden', true).addClass('disabled');
    } else {
        $('#toggleNav, [for="toggleNav"]').prop('disabled', false).removeAttr('aria-hidden').removeClass('disabled');
    }
}
// DOCUMENT READY
$(document).ready(function() {
    // CHECK WIDTH
    toggleNav($(window));
    // ON RESIZE
    $(window).on('resize', function() {
        toggleNav($(this));
    });
    // INIT OWL CAROUSEL
    $('.owl-carousel').each(function() {
        var options = $(this).data('options');
        $(this).owlCarousel(options);
    });
    // INIT CHOSEN
    $('.chosen').chosen({
        disable_search: true
    });
    // MEDIA GALLERY
    $(".gallery-thumbnails figure").on('click', function() {
        $("#dialogMediaGallery > div").html($(this).clone());
        openDialog('dialogMediaGallery', this);
    });
});