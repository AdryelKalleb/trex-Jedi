var trex, trex_correndo, trex_colidiu;
var solo, soloinvisivel, imagemdosolo;
var JOGAR = 1
var ENCERRAR = 0
var estadoJogo = JOGAR




var jedireal;
jedireal=0;


function preload(){
  trex_correndo = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_colidiu = loadImage("trex_collided.png");
  
  

  
  
  imagemdosolo = loadImage("ground2.png");
  //carreguei a imagem numa variavel
  imagemdanuvem = loadImage("cloud.png");
  tropas1 = loadImage("1.png");
  tropas2 = loadImage("2.png");
  tropas3 = loadImage("3.png");
  tropas4 = loadImage("4.png");
  
  imagemdecolidir = loadImage("trex_collided.png")
  
  imagemderestart = loadImage("restart.png")
  
  imagemdegameover = loadImage("gameOver.png")
  
  checkpoint = loadSound("CP.mp3")
  
  morte = loadSound("DIE.mp3")
  
  pular = loadSound("JUMP.mp3")
  

  
  
  
 
  
}

function setup() {

  createCanvas(windowWidth,windowHeight)
   
  
  
  gameover = createSprite(300,50)
  gameover.scale=1.7
  gameover.addImage(imagemdegameover)
  gameover.visible=false
  
  restart = createSprite(300,100)
  restart.scale=0.5
  restart.addImage(imagemderestart)
  restart.visible=false

  
  grupotropas=new Group()
  gruponuvens=new Group()
  
  //criar um sprite do trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_correndo);
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,40)
  
  //criar um sprite do solo
  solo = createSprite(width,height*0.9);
  solo.addImage("ground",imagemdosolo);
  solo.x = solo.width /2;
  solo.velocityX = -4;
  
  //criando solo invisível
  soloinvisivel = createSprite(width*0.1,height*0.95,width,80);
  soloinvisivel.visible = false;
  
  //gerar números aleatórios
  var rand =  Math.round(random(1,100))
  console.log(rand)

}

function draw() {
  //definir cor de fundo
  background(180);

  if(estadoJogo === JOGAR) {   
  
   if (solo.x < 0){
    solo.x = solo.width/2;
   }   
  if(touches.length>0||keyDown("Up_Arrow")&&trex.isTouching(solo)) {
    trex.velocityY = -12;
    
    touches=[]
    } 
      
    jedireal=jedireal+Math.round(frameCount/100)

     
     
    
  gerarNuvens()
  gerarTropas();

    if (grupotropas.isTouching(trex))    { 
      estadoJogo = ENCERRAR
      morte.play() 
    }
  } 
    
  else if(estadoJogo === ENCERRAR) {
    
    solo.velocityX=0
    grupotropas.setVelocityXEach(0)
    gruponuvens.setVelocityXEach(0)
    restart.visible=true

    gameover.visible=true   
    if (mousePressedOver(restart)){
      resetar();
    }


  }
  
    fill("red") 
  text("JediReal"+jedireal,490,49)
  
  

  
  

  
  trex.velocityY = trex.velocityY + 0.8

  
  //impedir o trex de cair 
  trex.collide(soloinvisivel);
  

  drawSprites();
}

//função para gerar as nuvens
function gerarNuvens() {
 // escreva o seu código aqui
  
  

  

if (frameCount%60===0) {
  nuvem = createSprite(width,height*0.85,30,5)
  //para gerar posições aleatorias no eixo y
  nuvem.y = Math.round(random(height*0.1,height*0.6));
  //para adicionar a imagem do preload
  nuvem.velocityX=-10;
  //para fazer a nuvem de movimentar  para esquerda 
  nuvem.addImage(imagemdanuvem)
  
 nuvem.scale=0.16
 gruponuvens.add(nuvem)

}
}
//função para gerar as Tropas
function gerarTropas(){
 //escreva o seu código aqui
  if (frameCount%80===0) {
    tropas = createSprite(width,height*0.85,30,5)
    //para gerar imagens aleatorias no eixo y
      var troopers = Math.round(random(1,4));
    switch(troopers) {
    case 1 : tropas.addImage(tropas1);
    break;
    case 2 : tropas.addImage(tropas2);
    break;
    case 3 : tropas.addImage(tropas3);
    break;
    case 4 : tropas.addImage(tropas4);
    break;
    default:break;
     
    }
    
  tropas.velocityX = -5
  tropas.scale=0.08
  grupotropas.add(tropas)
    


    
  
    
    
    
   
}   
}
function resetar(){
  estadoJogo = JOGAR;
  gameover.visible=false;
  restart.visible=false;
  
  grupotropas.destroyEach();
  gruponuvens.destroyEach();
  
  trex.changeAnimation("running",trex_correndo);
  solo.velocityX=-4;
  
  
  
  
  jedireal = 0; 
}
