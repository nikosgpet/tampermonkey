// ==UserScript==
// @name         Workflowy scripts
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @require      https://raw.githubusercontent.com/nikosgpet/tampermonkey/master/workflowy.js
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.onload = function(){

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

    var url = location.protocol + '//' + location.host + location.pathname
    var text = '<opml><body><outline text=\'#ref ' + escapeHtml(document.title) + '\' _note=\'' + escapeHtml(location.href) + ' \'/></body></opml>';

    var r='<input id="nikos-select" value="' + text + '"/><div id="nikos-button" class="peristeri nikos-button nikos-left"> Copy </div>';
    //$("body").append(r);
    document.body.insertAdjacentHTML('beforeend', r)
    //$('#nikos-select').val(text);
    document.getElementById("nikos-select").value = text;

    let button = document.getElementById('nikos-button');

    button.addEventListener('click', function(e) {
      e.preventDefault();
      document.execCommand('copy', false, document.getElementById('nikos-select').select());
    });

    };

})();

