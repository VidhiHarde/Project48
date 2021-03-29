var player,playerImg;
var road,roadImg;
var edges;
var garbageGrp,g1,g2,g3,g4,g5,g6,g7,g8,g9,g10;
var scoreSound;
var bin,binImg;
var lObstacleGrp,lObstacleImg;
var rObstacleGrp,rObstacleImg;
var germ,germImg;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameOver,gameOverImg;
var gameOverSound;
var score=0;

function preload(){
playerImg=loadAnimation("Images/Player.png","Images/PlayerWalking.png");	
roadImg=loadImage("Images/Road2.jpg");
g1=loadImage("Images/G1.png");
g2=loadImage("Images/G2.png");
g3=loadImage("Images/G3.png");
g4=loadImage("Images/G4.png");
g5=loadImage("Images/G5.png");
g6=loadImage("Images/G6.png");
g7=loadImage("Images/G7.png");
g8=loadImage("Images/G8.png");
g9=loadImage("Images/G9.png");
g10=loadImage("Images/G10.png");
binImg=loadImage("Images/Bin.png");
lObstacleImg=loadImage("Images/Obstacle_Left.png");
rObstacleImg=loadImage("Images/Obstacle_Right.png");
germImg=loadImage("Images/Germ1.png");
gameOverImg=loadImage("Images/GameOverImage.png");
scoreSound=loadSound("Sounds/Score.wav");
gameOverSound=loadSound("Sounds/GameOverSound.wav");
}

function setup() {
//creating canvas	
createCanvas(500, 600);
//creating road, player, bin and gameOversprites respectively.
road=createSprite(245,260,400,800);
road.addImage("roadI",roadImg);
road.scale=0.9;
road.velocityY=4;

player=createSprite(250,500,10,40);
player.addAnimation("P1",playerImg);
player.setCollider("circle",0,0,30);
//player.debug=true

bin=createSprite(60,90,30,70);
bin.addImage("dustbin",binImg);
bin.scale=0.2;

gameOver=createSprite(250,250,50,10);
gameOver.addImage(gameOverImg);
gameOver.visible=false;


//creating garbage,leftObstacle and rightObstacle groups respectively.
garbageGrp=new Group();
lObstacleGrp=new Group();
rObstacleGrp=new Group();
germGrp=new Group();
}

function draw() {
//to clear the background .
background(0);
//to add functionalities when the game state is at the play.
if(gameState===PLAY){
//giving functionality to increase the velocity of the road with the score.
road.velocityY = (4+ 3*score/100);

//moving the player left and right with left and right arrow keys respectively.	
if(keyDown(LEFT_ARROW)){
player.x=player.x-5;
 }
if(keyDown(RIGHT_ARROW)){
player.x=player.x+5;
 }

//resetting the road. 
if(road.y>350){
road.y=250;
 }

//to play sound, destroy the garbage, increase the bin's scale and increase the score when the player touches it. 
if(garbageGrp.isTouching(player)){
scoreSound.play();
garbageGrp.destroyEach();
bin.scale=bin.scale+0.003
score=score+5;
 }

//to call garbage, LeftObstacle, RightObstacle and germs functions respectively. 
spawnGarbage();
spawnLeftObstacle();
spawnRightObstacle();
spawnGerms();

//change the gameState to end when the player touches left and right obstacle respectively. 
if(lObstacleGrp.isTouching(player)){
gameState=END;  
garbageGrp.setVelocityEach(0);
gameOverSound.play();
 } 
if(rObstacleGrp.isTouching(player)){
gameState=END;
garbageGrp.setVelocityEach(0);  
gameOverSound.play();
 } 
}
//change the gameState to end when the player touches germs.
if(germGrp.isTouching(player)){
gameState=END;
garbageGrp.setVelocityEach(0);
gameOverSound.play();
}

//to reset the game when the space key is pressed.
if(keyDown("space")){
reset();
}

drawSprites();

//displaying interesting messages when the score reaches on perticular value.
if(score===15 || score===50 || score===150 || score===250){
textSize(20);
fill(255);
text("Nice :)",400,50);
}
if(score===100 || score===115 || score===200 || score===300){
textSize(20);
fill(255);
text("Keep it up!",375,50);  
}

//to add score on the screen.
textSize(20);
fill(255);
text("Score:"+score,400,30);

//giving instruction for playeing game.
textSize(15);
fill("#F9D022");
text("Use Left and Right Arrow Keys to move your Player!!",25,15)

//to add functionalities when the game state is at the end.
if(gameState===END){
road.velocityY=0;
garbageGrp.destroyEach();
lObstacleGrp.destroyEach();
rObstacleGrp.destroyEach();
germGrp.destroyEach();
player.visible=false;
gameOver.visible=true;
textSize(20);
fill(246,167,75);
textFont("Berlin Sans FB Demi")
text("Press SpaceKey and Start Cleaning Again!!",80,330);
}

//to write massage
textSize(30);
textFont("Small Fonts")
fill(0)
text("K",475,50);	
text("E",475,80);
text("E",475,110);
text("P",475,140);
text("Y",475,180);
text("O",475,210);
text("U",475,240);
text("R",475,270);
text("C",475,310);
text("I",480,340);
text("T",475,370);
text("Y",475,400);
text("C",475,440);
text("L",475,470);
text("E",475,500);
text("A",475,530);
text("N",475,560);

//to add functionalities to reset the game.
function reset(){
gameState=PLAY;
gameOver.visible=false;
player.visible=true;
player.x=250;
player.y=500;
road.velocityY=4;
score=0;
bin.scale=0.2;
}
 }

//creating function spawnGarbage, spawnLeftObstacle, spawnRightObstacle and spawnGerms respectively.
function spawnGarbage() {
if(frameCount % 100 === 0) {
var garbage = createSprite(300,165,10,40);
garbage.x=Math.round(random(100,400))
garbage.velocityY = (4+3*score/200);
//generate random garbage
var rand = Math.round(random(1,6));
switch(rand) {
case 1: garbage.addImage(g1);
break;
case 2: garbage.addImage(g2);
break;
case 3: garbage.addImage(g3);
break;
case 4: garbage.addImage(g4);
break;
case 5: garbage.addImage(g5);
break;
case 6: garbage.addImage(g6);
break;
case 7: garbage.addImage(g7);
break;
case 8: garbage.addImage(g8);
break;
case 9: garbage.addImage(g9);
break;
case 10: garbage.addImage(g10);
break;					
default: break;
 }

//assign scale and lifetime to garbage         
garbage.scale = 0.5;
garbage.lifetime = 300;

//add each garbage to the group
garbageGrp.add(garbage);
 }
  }
function spawnLeftObstacle(){
//to create leftObstacle.	
if(frameCount%160===0){
var lObstacle=createSprite(100,100,10,10);

//assigning random Y values to the leftObstacle and adding image to it.
lObstacle.y=Math.round(random(100,400));
lObstacle.addImage(lObstacleImg);

//giving velocity and adding leftObstacle in the group.
lObstacle.velocityY=(4+3*score/200);
lObstacleGrp.add(lObstacle);

//assign scale and lifetime to leftObstacle.
lObstacle.scale=0.2;
lObstacle.lifetime=550;
 }
  } 
function spawnRightObstacle(){
//to create rightObstacle.	
if(frameCount%160===0){
var rObstacle=createSprite(400,300,10,10);

//assigning random Y values to the rightObstacle and adding image to it.	
rObstacle.y=Math.round(random(100,500));
rObstacle.addImage(rObstacleImg);

//giving velocity and adding rightObstacle in the group.
rObstacle.velocityY=(4+3*score/200);
rObstacleGrp.add(rObstacle);

//assign scale and lifetime to rightObstacle.
rObstacle.scale=0.2;
rObstacle.lifetime=550;
 }
  } 

function spawnGerms(){
//to create Germs.	
if(frameCount%200===0){
var germ=createSprite(200,600,10,10);
    
//assigning random Y values to the germs and adding image to it.	
germ.y=Math.round(random(100,500));
germ.addImage(germImg);
    
//giving velocity and adding rightObstacle in the group.
germ.velocityY=(4+3*score/200);
germGrp.add(germ);
    
//assign scale and lifetime to rightObstacle.
germ.scale=0.2;
germ.lifetime=550;
}
 } 

