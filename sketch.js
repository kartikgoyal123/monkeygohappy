var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaImage,obstaceImage,gameOverImg,gameover;
var score=0;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("stone.png");
  gameOverImg = loadImage("gameOver.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;

  gameover=createSprite(350,220);
  gameover.addImage(gameOverImg); 
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  
  FoodGroup = createGroup();
  obstaclesGroup = createGroup();
}

function draw() { 
  background(0);

  if(gameState===PLAY){
    
    gameover.visible=false;

  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spawnFood();
    spawnObstacles();
    if (FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
      score=score+2;
      player.scale += + 0.1;
    }
    if(obstaclesGroup.isTouching(player)){
       gameState=END;
} 
  }   else if(gameState === END){
      
       backgr.velocityX = 0;
       player.visible = false;

       FoodGroup.destroyEach();
       obstaclesGroup.destroyEach();

       gameover.visible=true;
   }

  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 300,50);
}

function spawnFood() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(650,250,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaImage);
    banana.velocityX = -4;
    banana.scale = 0.05;
    banana.lifetime = 300;
    player.depth = banana.depth+1
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if (frameCount % 100 === 0){
    var obstacle = createSprite(650,310,10,40);
    obstacle.velocityX = -6; 
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.2;
    obstacle.lifetime = 100;
    obstaclesGroup.add(obstacle);
  }
 }
 