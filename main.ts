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
snake2.initSnakeGame(snake2.Mode.PROGRAMMING)

let decision = 0
let candidates: number[] = []
snake2.onGameTick(function () {
    candidates = []
    if (!(snake2.frontIsBlocked())) {
        candidates.push(2)
        candidates.push(3)
        candidates.push(4)
        candidates.push(5)
    }
    if (!(snake2.leftIsBlocked())) {
        candidates.push(0)
    }
    if (!(snake2.rightIsBlocked())) {
        candidates.push(1)
    }
    decision = candidates[Math.randomRange(0, candidates.length - 1)]
    if (decision == 0) {
        snake2.turnLeft()
    } else if (decision == 1) {
        snake2.turnRight()
    }
})
