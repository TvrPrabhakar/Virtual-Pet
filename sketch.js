// Creating global variables
var dog,happyDog,database,foodS,foodStock;
var dogPic1,dogPic2;

function preload()
{
  //loading dog images
  dogPic1=loadImage("images/dogImg.png");
  dogPic2=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  //drawing the dog
  dog = createSprite(250,300,30,30);
  dog.addImage(dogPic1);
  dog.scale=0.5;
  //assigning value of food to variable foodStock
  foodStock=database.ref('Food');
  foodStock.on("value",readStock,showError);
  
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)&&foodS>0){
    writeStock(foodS);
    dog.addImage(dogPic2);
  }
  if(foodS===20){
    fill ("pink");
    stroke(2);
    text("Press Up Arrow to feed your pet",150,18);
  }
  if(foodS=0){
    dog.addImage(dogPic1);
  }
  textSize(20);
  fill ("blue");
  stroke(2);
  text("Food left: "+foodS,10,50);
  textSize(15);
  
  drawSprites();
  //add styles here

}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){

  if(x<=0){
    x=0
  }
  else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}
function showError(){
  console.log("ERROR: data not properly mentioned");
}


