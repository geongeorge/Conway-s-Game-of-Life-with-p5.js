var rows = 50;
var cols = 50;
var block=[0,0]; //0->width 1->height

//colors
var alive = "#333";
var dead = "#eee";

var play = false;
var pix = makeArray(cols,rows);
var pixT = makeArray(cols,rows); //temp array
function setup() {
  createCanvas(600, 600);
  background(dead);
  block = drawGrid(rows, cols)
  frameRate(20);
}

function draw() {
  //empty for now
  if(play){
    //game mechanics here
    var neigbours = 0;
    for(let i=0; i< rows; i++){
      for(let j=0; j< cols; j++){
        neigbours = getNeigbourCount(i,j);
        if(getPixelStatus(i,j)){
          //alive cell
          if(neigbours<2){
            //kill(under population)
            drawPixelTemp(i,j,false);
          } else if(neigbours<=3) {
            //lives for another generation
            drawPixelTemp(i,j,true);
          } else {
            //kill (over population)
            drawPixelTemp(i,j,false);
          }
        } else {
          //dead cell
          if(neigbours == 3){
            //born (reproduction)
            drawPixelTemp(i,j,true);
          }
        }
      }
    }


    //make temp the real and draw
    for(let i=0; i< rows; i++){
      for(let j=0; j< cols; j++){
        if(pixT[i][j] == 1){
          drawPixel(i, j , true);
        } else {
          drawPixel(i, j , false);
        }
      }
    }

  } //endif
}//end fn
function keyPressed() {
  if(keyIsPressed)
  {
      if(keyCode == ENTER)
      {
           console.log("Enter");
           play=!play;
      }
  }
}
function mousePressed() {
  if (mouseIsPressed) {
    let pos = getPixelAddr(mouseX, mouseY);
    console.log(pos);

    togglePixel(pos[0], pos[1]);
  }
}
//a= alive or dead.
function drawPixel(x, y, a){
  let posiX = x*block[0];
  let posiY = y*block[1];
  if(a == true){
    pix[x][y] = 1;
    fill(alive);
  } else {
    pix[x][y] = 0;
    fill(dead);
  }
  rect(posiX, posiY,block[0],block[1]);
}
//draw to a temporary array
function drawPixelTemp(x, y, a){
  if(a == true){
    pixT[x][y] = 1;
  } else {
    pixT[x][y] = 0;
  }
}
//toggles current state of a pixel
function togglePixel(x, y){
  if(pix[x][y]==0){
    drawPixel(x, y,true)
  } else {
    drawPixel(x, y,false)
  }
}
function drawGrid(r, c){
  const blockWidth = width / c;
  const blockHeight = height / r;
  for(let i = 0 ; i< height ; i+=blockHeight){
    line(0, i, width, i);
  }
  for(let j = 0; j < width ; j+=blockWidth){
    line(j, 0, j, height);
  }
  let blocks = [blockWidth, blockHeight];
  return blocks;
}

function makeArray(d1, d2) {
    var arr = new Array(d1), i, l;
    for(i = 0, l = d2; i < l; i++) {
        arr[i] = new Array(d1);
        for(let j =0; j<d1; j++){
          arr[i][j] = 0;
        }
    }
    return arr;
}
//returns the pixel address of a width
function getPixelAddr(x,y){
  var arr = new Array(2);
  arr[0] = (x - x%block[0])/block[0];
  arr[1] = (y - y%block[1])/block[1];
  return arr;
}
//get pixel status weather it's alive 1(true) or dead 0(false)
function getPixelStatus(x,y) {
  if(pix[x][y]==1){
    return true;
  } else {
    return false;
  }
}
//get the no of alive neigbours for a pixel
function getNeigbourCount(x,y){
  var count=0;
  //checking all neigbours
  for(let i=-1; i<=1; i++){
    for(let j=-1; j<=1; j++){
      //skip for the pixel itself
      if(j==0 && i==0) continue;
      //check only pixel that exists in the grid
      if(pixelExists(x+i, y+j)) {
        //if pixel is alive increment count
        if(getPixelStatus(x+i,y+j))
          count++;
      }
    }
  }
  return count;
}
//check if pixel exists in grid
function pixelExists(x,y){
 if(x>=0 && x<cols && y>=0 && y<rows)
  return true;
else
  return false;
}
