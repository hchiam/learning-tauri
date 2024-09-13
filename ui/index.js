const voice = $('#voice');
const voices = speechSynthesis.getVoices();
const goBtn = $('#go');
const stopBtn = $('#stop');
const skp = $('#skip');
const progress = $('progress');
const s = $('#timer #s');
const txt = $('#text');
const img = $('#image');
const exerciseNames = $('#exerciseNames');
const audio = $('#audio');
const dflt = $('#default');
const exerciseS = 30; // typically
const breakS = 10; // typically
let tmt = null;
const defaultThingsToDo = [
    { what: 'GET READY', seconds: 0 },
    { what: '5', seconds: 1 },
    { what: '4', seconds: 1 },
    { what: '3', seconds: 1 },
    { what: '2', seconds: 1 },
    { what: '1', seconds: 1 },
    { what: 'Jumping Jacks (1 of 12)', seconds: exerciseS },
    { what: 'Break', seconds: breakS },
    { what: 'Wall Sit (2 of 12)', seconds: exerciseS },
    { what: 'Break', seconds: breakS },
    { what: 'Push-Ups (3 of 12)', seconds: exerciseS },
    { what: 'Break', seconds: breakS },
    { what: 'Crunches (4 of 12)', seconds: exerciseS },
    { what: 'Break', seconds: breakS },
    { what: 'Step-up Onto Chair (5 of 12)', seconds: exerciseS },
    { what: 'Break', seconds: breakS },
    { what: 'Squats (6 of 12)', seconds: exerciseS },
    { what: 'Break', seconds: breakS },
    { what: 'Triceps Dip On Chair (7 of 12)', seconds: exerciseS },
    { what: 'Break', seconds: breakS },
    { what: 'Plank (8 of 12)', seconds: exerciseS },
    { what: 'Break', seconds: breakS },
    { what: 'High Knees or Run In Place (9 of 12)', seconds: exerciseS },
    { what: 'Break', seconds: breakS },
    { what: 'Lunges (10 of 12)', seconds: exerciseS },
    { what: 'Break', seconds: breakS },
    { what: 'Push-ups And Rotations (11 of 12)', seconds: exerciseS },
    { what: 'Break', seconds: breakS },
    { what: 'Side Plank (12 of 12)', seconds: 15 },
    { what: 'Side Plank - Other Side', seconds: 15 },
    { what: 'Break', seconds: breakS },
    { what: 'DONE!', seconds: 0 },
];
let thingsToDo = [...defaultThingsToDo];

populateVoices();
speechSynthesis.addEventListener?.('voiceschanged', () => {
    populateVoices();
});
populateThingsToDo();
goBtn.on('click', go);
stopBtn.on('click', stop);
dflt.on('click', useDefaultExercises);
exerciseNames.on('change keyup', () => {
    thingsToDo = String(exerciseNames.val()).trim().split('\n').map(x => {
        const linePieces = x.split(',');
        return { what: linePieces[1], seconds: linePieces[0] };
    });
    localStorage.hchiam8mhiit = JSON.stringify(thingsToDo);
});

function populateThingsToDo() {
    if (localStorage.hchiam8mhiit) {
        try {
            const localStorageData = JSON.parse(localStorage.hchiam8mhiit);
            if (localStorageData && Array.isArray(localStorageData)) {
                thingsToDo = localStorageData;
            }
        } catch (e) { }
    }

    if (!String(exerciseNames.val()).trim()) {
        const val = thingsToDo.map(x => x.seconds + ',' + x.what).join('\n');
        exerciseNames.val(val);
        progress.val(0);
    } else {
        thingsToDo = String(exerciseNames.val()).trim().split('\n').map(x => {
            const linePieces = x.split(',');
            return { what: linePieces[1], seconds: linePieces[0] };
        });
        progress.val(0);
        progress.prop('max', thingsToDo.length);
        localStorage.hchiam8mhiit = JSON.stringify(thingsToDo);
    }
}

function useDefaultExercises() {
    const val = defaultThingsToDo.map(x => x.seconds + ',' + x.what).join('\n');
    exerciseNames.val(val);
    delete localStorage.hchiam8mhiit;
}

async function go() {
    goBtn.prop('disabled', true);
    stopBtn.prop('disabled', false);
    populateThingsToDo();
    for (let i = 0; i < thingsToDo.length; i++) {
        const thing = thingsToDo[i];
        const progressValue = i + 1;
        await action(thing);
        progress.val(progressValue, thingsToDo.length);
    }
    goBtn.prop('disabled', false);
    stopBtn.prop('disabled', true);
    txt.text('');
}

function stop() {
    clearInterval(tmt);
    goBtn.prop('disabled', false);
    stopBtn.prop('disabled', true);
    say('Stopped and cleared.', 'en');
    s.val('00');
    txt.text('');
}

async function action(thing) {
    const { what, seconds } = thing;
    say(what);
    return new Promise((resolve) => {
        txt.text(what);
        s.val(String(Number(seconds)).padStart(2, 0));
        clearInterval(tmt);
        tmt = setInterval(() => {
            s.val(String(Math.max(0, s.val() - 1)).padStart(2, 0));
            if (Number(s.val()) <= 0) {
                clearInterval(tmt);
                resolve(true);
            }
            beep();
        }, 1000);
    });
}

function populateVoices() {
    if (voices.length) {
        voices.sort((a, b) => a.lang.localeCompare(b.lang));
        voice.html(voices.map(x => {
            const selected = x.lang === 'en-US' ? 'selected' : '';
            return `<option value="${x.lang}" ${selected}>${x.lang}</option>`;
        }));
        voice.parent().show();
    } else {
        voice.html(`<option value="en-US" selected>en-US</option>`)
        voice.parent().hide();
    }
}

function say(what, voiceLang, callback) {
    if (!audio.is(':checked')) return;

    const utterance = new SpeechSynthesisUtterance(what);
    voiceLang = voiceLang ?? voice.val();
    utterance.voice = voiceLang
        ? voices.filter((v) => v.lang === voiceLang)[0]
        : voices[0];
    utterance.onend = callback;
    if (utterance.voice?.voiceURI) {
        utterance.voiceURI = utterance.voice.voiceURI;
    }
    if (utterance.voice?.lang) {
        utterance.lang = utterance.voice.lang;
    }
    speechSynthesis.speak(utterance);
}

function beep() {
    if (!audio.is(':checked')) return;

    const sound = new Audio(
        "data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU="
    );
    sound.play();
}
