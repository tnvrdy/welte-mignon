/*
 * File: main.js
 * -------------
 */

const SONG = [ // Just some C's to test playing functionality.
    {time: 0.0, midi: 60},
    {time: 0.5, midi: 72},
    {time: 1.0, midi: 84}
];

function main() {
    const piano = document.getElementById("piano");
    const playButton = document.getElementById("play-button");

    const keys = [];
    const keyToMIDI = {};
    const audioToMIDI = {};

    layKeys(piano, keys);
    mapMIDI();

    /*
     * Function: mapMIDI
     * -----------------
     * Builds objects that map MIDI
     * numbers to key and audio elements.
     */
    function mapMIDI() {
        const getKeyByMidi = midi => keys.find(k => k.midi == midi);
    
        for (let midi of MIDI_N) {
            let key = getKeyByMidi(midi);
            keyToMIDI[midi] = key;
            audioToMIDI[midi] = new Audio(`notes/${key.note}.mp3`);
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
 * Function: layKeys
 * -----------------
 * Accepts piano div and empty array to hold key elements.
 * Creates and lays piano keys based on white/black, and 
 * populates both the div and the array with these elements.
 */
function layKeys(piano, keys) {
    let numWhite = 0;
    let lastWhiteX = 0;

    for (let n = 0; n < NOTES.length; n++) {
        const key = document.createElement("div");  // Using div to avoid pre-made border on img elements.
        key.note = NOTES[n];
        key.midi = MIDI_N[n];

        key.style.position = "absolute";

        if (key.note.includes("b")) {               // "b" indicates a flat.
            key.classList.add("black-key");
            key.style.left = `${lastWhiteX + WHITE_KEY_WIDTH - BLACK_KEY_OVERLAP}px`;
            key.style.bottom = `${WHITE_KEY_HEIGHT - BLACK_KEY_HEIGHT}px`;
        }
        else {
            key.classList.add("white-key");
            lastWhiteX = numWhite * WHITE_KEY_WIDTH * GAP_FACTOR;
            key.style.left = `${lastWhiteX}px`;
            key.style.bottom = "0px";

            numWhite++;
        }

        keys.push(key);
        piano.appendChild(key);
    }
}
