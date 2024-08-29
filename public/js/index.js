var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var button = document.getElementById("refresh");

var refresh = function() {

ctx.clearRect(0,0,1500,1500);
for(i=0; i<600; i++) {

var x = Math.floor(Math.random()*1500);
var y = Math.floor(Math.random()*1500);
var radius = Math.floor(Math.random()*20);

function getColor(){ 
    return "hsl(" + 360 * Math.random() + ',' +
               (25 + 70 * Math.random()) + '%,' + 
               (75 + 10 * Math.random()) + '%)'
  }

// var r = Math.floor(Math.random()*255);
// var g = Math.floor(Math.random()*255);
// var b = Math.floor(Math.random()*255);
  
ctx.beginPath();
ctx.arc(x,y,radius,Math.PI*2,0,false);
ctx.fillStyle = `${getColor()}`;
ctx.fill();
ctx.closePath();
  
}
}

refresh();