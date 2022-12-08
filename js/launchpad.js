// *** Launchpad code ***
console.log(navigator);
let device;

if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(success, failure);
}

function failure() {
    console.log("*** Could not connect MIDI");
}

function updateDevices(event) {
    console.log(event);
}

function success(midiAccess) {
    console.log(midiAccess);
    midiAccess.addEventListener('statechange', updateDevices);
    const inputs = midiAccess.inputs;
    //console.log(inputs);

    for (let output of midiAccess.outputs.values()) {
        device = output
        //console.log('Output device selected', device)
    }

    inputs.forEach((input) => {
        //console.log(input);
        input.addEventListener('midimessage', handleInput);
    });
}

function handleInput(input) {
    //console.log(input);
    let command = input.data[0];
    let note = input.data[1];
    let velocity = input.data[2];
    //console.log(input.data);
    //console.log(`command: ${command}, note: ${note}, velocity: ${velocity}`);
    if (velocity > 0) {
        noteOn(note);
    }
    if (velocity == 0) {
        noteOff(note);
    }
}

function noteOn(note) {
    console.log(`${note}`);
    colorLED(note, 53);
    if (note >= 84 && note <= 99) {
        let index = note - 84;
        let lat = ((Math.floor(index / 4) + 1) * 22.5) - (22.5 * Math.random())
        let lon = (((index % 4) + 1) * 45) - (45 * Math.random());
        makeApiCall(lat,lon);
    } else if (note >= 68 && note <= 83) {
        let index = note - 68;
        let lat = ((Math.floor(index / 4) + 1) * 22.5) - (22.5 * Math.random())
        let lon = (((index % 4) + 1) * 45) - (45 * Math.random());
        makeApiCall(-lat,lon);
    } else if (note >= 52 && note <= 67) {
        let index = note - 52;
        let lat = ((Math.floor(index / 4) + 1) * 22.5) - (22.5 * Math.random())
        let lon = (((index % 4) + 1) * 45) - (45 * Math.random());
        makeApiCall(lat,-lon);
    } else {
        let index = note - 36;
        let lat = ((Math.floor(index / 4) + 1) * 22.5) - (22.5 * Math.random())
        let lon = (((index % 4) + 1) * 45) - (45 * Math.random());
        makeApiCall(-lat,-lon);
    }
}

function noteOff(note) {
    // nothing to do
}

function colorLED(key, color) {
    device && device.send([0x90,key,color]);
}

window.addEventListener('resize', resizeCanvas(), false);

function resizeCanvas() {
    document.getElementById("canvas").height = window.innerHeight;
    document.getElementById("canvas").width = window.innerWidth;
}