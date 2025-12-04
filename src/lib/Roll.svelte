<script>
    import {ROLL_SPEED} from "./constants";

    export let notes;
    export let keyToMIDI;
    export let songProgress;
    let visibleNotes = [];

    $: visibleNotes = notes.filter(n => {

    })

</script>

<main>
    <div id="roll">
        {#each visibleNotes as note}
            <div 
                class="tile"
                style:left={`${(keyToMIDI[note.midi]).leftX}px`}
                style:height={`${note.duration * ROLL_SPEED}px`}
                style:transform={`translateY(${(note.startTime - songProgress) * ROLL_SPEED}px)`}
            ></div>
        {/each}
    </div>
</main>