// ==UserScript==
// @name         Reorder YT Playlists
// @version      0.1
// @description  On Save to playlist button click, reorder the list of playlists alphabetically
// @author       DWM7721
// @match        *://*.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    function doListsSort() {
        // get all the immediate child items into an array
        // and sort them by the sub child's title that matches the name of the playlist
        Array.prototype.slice.call(document.querySelector('div#playlists').children)
            .sort(function (a, b) {
                var A = a.childNodes[1].childNodes[2].childNodes[1].childNodes[1].childNodes[1].title;
                var B = b.childNodes[1].childNodes[2].childNodes[1].childNodes[1].childNodes[1].title;
                return A > B ? 1 : -1;
            })
            .forEach(function (label) {
                // add each sorted element back into the div
                document.querySelector('div#playlists').appendChild(label);
            })
    }

    //set a listener for the entire document instead of querying for the specific "Save" button
    document.onclick = function (event) {
        if (event === undefined) event = window.event;
        var target = 'target' in event ? event.target : event.srcElement;
        // Targetting main video page (Save) and Home page (Save to playlist)
        if (target.innerHTML === "Save" || target.innerHTML === "Save to playlist") {
            let timeout;
            timeout = setTimeout(doListsSort, 2000);
        }
        // ~2second delay is needed for the first click because the div does not exist until
        // the button is clicked for the first time
    };
})();