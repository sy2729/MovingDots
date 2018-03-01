

var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// let drawSquare = 5;
// let color = "orangered";

// function changeOrange () {
//   color = 'orangered';
// }

// function changeRed() {
//   color = 'red';
// }

// function changeBlack() {
//   color = 'black';
// }

// function clear() {
//   c.clearRect(0, 0, innerWidth, innerHeight);
// }










//basics---------------------------------------------------------------------------------------------------

//-----------------------------------draw basic lines
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(50, 400);
// c.lineTo(500, 40);
// c.lineTo(100, 200);
// c.strokeStyle = "orangered";
// c.stroke();

//-----------------------------------draw basic arch
// c.beginPath(); //need to have this beginPath to prevent the begin point connect to the previous
// c.arc(232, 123, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "blue";
// c.stroke();


//initialize the mouseobject
let mouse = {
  x: undefined,
  y: undefined
}

window.addEventListener('mousemove', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
})

let maximumRadius = 20;
// let minimumRadius = Math.random() * 2 + 1;
let colors = ['#361A36', '#74487B', '#4F374E', '#CFBDB5', '#DFCABB','#4F3623'];

//Using javascript object to repeatingly create multiple circles
function Circle(x, y, dx, dy, radius, minimumRadius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minimumRadius = radius;
  this.color = colors[Math.round(Math.random() * colors.length - 1)];

  this.draw = function () {
    c.beginPath(); //need to have this beginPath to prevent the begin point connect to the previous
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    // c.fillStyle = colors[Math.round(Math.random()*colors.length - 1)] //randomize the color, but this will blink
    c.fill();
  };

  this.update = function() {
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

    if (this.x > innerWidth - this.radius || this.x < 0 + this.radius) {
      this.dx = -this.dx;
    };
    if (this.y > innerHeight - this.radius || this.y < 0 + this.radius) {
      this.dy = -this.dy;
    };

    //interactivity
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if(this.radius < maximumRadius){
        this.radius += 1;
      }
    } else if (this.radius > this.minimumRadius) {
      this.radius -= 1;
    } //make sure the circle have a distance from the mouse x horizontally and vertically
    //and make sure they are within the maximum and minimum radius range;

    this.draw();
  }

}


//creating an array to store many circles
let circles = [];


//init the circle generation whenever this page starts or the window is resized
function init() {

  circles = []; // make sure everytime the window is resized, the previous circles are cleared away;

  for (let i = 0; i < 400; i++) {
    let radius = Math.random() * 3 + 1;  //randomize the initial size of the circle
    let x = Math.random() * (innerWidth - radius * 2) + radius; //give a random x start position, also prevent circles being caught at the corner
    let y = Math.random() * (innerHeight - radius * 2) + radius; //give a random y start position, also prevent circles being caught at the corner

    let dx = (Math.random() - 0.5) * 3; // the varibale for moving distance horizontally, randomized - speed
    let dy = (Math.random() - 0.5) * 3; // the varibale for moving distance vertically, randomized - speed
    circles.push(new Circle(x, y, dx, dy, radius))
  } //creating many circles
}

init();



//animate the circle---------------------------------------------------------------------------------



function animate() {
  requestAnimationFrame(animate); // creating a loop and cycling;
  c.clearRect(0, 0, innerWidth, innerHeight) //clear the canvas each time the canvas is refreshed

  for (let i = 0; i < circles.length; i++) {
    circles[i].update();
  }
  
}


animate();




// resize the canvas----------------------------------------------------------------------------------

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
})