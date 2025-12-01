/*
 * File: main.js
 * -------------
 */

import * as C from './constants.js';
import './style.css';

import MidiParser from "midi-parser-js";

function main() {
    const piano = document.getElementById("piano");
    const playButton = document.getElementById("play-button");

    const keys = [];
    const keyToMIDI = {};
    const audioToMIDI = {};

    layKeys(piano, keys);
    mapMIDI();
    loadComposition();

    /*
     * Function: mapMIDI
     * -----------------
     * Builds objects that map MIDI
     * numbers to key and audio elements.
     */
    function mapMIDI() {
        const getKeyByMidi = midi => keys.find(k => k.midi == midi);
    
        for (let midi of C.MIDI_N) {
            let key = getKeyByMidi(midi);
            keyToMIDI[midi] = key;
            audioToMIDI[midi] = new Audio(`/notes/${key.note}.mp3`);
        }
    }

    /*
     * Function: playAction
     * --------------------
     * Event handler to play song from MIDI-like 
     * dictionary object when the user clicks play.
     */
    function playAction() {
        for (let event of SONG) {
            setTimeout(() => {
                // let key = keyToMIDI[event.midi];
                // key.classList operations
                audioToMIDI[event.midi].play();
            }, event.time * 1000);
        }
    }
    playButton.addEventListener("click", playAction);
}

/*
 * Function: loadComposition
 * -------------------------
 * Fetches MIDI file and parses composition into JSON.
 */
async function loadComposition() {
    const response = await fetch("/public/brahmsUngarischerTanzNo1.mid");
    const arrayBuffer = await response.arrayBuffer();

    let composition = MidiParser.parse(new Uint8Array(arrayBuffer));
    console.log(composition);
}

/*
 * Function: layKeys
 * -----------------
 * Accepts piano div and empty array to hold key elements.
 * Creates and lays piano keys based on white/black, and 
 * populates both the div and the array with these elements.
 */
function layKeys(piano, keys) {
    let numWhite = 0;
    let lastWhiteX = 0;

    for (let n = 0; n < C.NOTES.length; n++) {
        const key = document.createElement("div");  // Using div to avoid pre-made border on img elements.
        key.note = C.NOTES[n];
        key.midi = C.MIDI_N[n];

        key.style.position = "absolute";

        if (key.note.includes("b")) {               // "b" indicates a flat.
            key.classList.add("black-key");
            key.style.left = `${lastWhiteX + C.WHITE_KEY_WIDTH - C.BLACK_KEY_OVERLAP}px`;
            key.style.bottom = `${C.WHITE_KEY_HEIGHT - C.BLACK_KEY_HEIGHT}px`;
        }
        else {
            key.classList.add("white-key");
            lastWhiteX = numWhite * C.WHITE_KEY_WIDTH * C.GAP_FACTOR;
            key.style.left = `${lastWhiteX}px`;
            key.style.bottom = "0px";

            numWhite++;
        }

        keys.push(key);
        piano.appendChild(key);
    }
}

main();