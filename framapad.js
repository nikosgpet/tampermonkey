// ==UserScript==
// @name         Framapad scripts
// @namespace    http://mypads.framapad.org/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://mypads.framapad.org/*
// @grant        GM_openInTab
// ==/UserScript==

(function() {
    'use strict';

    $( window ).load(function() {
        function wait_(){
            console.log('nikos2');
            function addCssFile(file) {
                console.log($('body')[0]);
                console.log($('[name="ace_outer"]')[0]);
                var $head = $('iframe[name="ace_outer"]').contents().find('iframe[name="ace_inner"]');
                console.log($head);
                $head.append($("<link/>", { rel: "stylesheet", href: file, type: "text/css" }));
            }
            addCssFile('https://rawgit.com/nikosgpet/tampermonkey/master/tags.workflowy.css');
        };
        window.setTimeout( wait_, 2000 ); // 2 seconds
    });

})();
