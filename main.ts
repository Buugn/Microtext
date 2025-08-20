function playSound () {
    music.play(music.tonePlayable(528, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
}
input.onButtonPressed(Button.A, function () {
    if (mode == 0) {
        emotion += 1
        testEmotion()
    } else {
        letter += 1
        testLetter()
    }
})
input.onButtonPressed(Button.AB, function () {
    switchModes()
})
input.onButtonPressed(Button.B, function () {
    if (mode == 0) {
        emotion += -1
        testEmotion()
    } else {
        letter += -1
        testLetter()
    }
})
radio.onReceivedValue(function (name, value) {
    playSound()
    displayFunction(name, value)
})
function testEmotion () {
    if (0 > emotion) {
        displayFunction(emotionLIB[emotion * -1 % emotionLIB.length], 1)
    } else {
        displayFunction(emotionLIB[emotion % emotionLIB.length], 1)
    }
    basic.pause(100)
    if (0 > emotion) {
        basic.clearScreen()
    }
}
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    if (mode == 0) {
        if (0 > emotion) {
            radio.sendValue(emotionLIB[emotion * -1 % emotionLIB.length], 1)
        } else {
            radio.sendValue(emotionLIB[emotion % emotionLIB.length], 1)
        }
    } else {
        if (0 > letter) {
            radio.sendValue(String.fromCharCode(letterLIB[letter * -1 % letterLIB.length]), 3)
        } else {
            radio.sendValue(String.fromCharCode(letterLIB[letter % letterLIB.length]), 3)
        }
    }
    playSound()
})
function testLetter () {
    if (0 > letter) {
        basic.showString(String.fromCharCode(letterLIB[letter * -1 % letterLIB.length]))
    } else {
        basic.showString(String.fromCharCode(letterLIB[letter % letterLIB.length]))
    }
    basic.pause(100)
    if (0 > letter) {
        basic.clearScreen()
    }
}
function switchModes () {
    if (mode == 0) {
        mode = 1
    } else {
        mode = 0
    }
}
input.onLogoEvent(TouchButtonEvent.Released, function () {
    if (mode == 0) {
        if (0 > emotion) {
            radio.sendValue(emotionLIB[emotion * -1 % emotionLIB.length], 0)
        } else {
            radio.sendValue(emotionLIB[emotion % emotionLIB.length], 0)
        }
    } else {
        if (0 > letter) {
            radio.sendValue(String.fromCharCode(letterLIB[letter * -1 % letterLIB.length]), 0)
        } else {
            radio.sendValue(String.fromCharCode(letterLIB[letter % letterLIB.length]), 0)
        }
    }
})
function displayFunction (stringInput: string, value: number) {
    if (value == 1) {
        if (stringInput == "love") {
            basic.showIcon(IconNames.Heart)
        }
        if (stringInput == "yes") {
            basic.showIcon(IconNames.Yes)
        }
        if (stringInput == "no") {
            basic.showIcon(IconNames.No)
        }
        if (stringInput == "happy") {
            basic.showIcon(IconNames.Happy)
        }
        if (stringInput == "sad") {
            basic.showIcon(IconNames.Sad)
        }
        if (stringInput == "-_-") {
            basic.showIcon(IconNames.Asleep)
        }
        if (stringInput == "silly") {
            basic.showIcon(IconNames.Silly)
        }
        if (stringInput == "meh") {
            basic.showIcon(IconNames.Meh)
        }
        if (stringInput == "home") {
            basic.showIcon(IconNames.House)
        }
        if (stringInput == "come") {
            basic.showIcon(IconNames.Sword)
        }
    } else if (value == 3) {
        basic.showString(stringInput)
    } else {
        if (value == 0) {
            basic.clearScreen()
        }
    }
}
let emotion = 0
let letterLIB: number[] = []
let emotionLIB: string[] = []
let mode = 0
let letter = 0
letter = 0
mode = 0
emotionLIB = [
"love",
"yes",
"no",
"happy",
"sad",
"-_-",
"silly",
"meh",
"home",
"come"
]
for (let index = 0; index <= 25; index++) {
    letterLIB[index] = index + 97
}
music.setVolume(34)
