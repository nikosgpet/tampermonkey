// ==UserScript==
// @name         Save button
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds save button in amazon pages
// @author       You
// @match        *://www.amazon.com/*
// @run-at       document-end
// @noframes
// @require      https://cdnjs.cloudflare.com/ajax/libs/mousetrap/1.6.1/mousetrap.min.js
// ==/UserScript==

(function() {
    'use strict';

    //alert('Button added');

    function open_book_viewer() {
        var url = 'http://13.59.21.50/books/search/?url=' + location.href.split('ref=')[0];
        window.open(url,'_blank');
        win.focus();
    }

    Mousetrap.bind('s s', function() { open_book_viewer(); });

})();
