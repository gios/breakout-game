import CanvasContext from "./CanvasContext";

export default class Ball {
  private radius: number;
  private positionX: number;
  private positionY: number;

  private movingX: number;
  private movingY: number;
  private canvasContext: CanvasContext;

  constructor(canvasContext: CanvasContext, radius: number, positionX: number,
              positionY: number, movingX: number, movingY: number) {
    this.canvasContext = canvasContext;
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

  public draw() {
    let ctx = this.canvasContext.getCtx();
    ctx.beginPath();
    ctx.arc(this.positionX, this.positionY, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
}
