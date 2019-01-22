// ==UserScript==
// @name         Framapad scripts
// @namespace    http://mypads.framapad.org/
// @version      0.3
// @description  try to take over the world!
// @author       You
// @match        https://mypads.framapad.org/*
// @grant        GM_openInTab
// ==/UserScript==

(function() {
    'use strict';

    $( window ).load(function() {
        function wait_(){
            function addCssFile(head, file) {
                head.append($("<link/>", { rel: "stylesheet", href: file, type: "text/css" }));
            }
            var $head = $('iframe[name="ace_outer"]').contents().find('iframe[name="ace_inner"]').contents().find('head');
            addCssFile($head, 'https://raw.githack.com/nikosgpet/tampermonkey/master/layout.framapad.css');
            var $head = $('iframe[name="ace_outer"]').contents().find('head');
            addCssFile($head, 'https://raw.githack.com/nikosgpet/tampermonkey/master/layout.framapad.css');
            var $head = $('head');
            addCssFile($head, 'https://raw.githack.com/nikosgpet/tampermonkey/master/layout.framapad.css');

        };
        window.setTimeout( wait_, 2000 ); // 2 seconds
    });

})();
