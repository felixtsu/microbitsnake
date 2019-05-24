/**
snake.onPlayGame(function () {
    if (snake.frontIsBlocked()) {
        if (!snake.leftIsBlocked()) {
            snake.turnLeft()
        } else if(!snake.rightIsBlocked()){
            snake.turnRight()
        }
    }
}) 
 */
snake.initSnakeGame(snake.Mode.PROGRAMMING)

let decision = 0
let candidates: number[] = []
snake.onGameTick(function () {
    candidates = []
    if (!(snake.frontIsBlocked())) {
        candidates.push(2)
        candidates.push(3)
        candidates.push(4)
        candidates.push(5)
    }
    if (!(snake.leftIsBlocked())) {
        candidates.push(0)
    }
    if (!(snake.rightIsBlocked())) {
        candidates.push(1)
    }
    decision = candidates[Math.randomRange(0, candidates.length - 1)]
    if (decision == 0) {
        snake.turnLeft()
    } else if (decision == 1) {
        snake.turnRight()
    }
})
