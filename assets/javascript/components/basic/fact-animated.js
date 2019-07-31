// JavaScript Document
function initFact($obj) {
    var sVal = $obj.data('start');
    var eVal = $obj.data('end');
    var aVal = $obj.data('after');
    var bVal = $obj.data('before');
    
    $obj.text(bVal + sVal + aVal);
}
function animateFact($obj) {
    checkInView($obj);
    
    function updateVals() {
        if (sVal < eVal) {
            if (i < eVal) {
                i = i + increment;
                $obj.text(bVal + i + aVal);
                setTimeout(updateVals, interval);
            } else {
                $obj.removeClass('running');
                $obj.addClass('complete');
            }
        } else {
            if (i > eVal) {
                i = i - increment;
                $obj.text(bVal + i + aVal);
                setTimeout(updateVals, interval);
            } else {
                $obj.removeClass('running');
                $obj.addClass('complete');
            }
        }
    }
    
    if ($obj.hasClass('in-view') && !$obj.hasClass('running') && !$obj.hasClass('complete')) {
        $obj.addClass('running');
        
        var sVal = $obj.data('start');
        var eVal = $obj.data('end');
        var aVal = '';
        var bVal = '';
        var interval = 100;
        var increment = 1;
        var i = sVal;

        if ($obj.data('after')) {
            aVal = $obj.data('after');
        }
        if ($obj.data('before')) {
            bVal = $obj.data('before');
        }
        if ($obj.data('interval')) {
            interval = $obj.data('interval');
        }
        if ($obj.data('increment')) {
            increment = $obj.data('increment');
        }

        setTimeout(updateVals, interval);
    }
}
// ANIMATE FACTS
$( document ).ready(function() {
    $('.fact-animated strong').each(function() {
        initFact($(this));
        animateFact($(this));
    });
});
$( window ).scroll(function() {
    $('.fact-animated strong').each(function() {
        animateFact($(this));
    });
});