/*
 * Snake by Cubicbird helper blocks
 */
//% weight=100 color=#F3A21B icon="\uF4BA"
namespace snake2 {


    export enum Mode {
        MANUAL, PROGRAMMING
    }

    class CoreEngine {
        food: number[]
        score: number
        /**
         * snake direction 
         * 0 up
         * 1 left
         * 2 down
         * 3 right
         */
        direction: number
        snakeX: number[]
        snakeY: number[]
        tail: number[]
        head: number[]
        cycle: number
        _gameEnd: boolean
        makeAMoveHandler: () => void
        public constructor() {
            this.food = [3, 1]
            this.score = 0
            /**
             * snake direction 
             * 0 up
             * 1 left
             * 2 down
             * 3 right
             */
            this.direction = 0
            this.snakeX = [2, 2, 2]
            this.snakeY = [2, 3, 4]
            this.tail = [2, 4]
            this.head = [2, 2]
            this.cycle = 0
            this._gameEnd = false
        }

        frontIsBlocked(): boolean {
            return this.validUnoccypiedPosition(this.nextHead())
        }

        leftIsBlocked(): boolean {
            this.turnLeft()
            let result = this.validUnoccypiedPosition(this.nextHead())
            this.turnRight()
            return result
        }

        rightIsBlocked(): boolean {
            this.turnRight()
            let result = this.validUnoccypiedPosition(this.nextHead())
            this.turnLeft()
            return result
        }


        setMakeAMoveHandler(handler: () => void) {
            this.makeAMoveHandler = handler
        }

        plotSnake() {
            for (let i = 0; i < this.snakeX.length; i++) {
                led.plot(this.snakeX[i], this.snakeY[i])
            }
        }

        render() {
            this.drawFood()
            this.drawSnakeDelta()
        }

        turnLeft() {
            this.direction = (this.direction + 1) % 4
        }

        turnRight() {
            this.direction = (this.direction + 3) % 4
        }

        drawFood() {
            if (this.cycle % 2 == 0) {
                led.plot(this.food[0], this.food[1])
            } else {
                led.unplot(this.food[0], this.food[1])
            }
        }

        drawSnakeDelta() {
            led.plot(this.head[0], this.head[1])
            led.unplot(this.tail[0], this.tail[1])
        }

        /**
         * update game status
         */
        updateGame() {
            this.cycle++
            if (this.cycle % 4 == 0) {
                if (this.makeAMoveHandler) {
                    this.makeAMoveHandler()
                }
                this.moveHead()

                if (this.validUnoccypiedPosition(this.head)) {
                    this._gameEnd = true;
                } else {
                    if (!this.ateFood()) {
                        this.moveTail()
                    } else {
                        this.generateFood()
                    }
                }
            }
        }

        overlapWithSnake(coordinate: number[], headInclude: boolean): boolean {
            let i = headInclude ? 0 : 1
            for (; i < this.snakeX.length; i++) {
                if (coordinate[0] == this.snakeX[i] && coordinate[1] == this.snakeY[i]) {
                    return true
                }
            }
            return false
        }

        generateFood() {
            this.food = []
            do {
                this.food[0] = Math.randomRange(0, 4)
                this.food[1] = Math.randomRange(0, 4)
            } while (this.overlapWithSnake(this.food, true))
        }

        validUnoccypiedPosition(head: number[]): boolean {
            if (head[0] < 0 || head[0] > 4) {
                return true
            }
            if (head[1] < 0 || head[1] > 4) {
                return true
            }
            return this.overlapWithSnake(head, false)
        }

        ateFood(): boolean {
            return this.head[0] == this.food[0] && this.head[1] == this.food[1]
        }

        nextHead(): number[] {
            let _nextHead = [this.head[0], this.head[1]]
            switch (this.direction) {
                case 0:
                    _nextHead[1] = _nextHead[1] - 1
                    break
                case 1:
                    _nextHead[0] = _nextHead[0] - 1
                    break
                case 2:
                    _nextHead[1] = _nextHead[1] + 1
                    break
                case 3:
                    _nextHead[0] = _nextHead[0] + 1
            }
            return _nextHead
        }

        moveHead() {
            this.head = this.nextHead()
            this.snakeX.insertAt(0, this.head[0])
            this.snakeY.insertAt(0, this.head[1])
        }

        moveTail() {
            this.tail = [this.snakeX.pop(), this.snakeY.pop()]
        }

        gameEnd(): boolean {
            return this._gameEnd

        }

        invokeHandler() {
            this.makeAMoveHandler()
        }

    }

    let coreEngine: CoreEngine

    export function initSnakeGame(mode: Mode) {
        coreEngine = new CoreEngine()

        if (mode == Mode.MANUAL) {
            input.onButtonPressed(Button.A, function () {
                coreEngine.turnLeft()
            })
            input.onButtonPressed(Button.B, function () {
                coreEngine.turnRight()
            })
            basic.forever(function () {
                coreEngine.updateGame()
                if (coreEngine.gameEnd()) {
                    basic.pause(1000000)
                } else {
                    coreEngine.render()
                    basic.pause(125)
                }
            })
        } else if (mode == Mode.PROGRAMMING) {
            basic.forever(function () {
                coreEngine.updateGame()
                if (coreEngine.gameEnd()) {
                    basic.pause(1000000)
                } else {
                    coreEngine.render()
                    basic.pause(50)
                }
            })
        }

        coreEngine.drawFood()
        coreEngine.plotSnake()

    }



    /**
    * This is an event handler block
    */
    //% block="Make a move"
    export function onGameTick(handler: () => void) {
        coreEngine.setMakeAMoveHandler(handler)
    }
    /**
       * make a left turn
       */
    //% block
    export function turnLeft() {
        coreEngine.turnLeft()
    }
    /**
   * make a right turn
   */
    //% block
    export function turnRight() {
        coreEngine.turnRight()
    }

    /**
    * return if the front is blocked
    */
    //% block
    export function frontIsBlocked(): boolean {
        return coreEngine.frontIsBlocked();
    }

    /**
     * return if the left side is blocked
     */
    //% block
    export function leftIsBlocked(): boolean {
        return coreEngine.leftIsBlocked();
    }
    /**
     * return if the right side is blocked
     */
    //% block
    export function rightIsBlocked(): boolean {
        return coreEngine.rightIsBlocked();
    }



} 