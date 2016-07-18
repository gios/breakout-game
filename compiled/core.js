var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var ballPositionX = canvas.width / 4;
var ballPositionY = canvas.height - 30;
var differenceX = 2;
var differenceY = -2;
function drawingBall() {
    ctx.beginPath();
    ctx.arc(ballPositionX, ballPositionY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function render() {
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
