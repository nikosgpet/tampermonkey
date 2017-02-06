// ==UserScript==
// @name         Copy button
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  try to take over the world!
// @author       You
// @require      https://raw.githubusercontent.com/nikosgpet/tampermonkey/master/workflowy.js
// @match        https://*/*
// @exclude      https://workflowy.com/*
// @grant        none
// @run-at       document-end
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    //alert('Button added');
    function escapeHtml(text) {
      var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };

      return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }

    var url = location.protocol + '//' + location.host + location.pathname;
    var text = '<opml><body><outline text=\'#ref ' + escapeHtml(document.title) + '\' _note=\'' + escapeHtml(location.href) + ' \'/></body></opml>';

    var r='<input id="nikos-select" value="' + text + '"/><div id="nikos-button" class="aidoni nikos-button nikos-left"> Copy </div>';
    //$("body").append(r);
    document.body.insertAdjacentHTML('beforeend', r);
    //$('#nikos-select').val(text);
    document.getElementById("nikos-select").value = text;

    let button = document.getElementById('nikos-button');

    button.addEventListener('click', function(e) {
      e.preventDefault();
      document.execCommand('copy', false, document.getElementById('nikos-select').select());
    });

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
        .nikos-button {  
            display: inline-block;
            /*   position: relative; */
            width: 60px;
            height: 32px;
            line-height: 32px;
            border-radius: 2px;
            font-size: 0.9em;
            background-color: #eee;
            color: #646464;
            transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            transition-delay: 0.2s;
            box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);

            text-align: center;

            cursor: default;
            opacity: 0.5;
            z-index: 1000;
        }

        .nikos-left {
            position: fixed;
            bottom: 20px;
            left: 20px; 
        }
  
        .nikos-right {
            position: fixed;
            bottom: 20px;
            right: 20px; 
        }

        .nikos-button:active, .nikos-button:hover {
            opacity: 1;
        }

        .nikos-button:active {
            box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2);
            transition-delay: 0s;
        }

        #nikos-select {
            position: fixed;
            left: -1000px;
        }
    `);
})();

