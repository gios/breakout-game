import {CanvasContext} from "./CanvasContext";
import {Paddle} from "./Paddle";

export class Ball extends CanvasContext {
  private radius: number;
  private positionX: number;
  private positionY: number;

  private movingX: number;
  private movingY: number;

  constructor(radius: number, positionX: number, positionY: number, movingX: number, movingY: number) {
    super();
    this.radius = radius;
    this.positionX = positionX;
    this.positionY = positionY;
    this.movingX = movingX;
    this.movingY = movingY;
  }

  public getRadius() {
    return this.radius;
  }

  public setRadius(radius: number) {
    this.radius = radius;
  }

  public getPositionX() {
    return this.positionX;
  }

  public setPositionX(positionX: number) {
    this.positionX = positionX;
  }

  public getPositionY() {
    return this.positionY;
  }

  public setPositionY(positionY: number) {
    this.positionY = positionY;
  }

  public getMovingX() {
    return this.movingX;
  }

  public setMovingX(movingX: number) {
    this.movingX = movingX;
  }

  public getMovingY() {
    return this.movingY;
  }

  public setMovingY(movingY: number) {
    this.movingY = movingY;
  }

  public render() {
    CanvasContext.ctx.clearRect(0, 0, CanvasContext.getCanvasWidth(), CanvasContext.getCanvasHeight());
    if (this.getPositionX() + this.getMovingX() < this.getRadius() ||
      this.getPositionX() + this.getMovingX() > CanvasContext.getCanvasWidth() - this.getRadius()) {
      this.setMovingX(-this.getMovingX());
    }

    if (this.getPositionY() + this.getMovingY() < this.getRadius()) {
      this.setMovingY(-this.getMovingY());
    } else if (this.getPositionY() + this.getMovingY() > CanvasContext.getCanvasHeight() - this.getRadius()) {
      let paddle = <Paddle> CanvasContext.getItem("Paddle");

      if (this.getPositionX() > paddle.getStartPoint() &&
        this.getPositionX() < paddle.getStartPoint() + paddle.getWidth()) {
        this.setMovingY(-this.getMovingY());
      } else {
        alert("GAME OVER!");
        document.location.reload();
      }
    }
    this.draw();
    this.setPositionX(this.getPositionX() + this.getMovingX());
    this.setPositionY(this.getPositionY() + this.getMovingY());
    requestAnimationFrame(this.render.bind(this));
  }

  protected draw() {
    let ctx = CanvasContext.ctx;
    ctx.beginPath();
    ctx.arc(this.positionX, this.positionY, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095dd";
    ctx.fill();
    ctx.closePath();
  }
}
