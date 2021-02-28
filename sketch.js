var trex, trexrun, edges, ground, groundimage, invisibleground, cloudimage, cloud, obstacle, o1, o2, o3, o4, o5, o6, ogroup, cgroup, trexcollided, gameover, goImage, restart, rimage, jumpsound,diesound,cpsound;
var gamestate = "play"
var score = 0

function preload() {
  trexrun = loadAnimation("trex1.png", "trex3.png", "trex4.png");

  groundimage = loadImage("ground2.png")
  cloudimage = loadImage("cloud.png")
  trexcollided = loadImage("trex_collided.png")
  goImage = loadImage ("gameOver.png")
  rimage = loadImage ("restart.png")

  o1 = loadImage("obstacle1.png");
  o2 = loadImage("obstacle2.png");
  o3 = loadImage("obstacle3.png");
  o4 = loadImage("obstacle4.png");
  o5 = loadImage("obstacle5.png");
  o6 = loadImage("obstacle6.png");
  
  jumpsound = loadSound("jump.mp3")
  diesound = loadSound("die.mp3")
  cpsound = loadSound("checkPoint.mp3")
}



function setup() {
  createCanvas(600, 200);
  
 
  
  
  
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("trexrun", trexrun);
  trex.scale = 0.5;
 // trex.debug= true
  trex.setCollider("circle",0,0,40)

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("groundimage", groundimage)

  invisibleground = createSprite(200, 200, 400, 20)
  invisibleground.visible = false

  trex.addImage ("trexcollided", trexcollided)
  
  edges = createEdgeSprites();

  ogroup = new Group()
  cgroup = new Group()
  
  gameover = createSprite (300,100)
  gameover.addImage ("goImage", goImage)
  
  restart = createSprite (300,140)
  restart.addImage ("rimage", rimage)
  restart.scale = 0.5
  
 
}

function draw() {
  
  

  background("white")
  drawSprites();
  trex.collide(invisibleground);
   textSize (15)
   text ("score:"+score,400,50)
   

  if (gamestate == "play") {
    gameover.visible= false
    restart.visible= false
    score = score+Math.round(getFrameRate()/30)
    
    
    if (keyDown("space") && trex.collide(ground)) {
      trex.velocityY = -15;
      jumpsound.play()
      
    }
    trex.velocityY = trex.velocityY + 1;


    ground.velocityX = -(10+10*score/100)

    if (ground.x < 0) {
      ground.x = ground.width / 2
    }
    clouds()
    obstacles()
    
    if (score % 100 === 0 ) {
      cpsound.play()
    }
    
    if (ogroup.isTouching(trex)) {
      
      gamestate = "end"
      trex.changeImage ("trexcollided", trexcollided)
      diesound.play()
    }
  } else if (gamestate == "end") {
    ground.velocityX = 0
    trex.velocityY = 0
    ogroup.setVelocityXEach(0)
    cgroup.setVelocityXEach(0)
    ogroup.setLifetimeEach(-1)
    cgroup.setLifetimeEach(-1)
    gameover.visible=true
    restart.visible= true
    
   if(mousePressedOver(restart)){
      reset()
       }
    
  }




}

function clouds() {

  if (frameCount % 60 == 0) {
    cloud = createSprite(600, 40, 150, 150)
    cloud.addImage("cloudimage", cloudimage)
    cloud.scale = 0.5
    cloud.velocityX = -3
    cloud.y = Math.round(random(40, 100))

    cloud.depth = trex.depth;
    trex.depth += 1;
    cloud.lifetime = 200
    cgroup.add(cloud)
  }
}

function obstacles() {
  if (frameCount % 60 === 0) {
     obstacle = createSprite(600, 165, 10, 40);
    obstacle.velocityX = -(10+10*score/100);
    obstacle.lifetime = 60
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage(o1);
        break;
      case 2:
        obstacle.addImage(o2);
        break;
      case 3:
        obstacle.addImage(o3);
        break;
      case 4:
        obstacle.addImage(o4);
        break;
      case 5:
        obstacle.addImage(o5);
        break;
      case 6:
        obstacle.addImage(o6);
        break;
      default:
        break;
    }

    obstacle.depth = trex.depth;
    trex.depth += 1;
    obstacle.scale = 0.5
    ogroup.add(obstacle)
  }

}

function reset () {
   score = 0 
     gameover.visible= false
    restart.visible= false
     ogroup.destroyEach()
     cgroup.destroyEach()
     gamestate="play"
      trex.changeAnimation("trexrun", trexrun);

  
}