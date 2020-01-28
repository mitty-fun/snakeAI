class SnakeGame {

    constructor(width = 15, height = 15) {
        this.width = width
        this.height = height
        this.grid = this.initGrid()
        this.head = this.grid[7][7]
        this.head.color = 'green'
        this.bodies = []
        this.food
        this.direction = 'right'
        this.score = 0
        this.status = 'playing' // playing, gameover
        this.createFood()
    }

    initGrid() {
        const grid = []
        for (let y = 0; y < this.width; y++) {
            grid[y] = []
            for (let x = 0; x < this.height; x++) {
                grid[y][x] = { color: 'black', x, y }
            }
        }

        // connect
        for (let y = 0; y < this.width; y++) {
            for (let x = 0; x < this.height; x++) {
                let col = grid[y][x]
                if (grid[y] && grid[y][x + 1]) col.right = grid[y][x + 1]
                if (grid[y] && grid[y][x - 1]) col.left = grid[y][x - 1]
                if (grid[y - 1] && grid[y - 1][x]) col.up = grid[y - 1][x]
                if (grid[y + 1] && grid[y + 1][x]) col.down = grid[y + 1][x]
            }
        }

        return grid
    }

    update() {
        if (this.status === 'gameover') return

        const col = this.head[this.direction]
        if (col === undefined || this.bodies.includes(col)) {
            return this.status = 'gameover'
        }

        this.getAllcells().forEach(col => col.color = 'black')

        if (col === this.food) {
            this.bodies.unshift(this.food)
            this.createFood()
            this.score++
        }

        this.bodies.unshift(this.head)
        this.bodies.pop()

        this.bodies.forEach(col => col.color = 'green')
        this.head = col
        this.head.color = 'green'
        this.food.color = 'red'
    }

    createFood() {
        const arr = this.getAllcells().filter(this.isEmpty)
        const rand = Math.floor(Math.random() * arr.length)
        arr[rand].color = 'red'
        this.food = arr[rand]
    }

    getAllcells() {
        let arr = []
        for (let y = 0; y < this.height; y++) {
            arr = arr.concat(this.grid[y])
        }
        return arr
    }

    isEmpty(col) {
        return col.color === 'black'
    }

    turnUp() {
        this.direction = 'up'
    }

    turnRight() {
        this.direction = 'right'
    }

    turnDown() {
        this.direction = 'down'
    }

    turnLeft() {
        this.direction = 'left'
    }
}