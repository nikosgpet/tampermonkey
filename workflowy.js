// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add workflowy styles
// @author       You
// @match        http://workflowy.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }
    
    addGlobalStyle(`
        #pageContainer {
            background-color: beige;
        }
    `);
})();
