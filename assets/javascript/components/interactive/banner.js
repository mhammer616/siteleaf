/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*
*   Simple accordion pattern example
*/

'use strict';

Array.prototype.slice.call(document.querySelectorAll('.banner')).forEach(function (banner) {
  banner.addEventListener('click', function (event) {
    var target = event.target;
    
    if (target.tagName === "BUTTON") {
        banner.remove();
        event.preventDefault();
    }
  });
});