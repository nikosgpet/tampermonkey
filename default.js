// ==UserScript==
// @name         Copy button
// @namespace    http://tampermonkey.net/
// @version      0.8
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @exclude      https://workflowy.com/*
// @run-at       document-end
// @noframes
// @require      https://cdnjs.cloudflare.com/ajax/libs/mousetrap/1.6.1/mousetrap.min.js
// @grant        GM_xmlhttpRequest
// @connect      0.0.0.0
// @connect      13.59.21.50
// @connect      www.studesko.com
// ==/UserScript==

(function() {
    'use strict';

    //alert('Button added');

    function formatDate(d) {
        //increment month by 1 since it is 0 indexed
        var month = (d.getMonth() + 1).toString();
        //if month is 1-9 pad right with a 0 for two digits
        if (month.length === 1) {
            month = "0" + month;
        }
        var day = d.getDate().toString();
        if (day.length === 1) {
            day = "0" + day;
        }
        //pull the last two digits of the year
        var year = d.getFullYear().toString().substr(-2);

        //return the string "yymmdd"
        return year + month + day;
    }

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

    function getTitle() {
        var date_tag = '#ref_' + formatDate(new Date()) + '_' + document.title.split(' ')[0].toLowerCase();
        return '#ref ' + escapeHtml(document.title) + ' ' + date_tag ;
    }

    function getNote() {
        return escapeHtml(location.href);
    }

    function getSelectionText() {
        var text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
        }
        return text;
    }

    function getSelectionTextOutlined() {
        var text = getSelectionText();
        // Split by change of line and remove empty lines
        var textArray = text.split(/\r?\n/).filter(function(e){return e;});

        var reformattedArray = textArray.map(function(text) {
            return '<outline text="' + text + '" />';
        });
        return reformattedArray.join('');
    }

    function addElementToCopy() {
        // Tag in format #yymmdd_title
        var url = location.protocol + '//' + location.host + location.pathname;
        var text = '<opml><body><outline text="' + getTitle() + '" _note="' + getNote() + '">' + '</outline></body></opml>';

        var r='<input id="nikos-select" value="' + text + '"/><div id="nikos-button" class="aidoni nikos-button nikos-left"> Copy </div>';
        //$("body").append(r);
        document.body.insertAdjacentHTML('beforeend', r);
        //$('#nikos-select').val(text);
        document.getElementById("nikos-select").value = text;

        let button = document.getElementById('nikos-button');

        button.addEventListener('click', function(e) {
            e.preventDefault();
            copyText();
        });
    }

    function copyText() {
        var selectedText = getSelectionText();
        console.log(selectedText);

        addElementToCopy();
        document.execCommand('copy', false, document.getElementById('nikos-select').select());

        var url = "http://13.59.21.50/wfapi/";
//        var url = "http://0.0.0.0/wfapi/";
        var data = "note=" + encodeURIComponent(getNote()) + "&title=" + encodeURIComponent(getTitle()) + "&text=" + encodeURIComponent(selectedText);

        GM_xmlhttpRequest({
            method: "POST",
            url: url,
            data: data,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            onload: function(response) {
                console.log(data);
            }
        });

    }

    Mousetrap.bind('c c', function() { copyText(); });

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

