function AI(game) {

    game.getAllcells().forEach(col => col.number = 100)

    game.head.number = 0
    let stack = [game.head]

    while (stack.length > 0) {
        let s = stack.shift()

        if (s === game.food) {
            break
        }

        if (s.up && s.up.color !== 'green' && s.number + 1 < s.up.number) {
            s.up.from = s
            s.up.number = s.number + 1
            stack.push(s.up)
        }
        if (s.down && s.down.color !== 'green' && s.number + 1 < s.down.number) {
            s.down.from = s
            s.down.number = s.number + 1
            stack.push(s.down)
        }
        if (s.right && s.right.color !== 'green' && s.number + 1 < s.right.number) {
            s.right.from = s
            s.right.number = s.number + 1
            stack.push(s.right)
        }
        if (s.left && s.left.color !== 'green' && s.number + 1 < s.left.number) {
            s.left.from = s
            s.left.number = s.number + 1
            stack.push(s.left)
        }
    }

    let target = game.food
    let { up, down, right, left } = game.head

    while (target.from) {
        target = target.from
        if (target == game.head) break
        target.color = 'orange'
    }
    
    if (up && (up.color === 'orange' || up.color === 'red')) {
        game.turnUp()
    }
    if (down && (down.color === 'orange' || down.color === 'red')) {
        game.turnDown()
    }
    if (right && (right.color === 'orange' || right.color === 'red')) {
        game.turnRight()
    }
    if (left && (left.color === 'orange' || left.color === 'red')) {
        game.turnLeft()
    }
}