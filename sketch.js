/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var jungle, invisiblejungle;

var obstaclesGroup, obstacle1;

var score=0;

var gameOver, restart;

function preload(){
  kangaroo_running =   loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.velocityX=2;

  kangroo = createSprite(100,300,400,20);
  kangroo.scale=0.2
  kangroo.addAnimation("run",kangaroo_running)
  kangroo.addAnimation("collide",kangaroo_collided)
  kangroo.setCollider("circle",0,0,40)
  kangroo.debug=true;

  ground=createSprite(0,320,1700,10);
  ground.visible=false;

  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

}

function draw() {
  background(255);
  kangroo.x=camera.position.x-270
  if (gameState===PLAY){
    if (jungle.x<50){
      jungle.x=width/2-900;
    }
     
    if(keyDown("space") && kangroo.y >= 159) {
      kangroo.velocityY = -12;
      jumpSound.play();
    }
    kangroo.velocityY = kangroo.velocityY + 0.8
    kangroo.collide(ground)
  spawnShrub();
  spawnObstacles();
  if (obstaclesGroup.isTouching(kangroo)){
    gameState=END;
    collidedSound.play();
  }
  if (shrubsGroup.isTouching(kangroo)){
    score=score+1
    shrubsGroup.destroyEach();
  }
  }

  drawSprites();
//SCORE TEXT
fill("blue")
textSize(50)
textFont("Algerian");
text("Score: "+ score,280,50);


}
function spawnShrub() {
  if(frameCount % 150 === 0) {
    var shrub = createSprite(camera.position.x+500,320,10,40);
   shrub.velocityX=3;
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: shrub.addImage(shrub1);
              break;
      case 2: shrub.addImage(shrub2);
              break;
      case 3: shrub.addImage(shrub3);
              break
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    shrub.scale = 0.1;
   shrub.lifetime = 300;
    //add each obstacle to the group
   shrubsGroup.add(shrub);
  }
}
  function spawnObstacles() {
    if(frameCount % 190 === 0) {
      var obstacle = createSprite(camera.position.x+500,320,10,40);
      //obstacle.debug = true;
      obstacle.velocityX = 3
      obstacle.addImage(obstacle1)
      obstacle.scale=0.2;
      obstacle.lifetime=200;
      obstaclesGroup.add(obstacle)
    }
  }
