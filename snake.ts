/*
 * Snake by Cubicbird helper blocks
 */
//% weight=100 color=#F3A21B icon="\uF4BA"
namespace snake{

    let successfulGen = false
    let food: number[] = []
    let score = 0
    let isFacingBlock = false
    let isLeftSideBlocked = false
    let isRightSideBlocked = false
    let direction = "U"
    let snakeX = [2, 2, 2]
    let snakeY = [2, 3, 4]
    let head = [2, 2]
    let gameEnd = false
    let ateFood = false
    let cycle = 0

    function initSnakeGame() {
        drawSnake()
        genFood()
        drawFood(0)
    }

    /**
     * make a left turn
     */
    //% block
    export function turnLeft() {
        if (direction == "U") {
            direction = "L"
        } else if (direction == "D") {
            direction = "R"
        } else if (direction == "L") {
            direction = "D"
        } else {
            direction = "U"
        }
    }


    /**
     * make a right turn
     */
    //% block
    export function turnRight() {
        if (direction == "U") {
            direction = "R"
        } else if (direction == "D") {
            direction = "L"
        } else if (direction == "L") {
            direction = "U"
        } else {
            direction = "D"
        }
    }

    /**
     * return if the front is blocked
     */
    //% block
    export function frontIsBlocked(): boolean {
        return isFacingBlock;
    }

    /**
     * return if the left side is blocked
     */
    //% block
    export function leftIsBlocked(): boolean {
        return isLeftSideBlocked;
    }
    /**
     * return if the right side is blocked
     */
    //% block
    export function rightIsBlocked(): boolean {
        return isRightSideBlocked;
    }

    function updateFacingBlockV2() {
        if (direction == "U") {
            if (head[1] == 0) {
                isFacingBlock = true
            } else if (led.point(head[0], head[1] - 1) && !(food[0] == head[0] && food[1] == head[1] - 1)) {
                isFacingBlock = true
            }
        }
        if (direction == "D") {
            if (head[1] == 4) {
                isFacingBlock = true
            } else if (led.point(head[0], head[1] + 1) && !(food[0] == head[0] && food[1] == head[1] + 1)) {
                isFacingBlock = true
            }
        }
        if (direction == "L") {
            if (head[0] == 0) {
                isFacingBlock = true
            } else if (led.point(head[0] - 1, head[1]) && !(food[0] == head[0] - 1 && food[1] == head[1])) {
                isFacingBlock = true
            }
        }
        if (direction == "R") {
            if (head[0] == 4) {
                isFacingBlock = true
            } else if (led.point(head[0] + 1, head[1]) && !(food[0] == head[0] + 1 && food[1] == head[1])) {
                isFacingBlock = true
            }
        }

    }
    function updateLeftFacingBlockV2() {
        if (direction == "U") {
            if (head[0] == 0) {
                isLeftSideBlocked = true
            } else if (led.point(head[0] - 1, head[1]) && !(food[0] == head[0] - 1 && food[1] == head[1])) {
                isLeftSideBlocked = true
            }
        }
        if (direction == "D") {
            if (head[0] == 4) {
                isLeftSideBlocked = true
            } else if (led.point(head[0] + 1, head[1]) && !(food[0] == head[0] + 1 && food[1] == head[1])) {
                isLeftSideBlocked = true
            }
        }
        if (direction == "L") {
            if (head[1] == 4) {
                isLeftSideBlocked = true
            } else if (led.point(head[0], head[1] + 1) && !(food[0] == head[0] && food[1] == head[1] + 1)) {
                isLeftSideBlocked = true
            }
        }
        if (direction == "R") {
            if (head[1] == 0) {
                isLeftSideBlocked = true
            } else if (led.point(head[0], head[1] - 1) && !(food[0] == head[0] && food[1] == head[1] - 1)) {
                isLeftSideBlocked = true
            }
        }
    }

    function updateRightFacingBlockV2() {
        if (direction == "U") {
            if (head[0] == 4) {
                isRightSideBlocked = true
            } else if (led.point(head[0] + 1, head[1]) && !(food[0] == head[0] + 1 && food[1] == head[1])) {
                isRightSideBlocked = true
            }
        }
        if (direction == "D") {
            if (head[0] == 0) {
                isRightSideBlocked = true
            } else if (led.point(head[0] - 1, head[1]) && !(food[0] == head[0] - 1 && food[1] == head[1])) {
                isRightSideBlocked = true
            }
        }
        if (direction == "L") {
            if (head[1] == 0) {
                isRightSideBlocked = true
            } else if (led.point(head[0], head[1] - 1) && !(food[0] == head[0] && food[1] == head[1] - 1)) {
                isRightSideBlocked = true
            }
        }
        if (direction == "R") {
            if (head[1] == 4) {
                isRightSideBlocked = true
            } else if (led.point(head[0], head[1] + 1) && !(food[0] == head[0] && food[1] == head[1] + 1)) {
                isRightSideBlocked = true
            }
        }
    }

    function moveHead() {
        if (direction == "U") {
            head[1] = head[1] - 1
        } else if (direction == "D") {
            head[1] = head[1] + 1
        } else if (direction == "L") {
            head[0] = head[0] - 1
        } else {
            head[0] = head[0] + 1
        }
        snakeX.insertAt(0, head[0])
        snakeY.insertAt(0, head[1])
    }
    function drawSnake() {
        for (let j = 0; j <= snakeX.length - 1; j++) {
            led.plot(snakeX[j], snakeY[j])
        }
    }
    function isDead() {
        if (head[0] < 0 || head[0] > 4) {
            endGame()
        }
        if (head[1] < 0 || head[1] > 4) {
            endGame()
        }
        if (led.point(head[0], head[1])) {
            if (food[0] == head[0] && food[1] == head[1]) {
                score += 1
                ateFood = true
            } else {
                endGame()
            }
        }
    }
    function genFood() {
        successfulGen = false
        while (!(successfulGen)) {
            let temp = [Math.randomRange(0, 4), Math.randomRange(0, 4)]
            if (!(led.point(temp[0], temp[1]))) {
                successfulGen = true
                food[0] = temp[0]
                food[1] = temp[1]
            }
        }
    }
    function drawFood(cycle: number) {
        if (cycle % 2 == 0) {
            led.plot(food[0], food[1])
        } else {
            led.unplot(food[0], food[1])
        }
    }



    function judgeGameEnd() {
        if (gameEnd) {
            basic.pause(10000000)
        }
    }

    function endGame() {
        gameEnd = true
    }
    function moveSnake() {
        led.plot(head[0], head[1])
        if (!(ateFood)) {
            led.unplot(snakeX.pop(), snakeY.pop())
        } else {
            ateFood = false
        }
    }
    function genFoodIfNecessary() {
        if (ateFood) {
            genFood()
        }
    }

    let playGameHandler: () => void;

    /**
     * This is an event handler block
     */
    //% block="Make a move"
    export function onPlayGame(handler: () => void) {
        playGameHandler = handler
    }

    initSnakeGame()

    basic.forever(function () {
        basic.pause(20)
        if (cycle++ % 4 == 0) {
            isFacingBlock = false
            isLeftSideBlocked = false
            isRightSideBlocked = false
            updateFacingBlockV2()
            updateLeftFacingBlockV2()
            updateRightFacingBlockV2()
            playGameHandler()
            moveHead()
            isDead()
            judgeGameEnd()
            genFoodIfNecessary()
            moveSnake()
        } else {
            drawFood(cycle)
        }

    })
}

