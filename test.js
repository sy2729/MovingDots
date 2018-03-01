
var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40;
var minRadius = 2;

//colors of the circles which are going to be generted
var colorArray = [
    '#BE4248',
    '#21374B',
    '#586473',
    '#E7DACB',
    '#4A89AA',
]

//assign the location of the cursor to x and y
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

//make sure the canvas size is equal to the window size when it is resized
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    //randomizd the color generated
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    // draw the circle
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    // move the circle and prevent it from being over the screen
    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        //interactivity with cursor
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }

}

var circleArray = [];

//make cursor being genrated over the whole creen whenever the screen is resized
function init() {
    //prevent the circles from being generated over and over again everytiem when the user resize the screen
    circleArray = [];

    // generate multiple circles
    for (i = 0; i < 600; i++) {
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        circleArray.push(new Circle(x, y, dx, dy, radius))

    }
}

init();


function animate() {
    requestAnimationFrame(animate);
    //clear the trail of the previous circles
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

}

animate();


