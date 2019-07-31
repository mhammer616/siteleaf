// JavaScript Document
function Utils() {}
// IN VIEW UTILITY
Utils.prototype = {
    constructor: Utils,
    isElementInView: function (element, fullyInView) {
        var pageTop = $(window).scrollTop();
        var pageBottom = pageTop + $(window).height();
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).height();
        if (fullyInView === true) {
            return ((pageTop < elementTop) && (pageBottom > elementBottom));
        } else {
            return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
        }
    }
};
// ADD IN VIEW UTILITY
var Utils = new Utils();
// CHECK INVIEW
function checkInView($this, className = 'in-view')
{
    var isElementInView = Utils.isElementInView($this, false);
    if (isElementInView) {
        $this.addClass(className);
    } 
}
$( document ).ready(function() {
    $('.lazyload > *').each(function() {
        checkInView($(this));
    });
});
$( window ).scroll(function() {
    $('.lazyload > *').each(function() {
        if (!$(this).hasClass('in-view')) {
            checkInView($(this));
        }
    });
});