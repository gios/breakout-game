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
    this.ctx.clearRect(0, 0, this.getCanvasWidth(), this.getCanvasHeight());
    if (this.ball.getBallPositionX() + this.ball.getBallMovingX() < this.ball.getBallRadius() ||
      this.ball.getBallPositionX() + this.ball.getBallMovingX() > this.getCanvasWidth() - this.ball.getBallRadius()) {
      this.ball.setBallMovingX(-this.ball.getBallMovingX());
    }

    if (this.ball.getBallPositionY() + this.ball.getBallMovingY() < this.ball.getBallRadius() ||
      this.ball.getBallPositionY() + this.ball.getBallMovingY() > this.getCanvasHeight() - this.ball.getBallRadius()) {
      this.ball.setBallMovingY(-this.ball.getBallMovingY());
    }
    this.ball.draw();
    this.ball.setBallPositionX(this.ball.getBallPositionX() + this.ball.getBallMovingX());
    this.ball.setBallPositionY(this.ball.getBallPositionY() + this.ball.getBallMovingY());
    requestAnimationFrame(this.draw.bind(this));
  }
}
