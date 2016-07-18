import Ball from "./Ball";

export default class CanvasContext {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private ball: Ball;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  public getCanvas() {
    return this.canvas;
  }

  public getCtx() {
    return this.ctx;
  }

  public getCanvasWidth() {
    return this.canvas.width;
  }

  public getCanvasHeight() {
    return this.canvas.height;
  }

  public setBall(ball: Ball) {
    this.ball = ball;
  }

  public draw() {
    let ball = this.ball;
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
    requestAnimationFrame(this.draw);
  }
}
