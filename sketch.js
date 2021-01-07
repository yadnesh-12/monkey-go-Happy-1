
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var background_, backgroundImg;
var PLAY=0;
var END=1;
var gameState=PLAY;
var invisibleGr;
var obsGrp, banGrp;
var monkeyStop;
var survivalTime=0;
var bananas=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage=loadImage("download.jpg");
  monkeyStop = loadAnimation("sprite_0.png");
 
}



function setup() {
  createCanvas(600,400);
  
  background_=createSprite(400,200,600,600);
  background_.addImage(backgroundImage);
  background_.scale=3;
  background_.velocityX=-3;
  
  
  monkey=createSprite(90,340,40,40); 
  monkey.addAnimation("run",monkey_running);
  monkey.addAnimation("stop",monkeyStop);
  monkey.scale=0.2;

  obsGrp= new Group();
  banGrp= new Group();
}


function draw() {
  background(180);
  invisibleGr=createSprite(300,390,600,10);
  if(background_.x<150){
    background_.x=300;
  }
  
  if (gameState===PLAY){
    if(keyDown("space") && monkey.y<340){
      monkey.velocityY=-10;
    }
    monkey.velocityY=monkey.velocityY+0.8;
    
    
    if (monkey.isTouching(obsGrp)){
      gameState=END;
    }
    
    if (monkey.isTouching(banGrp)){
      banGrp.destroyEach();
      bananas=bananas+1;
    }
     spawnObstacles();
  spawnBanana();
  }
  if (gameState===END){
    monkey.velocityY=0;
      obsGrp.setVelocityXEach(0);
      banGrp.setVelocityXEach(0);
    obsGrp.setLifetimeEach(-1);
    banGrp.setLifetimeEach(-1);
    background_.velocityX=0;
    monkey.changeAnimation("stop",monkeyStop);
    
  }
  
  monkey.collide(invisibleGr);
  invisibleGr.visible=false;
  
 
  
  drawSprites();
  stroke("black");
  strokeWeight(3);
  textSize(20);
  fill("white");
  text("Survival Time : "+survivalTime,300,50);
  survivalTime=Math.ceil(frameCount/frameRate())
  
  text("Bananas : "+ bananas, 300, 70);
  
  
}

function spawnObstacles(){
  if(frameCount%120===0){
    obstacle=createSprite(600,340,120,120); 
    obstacle.addImage(obstacleImage); 
    obstacle.scale=0.2; 
    obstacle.velocityX=-5;
    obstacle.lifetime=150;
    obsGrp.add(obstacle); 
     }
   
}

function spawnBanana(){
  if(frameCount%100===0){
    banana=createSprite(600,190,80,80); 
    banana.addImage(bananaImage);
    banana.scale=0.2; 
    banana.velocityX=-5;
    banana.lifetime=150;
    banGrp.add(banana);
  }
  
}




