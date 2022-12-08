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
    // document.body.style.backgroundColor = "Red";
    // document.getElementById("hello_tag").style.textAlign = "center";
    // document.getElementById("hello_tag").style.backgroundColor = "black";
    // document.getElementById("hello_tag").style.color = "yellow";
    // document.getElementById('hello_tag').textContent = "From: note: " + note;
    // colorM(note, 68);
    // colorM(note+1, 104);
    // colorM(note+2, 104);
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
    //console.log(`note: ${note} OFF`);
    // document.body.style.backgroundColor = "GhostWhite";
    // document.getElementById("hello_tag").style.textAlign = "left";
    // document.getElementById("hello_tag").style.backgroundColor = document.body.style.backgroundColor;
    // document.getElementById("hello_tag").style.color = "black";
    // document.getElementById('hello_tag').textContent = "Hello, World!";
}

function colorLED(key, color) {
    device && device.send([0x90,key,color]);
}

window.addEventListener('resize', resizeCanvas(), false);

function resizeCanvas() {
    document.getElementById("circles").height = window.outerHeight;
    document.getElementById("circles").width = window.innerWidth;
}