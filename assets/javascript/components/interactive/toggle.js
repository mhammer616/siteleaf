/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*
*   Simple toggle pattern example
*/

'use strict';

Array.prototype.slice.call(document.querySelectorAll('.toggle')).forEach(function (toggle) {
    // Create the array of toggle elements for the toggle group
    var toggleNav = toggle.querySelector('nav ul');
    var toggleCb = toggle.querySelector('nav input[type="checkbox"]');
    var triggers = Array.prototype.slice.call(toggle.querySelectorAll('nav button'));
    var panels = Array.prototype.slice.call(toggle.querySelectorAll('div'));

    toggle.addEventListener('click', function (event) {
        var target = event.target;

        if (target.tagName === "BUTTON") {
            // Check if the current toggle is expanded.
            var isExpanded = target.getAttribute('aria-expanded') == 'true';
            var active = toggle.querySelector('[aria-expanded="true"]');

            if (active !== target) {
                // Set the expanded state on the triggering element
                active.setAttribute('aria-expanded', 'false');
                // Hide the toggle sections, using aria-controls to specify the desired section
                document.getElementById(active.getAttribute('aria-controls')).setAttribute('hidden', '');
            }

            if (!isExpanded) {
                // Set the expanded state on the triggering element
                target.setAttribute('aria-expanded', 'true');
                // Hide the toggle sections, using aria-controls to specify the desired section
                document.getElementById(target.getAttribute('aria-controls')).removeAttribute('hidden');
                toggleCb.checked = false;
                toggleNav.style.display = 'none';
                setTimeout(function() {
                    toggleNav.removeAttribute('style');
                }, 100);
            }

            event.preventDefault();
        }
    });

    // Bind keyboard behaviors on the main toggle container
    toggle.addEventListener('keydown', function (event) {
        var target = event.target;
        var key = event.which.toString();
        // 33 = Page Up, 34 = Page Down
        var ctrlModifier = (event.ctrlKey && key.match(/33|34/));

        // Is this coming from an toggle header?
        if (target.tagName === "BUTTON") {
            // Up/ Down arrow and Control + Page Up/ Page Down keyboard operations
            // 37 = Left, 29 = Right
            // 38 = Up, 40 = Down
            if (key.match(/37|39/)) {
                var index = triggers.indexOf(target);
                var direction = (key.match(/34|39/)) ? 1 : -1;
                var length = triggers.length;
                var newIndex = (index + length + direction) % length;
                
                triggers[newIndex].focus();
                
                event.preventDefault();
            } else if (key.match(/35|36/)) {
                // 35 = End, 36 = Home keyboard operations
                switch (key) {
                    // Go to first toggle
                    case '36':
                        triggers[0].focus();
                        break;
                    // Go to last toggle
                    case '35':
                        triggers[triggers.length - 1].focus();
                        break;
                }

                event.preventDefault();
            }
        }
        else if (ctrlModifier) {
            // Control + Page Up/ Page Down keyboard operations
            // Catches events that happen inside of panels
            panels.forEach(function (panel, index) {
                if (panel.contains(target)) {
                    triggers[index].focus();

                    event.preventDefault();
                }
            });
        }
    });
});