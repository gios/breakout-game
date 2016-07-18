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
    if (this.ball.getPositionX() + this.ball.getMovingX() < this.ball.getRadius() ||
      this.ball.getPositionX() + this.ball.getMovingX() > this.getCanvasWidth() - this.ball.getRadius()) {
      this.ball.setMovingX(-this.ball.getMovingX());
    }

    if (this.ball.getPositionY() + this.ball.getMovingY() < this.ball.getRadius() ||
      this.ball.getPositionY() + this.ball.getMovingY() > this.getCanvasHeight() - this.ball.getRadius()) {
      this.ball.setMovingY(-this.ball.getMovingY());
    }
    this.ball.draw();
    this.ball.setPositionX(this.ball.getPositionX() + this.ball.getMovingX());
    this.ball.setPositionY(this.ball.getPositionY() + this.ball.getMovingY());
    requestAnimationFrame(this.draw.bind(this));
  }
}
