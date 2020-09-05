var  player, player_running;  
var  bananaImage,foodGroup;            
var  obstacleImage ,obstaclesGroup;  
var  backPaper,backImage;  
var  score;  
var  invisibleGround;  


function preload() {
  
  backImage = loadImage("jungle.jpg");
 player_running = 
loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  
}

function setup() {
  createCanvas(400, 400);
  
   backPaper = createSprite(200,100,20,20);
  backPaper.addImage(backImage);
  backPaper.x = backPaper.width /2;
  backPaper.velocityX = -4;
  
  player = createSprite(100,200,20,20);
  player.addAnimation("running",player_running);
  player.scale = 0.5;
  
 invisibleGround= createSprite(200,180,400,20);
  invisibleGround.x = invisibleGround.width /2;
  invisibleGround.velocityX = -4;
  invisibleGround.visible = false;
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  score = 0;
}

function draw() {
  background(220);
  
     if(backPaper.x < 0)
     {
        backPaper.x = backPaper.width/2;
     }
    //resetting the ground
   if(invisibleGround.x < 0)
   {
     invisibleGround.x = invisibleGround.width/2;
   }
   //to jump the monkey
   if(keyDown("space"))
   {
      player.velocityY = -12;
   }
    
   //to add gravity
     player.velocityY = player.velocityY+0.8;                                
   //to collide the monkey with ground
    player.collide(invisibleGround);
  
  // to call the function food and obstacles
   forfood();
   forobstacles();
  
      switch(score)
      {
             case 10 : player.scale = 0.12;
                   break;
             case 20 : player.scale = 0.14;      
                   break;
             case 30 : player.scale = 0.16; 
                   break;
             case 40 : player.scale = 0.18;
                   break;
              default:break;      
      }

   //to collide the monkey with ground
    player.collide(invisibleGround);

  
    drawSprites();
   //score or survival time
   stroke("white");
   textSize(20);
   fill("white");
   text("score: "+score, 500,50);
  
} 
function forfood()
{
    if(World.frameCount % 80 ===0)
    {

         var bananas = createSprite(400,200,5,5);
          bananas.y = Math.round(random(120,200));
          bananas.addImage(bananaImage);
          bananas.scale = 0.1;
          bananas.velocityX = -4;
          bananas.lifetime = 150;
          foodGroup.add(bananas);
              if(player.isTouching(foodGroup))
             {
                    score = score +2;
                    foodGroup.destroyEach();
             }
  }
}
function forobstacles()
{
  if(World.frameCount % 300 === 0)
  {
  var obstacle = createSprite(400,320,10,40);
  obstacle.addImage(obstacleImage); 
  obstacle.scale = 0.3;  
  obstacle.velocityX = -4;
  obstacle.lifetime = 150;
  obstaclesGroup.add(obstacle);
    
    if(player.isTouching(obstaclesGroup))
    {
      player.scale = 0.2;
    }
  
  }
}
  