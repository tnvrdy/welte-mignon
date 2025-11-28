/*
 * File: main.js
 * -------------
 */
const MIDDLE_C = new Audio("middleC.mp3");

function main() {
    let playButton = document.getElementById("play-button");
    
    let playClickAction = function() {
        MIDDLE_C.play();
    }

    playButton.addEventListener("click", playClickAction);
}