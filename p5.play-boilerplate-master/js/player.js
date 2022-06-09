class Player{
    constructor(x,y,width,height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.image = loadImage("./assets/player.png")

        var options = {
            isStatic: true
        }
        this.body = Bodies.rectangle(x,y,width,height, options)
        World.add(world, this.body)
    }



    display() {
        var pos = this.body.positon
        push()
        translate(pos.x, pos.y)
        imageMode(CENTER)
        image(this.image, 0,0, this.width, this.height)
        pop()
    }
    
}