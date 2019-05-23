let decision = 0
let candidates: number[] = []
custom.onPlayGame(function () {
    candidates = []
    if (!(custom.frontIsBlocked())) {
        candidates.push(2)
        candidates.push(3)
        candidates.push(4)
        candidates.push(5)
    }
    if (!(custom.leftIsBlocked())) {
        candidates.push(0)
    }
    if (!(custom.rightIsBlocked())) {
        candidates.push(1)
    }
    decision = candidates[Math.randomRange(0, candidates.length - 1)]
    if (decision == 0) {
        custom.turnLeft()
    } else if (decision == 1) {
        custom.turnRight()
    }
})
