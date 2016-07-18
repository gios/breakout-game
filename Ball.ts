import CanvasContext from "./CanvasContext";

export default class Ball {
  private ballRadius: number;
  private ballPositionX: number;
  private ballPositionY: number;

  private ballMovingX: number;
  private ballMovingY: number;
  private canvasContext: CanvasContext;

  constructor(canvasContext: CanvasContext, ballRadius: number, ballPositionX: number,
              ballPositionY: number, ballMovingX: number, ballMovingY: number) {
    this.canvasContext = canvasContext;
    this.ballRadius = ballRadius;
    this.ballPositionX = ballPositionX;
    this.ballPositionY = ballPositionY;
    this.ballMovingX = ballMovingX;
    this.ballMovingY = ballMovingY;
  }

  public getBallRadius() {
    return this.ballRadius;
  }

  public setBallRadius(ballRadius: number) {
    this.ballRadius = ballRadius;
  }

  public getBallPositionX() {
    return this.ballPositionX;
  }

  public setBallPositionX(ballPositionX: number) {
    this.ballPositionX = ballPositionX;
  }

  public getBallPositionY() {
    return this.ballPositionY;
  }

  public setBallPositionY(ballPositionY: number) {
    this.ballPositionY = ballPositionY;
  }

  public getBallMovingX() {
    return this.ballMovingX;
  }

  public setBallMovingX(ballMovingX: number) {
    this.ballMovingX = ballMovingX;
  }

  public getBallMovingY() {
    return this.ballMovingY;
  }

  public setBallMovingY(ballMovingY: number) {
    this.ballMovingY = ballMovingY;
  }

  public draw() {
    let ctx = this.canvasContext.getCtx();
    ctx.beginPath();
    ctx.arc(this.ballPositionX, this.ballPositionY, this.ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
}
