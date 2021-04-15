enum RadioMessage {
    message1 = 49434,
    ping = 61148,
    full = 9128,
    startgame = 3438,
    endgame = 1817
}
input.onPinPressed(TouchPin.P0, function () {
    if (true) {
        radio.sendString("game forced ended")
        radio.sendMessage(RadioMessage.endgame)
    } else {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            . # # # .
            . # . # .
            `)
        basic.showString("not admin")
    }
})
radio.onReceivedMessage(RadioMessage.startgame, function () {
    hand = randint(0, 100)
    radio.sendNumber(hand)
})
radio.onReceivedMessage(RadioMessage.full, function () {
    basic.showString("game full")
    basic.clearScreen()
})
radio.onReceivedNumber(function (receivedNumber) {
    if (my_num == receivedNumber) {
        admin_mode = 1
        radio.sendString("the game will start now")
        basic.pause(5000)
        radio.sendMessage(RadioMessage.startgame)
    } else if (hand < receivedNumber) {
        radio.sendNumber(receivedNumber)
    } else if (hand == receivedNumber) {
        wh += 1
        if (wh == player - 1) {
            radio.sendString("i am the winner")
            basic.showLeds(`
                . . . . .
                . # . # .
                . . . . .
                . # . # .
                . # # # .
                `)
        }
    }
})
input.onButtonPressed(Button.A, function () {
    basic.showNumber(my_num)
    basic.pause(2000)
    basic.clearScreen()
})
radio.onReceivedMessage(RadioMessage.ping, function () {
    if (player == 1) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            # . . . .
            . # # # #
            `)
    } else if (player == 2) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            # # . . .
            . . # # #
            `)
    } else if (player == 3) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            # # # . .
            . . . # #
            `)
    } else if (player == 4) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            # # # # .
            . . . . #
            `)
    } else if (player == 4) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            # # # # #
            . . . . .
            `)
    } else if (player > 5) {
        radio.sendMessage(RadioMessage.full)
    }
})
input.onButtonPressed(Button.AB, function () {
    if (playadd == 1) {
        radio.sendMessage(RadioMessage.ping)
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            . # . # .
            . # # # .
            `)
        my_num = player + 1
        radio.sendValue("player", player + 1)
        playadd = 0
        basic.pause(1000)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    } else {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            . # # # .
            . # . # .
            `)
        basic.pause(2000)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    }
})
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString)
})
input.onButtonPressed(Button.B, function () {
    basic.showNumber(player)
    basic.pause(2000)
    basic.clearScreen()
})
input.onGesture(Gesture.Shake, function () {
    player_admin = randint(0, player)
    radio.sendNumber(player_admin)
})
radio.onReceivedValue(function (name, value) {
    player = value
    basic.pause(1000)
    radio.sendValue("player", value)
})
radio.onReceivedMessage(RadioMessage.endgame, function () {
    basic.showString("the game is over")
    basic.showLeds(`
        # . . . #
        . # . # .
        . . # . .
        . # . # .
        # . . . #
        `)
    basic.pause(2000)
    basic.showString("restart microbit")
})
let player_admin = 0
let player = 0
let my_num = 0
let hand = 0
let playadd = 0
let wh = 0
let admin_mode = 0
admin_mode = 0
wh = 0
playadd = 1
radio.setGroup(5)
