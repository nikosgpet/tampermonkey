// ==UserScript==
// @name         Workflowy scripts
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  try to take over the world!
// @author       You
// @match        https://workflowy.com/*
// @grant        GM_openInTab
// ==/UserScript==

(function() {
    'use strict';

    function addCssFile(file, id) {
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = file;
        link.id   = id;
        link.media = 'all';
        head.appendChild(link);
    }
    
//     addCssFile('https://rawgit.com/nikosgpet/tampermonkey/master/tags.workflowy.css', 'tags_css');
//     addCssFile('https://rawgit.com/nikosgpet/tampermonkey/master/layout.workflowy.css', 'layout_css');
//     addCssFile('https://rawgit.com/nikosgpet/tampermonkey/master/other.workflowy.css', 'other_css');



//         String.prototype.endsWith = function(suffix) {
//             return this.indexOf(suffix, this.length - suffix.length) !== -1;
//         };

//         var customClasses = function(index, old){
//             var classes = old.split(" ");
//             var custom = [];
//             for( i = 0; i < classes.length; i++){
//                 if(classes[i].endsWith("-project")){ custom.push(classes[i]);}
//             }
//             return custom.join(" ");
//         };

//         var StylableTagsCounter = 1;
        setInterval(function(){
//             StylableTagsCounter ++;
//             if( StylableTagsCounter >= 3){
//                 $('.project').removeClass(customClasses);
//                 $('.pageContainer').removeClass(customClasses);
//                 StylableTagsCounter = 0;
//             }
            $('span > .contentTagText').map( function(){
                var x = $(this).text().toLowerCase();
                $(this).parent('.contentTag').parent().parent().parent().addClass(x+"-project");}
            );
        },100);
    
//     function addGlobalStyle(css) {
//         var head, style;
//         head = document.getElementsByTagName('head')[0];
//         if (!head) { return; }
//         style = document.createElement('style');
//         style.type = 'text/css';
//         style.innerHTML = css;
//         head.appendChild(style);
//     }

//     function getId() {
//         var url = location.href.split('#/');
//         return (url.length > 1) ? url[1] : '';
//     }

//     function addCopyButton() {
//         var r='<div id="nikos-button" class="aidoni nikos-button nikos-left">Quick</div>';
//         document.body.insertAdjacentHTML('beforeend', r);
//         let button = document.getElementById('nikos-button');

//         button.addEventListener('click', function(e) {
//             e.preventDefault();
//             GM_openInTab('http://127.0.0.1:4444/workflowy/visualise/?id=' + getId());
//             console.log(url);
//         });

//         var r2='<div id="nikos-button2" class="aidoni nikos-button nikos-right">Download</div>';
//         document.body.insertAdjacentHTML('beforeend', r2);
//         let button2 = document.getElementById('nikos-button2');

//         button2.addEventListener('click', function(e) {
//             e.preventDefault();
//             GM_openInTab('http://127.0.0.1:4444/workflowy/download/?id=' + getId());
//             console.log(url);
//         });
//     }
//     addCopyButton();


//     addGlobalStyle(`
//         .nikos-button {
//             display: inline-block;
//             /*   position: relative; */
//             width: 60px;
//             height: 32px;
//             line-height: 32px;
//             border-radius: 2px;
//             font-size: 0.9em;
//             background-color: #eee;
//             color: #646464;
//             transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
//             transition-delay: 0.2s;
//             box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);

//             text-align: center;

//             cursor: default;
//             opacity: 0.5;
//             z-index: 1000;
//         }

//         .nikos-left {
//             position: fixed;
//             bottom: 20px;
//             left: 20px;
//         }

//         .nikos-right {
//             position: fixed;
//             bottom: 20px;
//             right: 20px;
//         }

//         .nikos-success {
//             z-index: 1000;
//             font-size: 2em;
//             opacity: 0.5;
//             left: 100px;
//         }

//         .nikos-button:active, .nikos-button:hover {
//             opacity: 1;
//         }

//         .nikos-button:active {
//             box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2);
//             transition-delay: 0s;
//         }

//         #nikos-select {
//             position: fixed;
//             left: -1000px;
//         }
//     `);
})();



