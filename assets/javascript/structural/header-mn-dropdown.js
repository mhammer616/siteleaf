// JavaScript Document
$(document).ready(function() {
    //$('header nav>ul>li>a').on('focus', function() {
    $('.header-cl nav>ul>li>a').on('focus', function() {
        //$('header nav input[type="checkbox"]').removeProp('checked');
        $('.header-cl nav :checked').prop('checked', false);
    });
});