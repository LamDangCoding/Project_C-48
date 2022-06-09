class Bullet{
    constructor(x,y, width, height) {
        this.x = x
        this.y = y
        this.width = 10
        this.height =  50
        this.image = loadImage("./assets/bullet.png")

        var options = {
            isStatic: true
        }
        this.body = Bodies.rectangle(x, y, width, height, options)
        World.add(world, this.body)
    }

    shoot() {
        Matter.Body.setStatic(this.body, false)
        Matter.Body.setVelocity(this.body, {x: 0, y: -60})
    }
      
    remove(index) {
        Matter.World.remove(world, this.body)
        delete bullets(index)
    }

    display() {
        var pos = this.body.positon
        push()
        imageMode(CENTER)
        translate(pos.x, pos.y)
        image(this.image, 0, 0, this.width, this.height)
        pop()
    }
}   