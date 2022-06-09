const Engine = Matter.Engine
const World = Matter.World
const Bodies = Matter.Bodies
const Body = Matter.Body

let engine;
let world;
var INTRO = 0
var START = 1
var END = 2
var gameStates = 0
var player, playerImg
var enemiesGroup, enemy1, enemy1Img, enemy2, enemy2Img, enemy3, enemy3Img
var bullet
var bullets = []
var boom, boomImg
var backgroundImg

function preload() {
enemy1Img = loadImage("./assets/enemy1.png")
enemy2Img = loadImage("./assets/enemy2.png")
enemy3Img = loadImage("./assets/enemy3.png")
boomImg = loadImage("./assets/explosion.png")
backgroundImg = loadImage("./assets/space.jpg")
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  createSprite(400, 200, 50, 50);
  
  player = new Player(width/2, 500, 50, 150)
  enemiesGroup = new Group()
}

function draw() {
  background(backgroundImg);  

  player.display()

  if(gameStates === 0) {
    player.visible = false
    text("Use arrow key to control player. Press space bar to begin", width/2, height/2-200)

    if(keyDown("space")) {
      text.visible = false
      player.visible = true
      gameStates = 1
    }
  }

  if(gameStates === 1) {
    spawnEnemies();
    shootBullets();
    player.visible = true
    enemy2.visible = false
    enemy3.visible = false

    enemy1.velocityX = 20
    enemy1.velocityY = 5

    if(bullets[index].isTouching(enemiesGroup)) {
      bullets[index].remove

      if(bullets[index].isTouching(enemy1)) {
        enemy1.visible = false
        enemy1.velocityX = 0
        enemy1.velocityY = 0

        enemy2.visible = true
        enemy2.velocityX = 30
        enemy2.velocityY = 10

        if(bullets[index].isTouching(enemy2)) {
          enemy2.visible = false
          enemy2.velocityX = 0
          enemy2.velocityY = 0

          enemy3.visible = true
          enemy3.velocityX = 50
          enemy3.velocityY = 25

          if(bullets[index].isTouching(enemy3)) {
            enemy3.visible = false
            enemy3.velocityX = 0
            enemy3.velocityY = 0

            player.visible = false

            text("Congratulations!!! You Won!", width/2, height/2)
          }
        }
      }
    }
    
    if(enemiesGroup.isTouching(player)) {
      gameStates = 2
    }
  }

  if(gameStates === 2) {
    text("You lose", width/2, height/2)
    
  }
  drawSprites();
}

function spawnEnemies() {
  enemiesGroup.add(enemy1, enemy2, enemy3)

  enemy1 = createSprite(width/2, height/2-200, 70, 40)
  enemy1.addImage("enemy1", enemy1Img)
  enemy1.addImage("boom", boomImg)
  enemy1.scale = 0.7

  enemy2 = createSprite(width/2, height/2-200, 70, 40)
  enemy2.addImage("enemy2", enemy2Img)
  enemy2.addImage("boom", boomImg)
  enemy2.scale = 0.7

  enemy3 = createSprite(width/2, height/2-200, 70, 40)
  enemy3.addImage("enemy1", enemy3Img)
  enemy3.addImage("boom", boomImg)
  enemy3.scale = 0.7
}

function shootBullets() {
  if(keyDown("space")) {
    bullet = new Bullet(player.x, player.y, 10, 50)
    bullet.display()
    bullet.shoot()
    bullets.push(bullet)
  }
}

