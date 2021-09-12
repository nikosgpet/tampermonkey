// ==UserScript==
// @name         Copy button
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Adds copy button in all pages :D
// @author       You
// @match        *://*/*
// @exclude      https://workflowy.com/*
// @exclude      https://music.youtube.com/*
// @exclude      https://www.inoreader.com/*
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

    // Throtlle function as shown here https://codeburst.io/throttling-and-debouncing-in-javascript-646d076d0a44
    function throttled(delay, fn) {
        let lastCall = 0;
        return function (...args) {
            const now = (new Date).getTime();
            if (now - lastCall < delay) {
                return;
            }
            lastCall = now;
            return fn(...args);
        }
    }

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

    function isAmazon() {
        return document.location.host.includes("amazon");
    }

    function isGoogleDriveImage() {
        return document.location.href.includes("drive.google.com/file/d/");
    }

    function isGoogleSearch() {
        return /google\..*\/search/.exec(document.location.href);
    }

    function getTitle() {
        let title = document.title;
        if (isAmazon()) {
            let author = "";
            title = document.getElementById("productTitle").innerHTML;
            try {
                const links = document.getElementsByClassName("author")[0].getElementsByClassName("a-link-normal");
                author = links[links.length - 1].innerHTML;
                title += " - " + author;
                create_date_tag = false;
            } catch(err) {
                console.log(`Error: ${err}.`);
            }

            try {
                const pages = productDetailsTable.innerText.match("([0-9]*) page")[1];
                title = "[" + pages + "] " + title;
            } catch(err) {
                console.log(`Error: ${err}.`);
            }
        } else if (isGoogleDriveImage()) {
            return '![](https://drive.google.com/uc?id=' + document.location.href.match("d/(.*)/view")[1] + ')';
        } else if (isGoogleSearch()) {
            const search = document.getElementById("lst-ib").value;
            return '#search ' + search;
        }
        return title;
    }

    function getText(create_ref_tag = false, create_date_tag = false) {
        const title = getTitle();
        const date_tag = (create_date_tag) ? ' #ref_' + formatDate(new Date()) + '_' + title.split(/[^a-zA-Z0-9]+/)[0].toLowerCase() : "";
        const ref_tag = (create_ref_tag) ? '#ref ' : "";

        return escapeHtml(ref_tag + title + date_tag);
    }

    function getUrl() {
        if (isAmazon())
            return location.href.split('ref=')[0];
        return location.href.split('?')[0];
    }

    function getNote() {
        const url = getUrl();
        return escapeHtml(`<a href="${url}">${url}</a>`);
    }

    function copyText() {
        const text = `<opml><body><outline text='${getText()}' _note='${getNote()}'> </outline></body></opml>`;
        navigator.clipboard.writeText(text)
    }

    function copyTextMd() {
        const text = `[${getTitle()}](${getUrl()})`;
        navigator.clipboard.writeText(text)
    }

    function addCopyButton() {
        // Tag in format #yymmdd_title
        const r=`
        <div id="nk-btn-area" class="nk-btn-area nk-btn__left">
            <div id="nk-btn" class="nk-btn"> W </div>
            <div id="nk-btn-md" class="nk-btn"> md </div>
        </div>
        `;

        document.body.insertAdjacentHTML('beforeend', r);

        document.getElementById('nk-btn').addEventListener('click', function(e) {
            e.preventDefault();
            copyText();
        });

        document.getElementById('nk-btn-md').addEventListener('click', function(e) {
            e.preventDefault();
            copyTextMd();
        });

        document.body.addEventListener("mousemove", throttled(200, nkOnMouseMove), false);
    }

    function nkOnMouseMove(e) {
        const distance = Math.floor(Math.sqrt(Math.pow(e.clientX - 75, 2) + Math.pow(e.clientY - window.innerHeight, 2)));
        (distance < 250) ? 
            document.getElementById("nk-btn-area").classList.add("show") : 
            document.getElementById("nk-btn-area").classList.remove("show"); 
    }

    addCopyButton();


    // function getSelectionText() {
    //     var text = "";
    //     if (window.getSelection) {
    //         text = window.getSelection().toString();
    //     } else if (document.selection && document.selection.type != "Control") {
    //         text = document.selection.createRange().text;
    //     }
    //     return text;
    // }

    // function getSelectionTextOutlined() {
    //     var text = getSelectionText();
    //     // Split by change of line and remove empty lines
    //     var textArray = text.split(/\r?\n/).filter(function(e){return e;});

    //     var reformattedArray = textArray.map(function(text) {
    //         return '<outline text="' + text + '" />';
    //     });
    //     return reformattedArray.join('');
    // }

    // function sendTextToServer() {
    //     var r="<div class='nk-btn__success nk-btn__right'>*️⃣</div>";
    //     document.body.insertAdjacentHTML('beforeend', r);
    //     var selectedText = getSelectionText();
    //     var url = "http://13.59.21.50/wfapi/";
    //     // var url = "http://0.0.0.0/wfapi/";
    //     var data = "note=" + encodeURIComponent(getNote()) + "&title=" + encodeURIComponent(getText()) + "&text=" + encodeURIComponent(selectedText);

    //     GM_xmlhttpRequest({
    //         method: "POST",
    //         url: url,
    //         data: data,
    //         headers: {
    //             "Content-Type": "application/x-www-form-urlencoded"
    //         },
    //         onload: function(response) {
    //             console.log(data);
    //             var r="<div class='nk-btn__success nk-btn__right'>✅</div>";
    //             document.body.insertAdjacentHTML('beforeend', r);
    //         }
    //     });
    // }

    // Mousetrap.bind('c c', function() { sendTextToServer(); });

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
        :root {
            --nk-btn-bottom: 20px;
            --nk-btn-side: 40px;
        }

        .nk-btn {
            pointer-events: all; 
            font-family: Arial;
            display: inline-block;
            padding: 0 12px;
            height: 32px;
            line-height: 32px;
            border-radius: 40px;
            font-size: 14px;
            background-color: #eee;
            color: #646464;
            transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.1s ease;
            transition-delay: 0.2s;
            box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
            text-align: center;
            cursor: default;
            opacity: 0;
            z-index: 1000000;
        }

        .nk-btn-area.show .nk-btn {
            opacity: 1;
        }

        .nk-btn__left {
            position: fixed;
            bottom: var(--nk-btn-bottom);
            left: var(--nk-btn-side);
            z-index: 1000000;
        }

        .nk-btn__right {
            position: fixed;
            bottom: var(--nk-btn-bottom);
            right: var(--nk-btn-side);
            z-index: 1000000;
        }

        .nk-btn__success {
            z-index: 1000;
            font-size: 2em;
            opacity: 0.5;
            left: 100px;
        }

        .nk-btn:hover {
            cursor: pointer;
        }

        .nk-btn:active {
            box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2);
            //transition-delay: 0s;
        }
    `);
})();