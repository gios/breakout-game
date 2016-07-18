let canvas = <HTMLCanvasElement> document.getElementById("game");
let ctx: CanvasRenderingContext2D = canvas.getContext("2d");

let ballRadius = 10;
let ballPositionX = canvas.width / 4;
let ballPositionY = canvas.height - 30;
let differenceX = 2;
let differenceY = -2;

function drawingBall(): void {
  ctx.beginPath();
  ctx.arc(ballPositionX, ballPositionY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function render(): void {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (ballPositionX + differenceX < ballRadius || ballPositionX + differenceX > canvas.width - ballRadius) {
    differenceX = -differenceX;
  }
  if (ballPositionY + differenceY < ballRadius || ballPositionY + differenceY > canvas.height - ballRadius) {
    differenceY = -differenceY;
  }
  drawingBall();
  ballPositionX += differenceX;
  ballPositionY += differenceY;
  requestAnimationFrame(render);
}

requestAnimationFrame(render);
