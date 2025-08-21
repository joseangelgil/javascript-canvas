const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 760

c.fillStyle = 'black'
c.fillRect(0,0,canvas.width, canvas.height)


class Ball {
  constructor(x, y, radius) {
    this.position = { x, y };
    this.velocity = { x: 10, y: 5 };
    this.radius = radius;
  }

  draw(){
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);    
    c.fillStyle = 'white';
    c.fill();
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if(this.position.x - this.radius <= 0 ||
       this.position.x + this.radius >= canvas.width) {
        this.velocity.x = -this.velocity.x;
        canvas.style.boxShadow = '0 0 50px 0 red';
        setTimeout(() => {
          canvas.style.boxShadow = 'none';
        }, 100)
       }
    if(this.position.y - this.radius <= 0 ||
       this.position.y + this.radius >= canvas.height) {
        this.velocity.y = -this.velocity.y
       }
  }
}

class Paddle {
  constructor(x, y) {
    this.position = { x, y };
    this.velocity = { x: 0, y: 0 };
    this.width = 20;
    this.height = 200;
  }

  draw() {
    c.fillStyle = 'white';
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.draw()
    this.position.y += this.velocity.y
    if(this.position.y + this.velocity.y < 0) this.position.y = 10
    if(this.position.y + this.height + this.velocity.y > canvas.height) this.position.y = canvas.height - 210
  }
}

const ball = new Ball(100, 200, 10)
const paddle1 = new Paddle(10, canvas.height/2 - 100)
const paddle2 = new Paddle(canvas.width - 30, canvas.height/2 - 100)


function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'black';
  c.fillRect(0,0,canvas.width,canvas.height);
  ball.update()
  paddle1.update()
  paddle2.update()

  // Check collision paddle1-ball
  if(ball.position.x - ball.radius <= paddle1.position.x + paddle1.width &&
     ball.position.y > paddle1.position.y &&
     ball.position.y < paddle1.position.y + paddle1.height &&
     ball.velocity.x < 0
  ) ball.velocity.x = - ball.velocity.x

  // Check collision paddle2-ball
  if(ball.position.x + ball.radius >= paddle2.position.x &&
     ball.position.y > paddle2.position.y &&
     ball.position.y < paddle2.position.y + paddle2.height &&
     ball.velocity.x > 0
  ) ball.velocity.x = - ball.velocity.x
}

animate()

window.addEventListener('keydown', ({ key }) => {
  switch(key) {
    case 'ArrowUp':
      paddle2.velocity.y = -10;
      break;
    case 'ArrowDown':
      paddle2.velocity.y = 10;
      break;
    case 'w':
    case 'W':
      paddle1.velocity.y = -10;
      break;
    case 's':
    case 'S':
      paddle1.velocity.y = 10;
      break;
  }
})

