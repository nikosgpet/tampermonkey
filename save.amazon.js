// ==UserScript==
// @name         Save button
// @namespace    http://tampermonkey.net/
// @version      0.2
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

    function addSaveButton() {
        // Tag in format #yymmdd_title
        var r='<div id="nikos-save" class="aidoni nikos-button nikos-right"> Save </div>';
        document.body.insertAdjacentHTML('beforeend', r);
        let button = document.getElementById('nikos-save');

        button.addEventListener('click', function(e) {
            e.preventDefault();
            open_book_viewer();
        });
    }

    Mousetrap.bind('s s', function() { open_book_viewer(); });
    addSaveButton();

})();

