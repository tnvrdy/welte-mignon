/*
 * File: main.js
 * -------------
 */

function main() {
    const piano = document.getElementById("piano");
    const keys = [];

    createKeys(piano, keys);
}

/*
 * Function: createKeys
 * --------------------
 * Accepts piano div and empty array to hold key elements.
 * Creates all piano keys, lays them out horizontally based
 * on whether white/black, and adds them to div and array.
 */
function createKeys(piano, keys) {
    let numWhite = 0;
    let lastWhiteX = 0;

    for (let n = 0; n < NOTES.length; n++) {
        const key = document.createElement("div");  // Using div to avoid pre-made border on img elements.
        const note = NOTES[n];
        const midi = MIDI_NUMS[n];

        key.style.position = "absolute";

        if (note.includes("#")) {                   // Black keys.
            key.classList.add("black-key");
            key.style.left = (lastWhiteX + WHITE_KEY_WIDTH - BLACK_KEY_OVERLAP) + "px";
            key.style.bottom = (WHITE_KEY_HEIGHT - BLACK_KEY_HEIGHT) + "px";
        }
        else {                                      // White keys.
            key.classList.add("white-key");
            lastWhiteX = numWhite * WHITE_KEY_WIDTH * GAP_FACTOR;
            key.style.left = lastWhiteX + "px";
            key.style.bottom = "0px";

            numWhite++;
        }

        key.dataset.note = note;
        key.dataset.midi = midi;

        keys.push(key);
        piano.appendChild(key);
    }
}
