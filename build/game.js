var Ball = (function () {
    function Ball(canvasContext, ballRadius, ballPositionX, ballPositionY, ballMovingX, ballMovingY) {
        this.canvasContext = canvasContext;
        this.ballRadius = ballRadius;
        this.ballPositionX = ballPositionX;
        this.ballPositionY = ballPositionY;
        this.ballMovingX = ballMovingX;
        this.ballMovingY = ballMovingY;
    }
    Ball.prototype.getBallRadius = function () {
        return this.ballRadius;
    };
    Ball.prototype.setBallRadius = function (ballRadius) {
        this.ballRadius = ballRadius;
    };
    Ball.prototype.getBallPositionX = function () {
        return this.ballPositionX;
    };
    Ball.prototype.setBallPositionX = function (ballPositionX) {
        this.ballPositionX = ballPositionX;
    };
    Ball.prototype.getBallPositionY = function () {
        return this.ballPositionY;
    };
    Ball.prototype.setBallPositionY = function (ballPositionY) {
        this.ballPositionY = ballPositionY;
    };
    Ball.prototype.getBallMovingX = function () {
        return this.ballMovingX;
    };
    Ball.prototype.setBallMovingX = function (ballMovingX) {
        this.ballMovingX = ballMovingX;
    };
    Ball.prototype.getBallMovingY = function () {
        return this.ballMovingY;
    };
    Ball.prototype.setBallMovingY = function (ballMovingY) {
        this.ballMovingY = ballMovingY;
    };
    Ball.prototype.draw = function () {
        var ctx = this.canvasContext.getCtx();
        ctx.beginPath();
        ctx.arc(this.ballPositionX, this.ballPositionY, this.ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    };
    return Ball;
}());

var CanvasContext = (function () {
    function CanvasContext(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }
    CanvasContext.prototype.getCanvas = function () {
        return this.canvas;
    };
    CanvasContext.prototype.getCtx = function () {
        return this.ctx;
    };
    CanvasContext.prototype.getCanvasWidth = function () {
        return this.canvas.width;
    };
    CanvasContext.prototype.getCanvasHeight = function () {
        return this.canvas.height;
    };
    CanvasContext.prototype.setBall = function (ball) {
        this.ball = ball;
    };
    CanvasContext.prototype.draw = function () {
        var ball = this.ball;
        this.ctx.clearRect(0, 0, this.getCanvasWidth(), this.getCanvasHeight());
        if (ball.getBallPositionX() + ball.getBallMovingX() < ball.getBallRadius() ||
            ball.getBallPositionX() + ball.getBallMovingX() > this.getCanvasWidth() - ball.getBallRadius()) {
            ball.setBallMovingX(-ball.getBallMovingX());
        }
        if (ball.getBallPositionY() + ball.getBallMovingY() < ball.getBallRadius() ||
            ball.getBallPositionY() + ball.getBallMovingY() > this.getCanvasHeight() - ball.getBallRadius()) {
            ball.setBallMovingY(-ball.getBallMovingY());
        }
        this.ball.draw();
        ball.setBallPositionX(ball.getBallPositionX() + ball.getBallMovingX());
        ball.setBallPositionY(ball.getBallPositionY() + ball.getBallMovingY());
        requestAnimationFrame(draw);
    };
    return CanvasContext;
}());

var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var canvasContext = new CanvasContext(canvas, ctx);
var ball = new Ball(canvasContext, 10, canvasContext.getCanvasWidth() / 4, canvasContext.getCanvasHeight() - 30, 2, -2);
canvasContext.setBall(ball);
canvasContext.draw();