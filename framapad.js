// ==UserScript==
// @name         Framapad scripts
// @namespace    http://mypads.framapad.org/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://mypads.framapad.org/*
// @grant        GM_openInTab
// ==/UserScript==

(function() {
    'use strict';
    
    var $head = $('iframe[name="ace_outer"]').contents().find('iframe[name="ace_inner"]')[0];
    
    function addCssFile(file) {
        $head.append($("<link/>", { rel: "stylesheet", href: file, type: "text/css" }));
    }
    addCssFile('https://rawgit.com/nikosgpet/tampermonkey/master/tags.workflowy.css');
})();
