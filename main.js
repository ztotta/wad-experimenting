//// new for project 10/5/16
//// Mary Rose Cook livecoding
console.log("main js loaded")
//
var bpm = 95
var beat = 160 / bpm 
var loopMs = beat * 1000 * 4
var looper = true;

//// create instruments for each sound. WORKING
var kick = new Wad({source : 'assets/kick.mp3'});
var snare = new Wad(Wad.presets.snare); 
    snare.setVolume(9)
var hiHatC = new Wad(Wad.presets.hiHatClosed);
var hiHatOp = new Wad(Wad.presets.hiHatOpen);
////var applause = new Wad {}
////var computerMocking = new Wad {}
////var computerCongrats = new Wad {}

//// create 64 booleans for each instrument. WORKING
var kickBool = [];
for (var i=0; i<64; i++) { kickBool.push(false) }

var snareBool = [];
for (var i=0; i<64; i++) { snareBool.push(false) }

var hiHatCBool = [];
for (var i=0; i<64; i++) { hiHatCBool.push(false)}

var hiHatOpBool = [];
for (var i=0; i<64; i++) { hiHatOpBool.push(false) }

//// create booleans to silence loops (turn volume down?) TO-DO



//// assign id's and text to each step. WORKING
function stepIdMaker () {
    for (var i=0; i<= 63; i++) {
        $('.kickSteps').eq(i).attr('id', '#kick' + i).text(i);
    }
    for (var i=0; i<= 63; i++) {
        $('.snareSteps').eq(i).attr('id', '#snare' + i).text(i); 
    }
    for (var i=0; i<= 63; i++) {
        $('.hiHatCSteps').eq(i).attr('id', '#hiHatC' + i).text(i);
    }
    for (var i=0; i<= 63; i++) {
        $('.hiHatOpSteps').eq(i).attr('id', '#hiHatOp' + i).text(i);
    }
}
stepIdMaker();

//// assign unique class to quarter notes to clarify the grid
function quarterNoteMaker () {
    for (var i=0; i<= 63; i+=4) {
        $('.kickSteps').eq(i).addClass('quarterNote')
    }
    for (var i=0; i<= 63; i+=4) {
        $('.snareSteps').eq(i).addClass('quarterNote')
    }
    for (var i=0; i<= 63; i+=4) {
        $('.hiHatCSteps').eq(i).addClass('quarterNote')
    }
    for (var i=0; i<= 63; i+=4) {
        $('.hiHatOpSteps').eq(i).addClass('quarterNote')
    }
}
quarterNoteMaker();

//// add click listener to steps and toggle boolean values WORKING
//// make step light up when selected (toggle class) WORKING
$('.kickSteps, .snareSteps, .hiHatCSteps, .hiHatOpSteps').click(function(event) {
    for (var i=0; i<=63; i++) {
        if (event.target.id === '#kick' + i) {
            if (kickBool[i] === false) { kickBool[i] = true; $(event.target).addClass('litSteps') }
            else { kickBool[i] = false; $(event.target).removeClass('litSteps') }  
        }
    }
    for (var i=0; i<=63; i++) {
        if (event.target.id === '#snare' + i) {
            if (snareBool[i] === false) { snareBool[i] = true; $(event.target).addClass('litSteps') }
            else { snareBool[i] = false; $(event.target).removeClass('litSteps') }  
        }
    }
    for (var i=0; i<=63; i++) {
        if (event.target.id === '#hiHatC' + i) {
            if (hiHatCBool[i] === false) { hiHatCBool[i] = true; $(event.target).addClass('litSteps') }
            else { hiHatCBool[i] = false; $(event.target).removeClass('litSteps') }  
        }
    }
    for (var i=0; i<=63; i++) {
        if (event.target.id === '#hiHatOp' + i) {
            if (hiHatOpBool[i] === false) { hiHatOpBool[i] = true; $(event.target).addClass('litSteps') }
            else { hiHatOpBool[i] = false; $(event.target).removeClass('litSteps') }  
        }
    }
})

//// build empty loops for each instrument WORKING
function kickLoop() {
    var beatCounter = 0;
    for (var i=0; i<=63; i++) {
        if (kickBool[i]) { kick.play({wait : beat * beatCounter}) }
        beatCounter += 0.0625;
    }
}

function snareLoop() {
    var beatCounter = 0;
    for (var i=0; i<=63; i++) {
        if (snareBool[i]) { snare.play({wait : beat * beatCounter}) }
        if (!looper) { return } // not stopping immediately
        beatCounter += 0.0625;
    }
}

function hiHatCLoop() {
    var beatCounter = 0;
    for (var i=0; i<=63; i++) {
        if (hiHatCBool[i]) { hiHatC.play({wait : beat * beatCounter}) }
        beatCounter += 0.0625;
    }
}

function hiHatOpLoop() {
    var beatCounter = 0;
    for (var i=0; i<=63; i++) {
        if (hiHatOpBool[i]) { hiHatOp.play({wait : beat * beatCounter}) }
        beatCounter += 0.0625;
    }
}

//// make divs light up with metronome NOT working
//// it makes it through, but shoots all 64 divs at same time
function metronome() {
//    var beatCounter = 0;
    var $kickSteps = $('.kickSteps');
    function doSetTimeout(i) {
        setTimeout(function() {
            $($kickSteps[i]).addClass('metronome');
        }, 2000);
    }
    for (var i=0; i<=63; i++) { doSetTimeout(i) };
}

//// call all loops on WORKING
function startLoops() {
    kickLoop();
    snareLoop();
    hiHatCLoop();
    hiHatOpLoop();
    //// setInteral relaunches at intervals of 1 loop WORKING
    setInterval(function() {
      console.log('setIntervalz entered')
      if (!looper) { return } // doesn't stop immediately...
      snareLoop();
      kickLoop();
      hiHatCLoop();
      hiHatOpLoop();
    }, loopMs)
}

//// make computer taunt at regular intervals
//function tauntLoop () {
//    setInterval(function() {
//      bandLoop();
//    }, 15000);
//}
//
//// stop loop on user click of 'stop'
//function stopLoop () {
//    // not sure how to do this...
//}
//
//
//// assign id's to each instrument's .steps class
//for (var i = 0; i <= 63; i++) {
//    $('.stepsKick[i]').id('kick' + i);
//    $('.stepsSnare[i]').id('snare' + i);
//    $('.stepsHiHatC[i]').id('hiHatC' + i);
//    $('.stepsHiHatOp[i]').id('hiHatOp' + i);
//}
//
//// check for victory (called below) (all step var's match the key's true/false's)
//function winCheck() {
//    if (kick0 && !kick1 && kick2 && etc) { applause.play({wait : beat * 0.000});
//    philCongrats.play({wait : beat * 3.000}) }
//}
//
//// create click listener for each step (choose 1 parent and assign to all children, jquery?)
//// if the step's var was alreadey true, turn it false. If already false, turn true
//$('#stepPanels').on('click', 'steps', function() {
//    for (var i=0; i <= 63; i++) {
//        if (this.id === 'kick' + i) {
//            if ('kick' + i) { 'kick' + i === false }
//            else { 'kick' + i = true }
//        }
//        else if (this.id === 'snare' + i) {
//            if ('snare' + i) { 'snare' + i === false }
//            else { 'snare' + i = true }
//        }
//        else if (this.id === 'hiHatC' + i) {
//            if ('hiHatC' + i) { 'hiHatC' + i === false }
//            else { 'hiHatC' + i = true }
//        }
//        else if (this.id === 'hiHatOp' + i) {
//            if ('hiHatOp' + i) { 'hiHatOp' + i === false }
//            else { 'hiHatOp' + i = true }
//        }
//    }
//    // check for victory after each click
//    winCheck();
//}); 


//// BEATS:
//// MEASURE 1: 00 01 02 03 | 04 05 06 07 | 08 09 10 11 | 12 13 14 15
//// MEASURE 2: 16 17 18 19 | 20 21 22 23 | 24 25 26 27 | 28 29 30 31
//// MEASURE 3: 32 33 34 35 | 36 37 38 39 | 40 41 42 43 | 44 45 46 47
//// MEASURE 4: 48 49 50 51 | 52 53 54 55 | 56 57 58 59 | 60 61 62 63